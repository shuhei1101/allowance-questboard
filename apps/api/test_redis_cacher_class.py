#!/usr/bin/env python3
import asyncio
import sys
import os
from unittest.mock import AsyncMock, MagicMock
import pickle
import pytest

# パスを追加
sys.path.append(os.path.abspath('.'))

from aqapi.core.cache.redis_cacher import RedisCacher


class MockRedisClient:
    """テスト用モックRedisクライアント"""
    
    def __init__(self):
        self.data = {}
        self.operations = []  # 操作履歴を記録
    
    async def get(self, key: str):
        self.operations.append(f"GET {key}")
        return self.data.get(key)
    
    async def set(self, key: str, value: bytes, ex: int = None):
        self.operations.append(f"SET {key} (TTL: {ex})")
        self.data[key] = value
        return True
    
    async def delete(self, key: str):
        self.operations.append(f"DELETE {key}")
        deleted = key in self.data
        self.data.pop(key, None)
        return deleted
    
    def clear(self):
        """テスト用リセット"""
        self.data.clear()
        self.operations.clear()


class TestCachedService:
    """テスト用のサービスクラス"""
    
    def __init__(self, cacher: RedisCacher):
        self.cacher = cacher
        self.call_count = 0
    
    @property
    def cache_decorator(self):
        return self.cacher.cache("user:{user_id}")
    
    @property 
    def evict_decorator(self):
        return self.cacher.evict("user:{user_id}", "users:all")
    
    async def get_user(self, user_id: int):
        """キャッシュ機能テスト用メソッド"""
        @self.cacher.cache("user:{user_id}")
        async def _get_user(user_id: int):
            self.call_count += 1
            return {"id": user_id, "name": f"User{user_id}", "call": self.call_count}
        return await _get_user(user_id)
    
    async def update_user(self, user_id: int, data: dict):
        """キャッシュ削除テスト用メソッド"""
        @self.cacher.evict("user:{user_id}", "users:all")
        async def _update_user(user_id: int, data: dict):
            return {"success": True, "user_id": user_id, "data": data}
        return await _update_user(user_id, data)


async def test_redis_cacher_class():
    """RedisCacherクラスの基本機能テスト"""
    print("=== 🎯 RedisCacherクラステスト開始 ===")
    
    # モックRedisクライアントを作成
    mock_redis = MockRedisClient()
    cacher = RedisCacher(mock_redis)
    
    # テストサービスを作成
    service = TestCachedService(cacher)
    
    print("\n1️⃣ 初回アクセス（キャッシュミス）")
    result1 = await service.get_user(123)
    print(f"結果: {result1}")
    print(f"Redis操作: {mock_redis.operations}")
    print(f"サービス呼び出し回数: {service.call_count}")
    
    print("\n2️⃣ 二回目アクセス（キャッシュヒット）")
    result2 = await service.get_user(123)
    print(f"結果: {result2}")
    print(f"Redis操作: {mock_redis.operations}")
    print(f"サービス呼び出し回数: {service.call_count}")
    
    # キャッシュヒットしているか確認
    assert result1 == result2, "キャッシュから同じ結果が返されるべき"
    assert service.call_count == 1, "サービスは一回だけ呼ばれるべき"
    
    print("\n3️⃣ 異なるIDでアクセス")
    result3 = await service.get_user(456)
    print(f"結果: {result3}")
    print(f"サービス呼び出し回数: {service.call_count}")
    
    print("\n4️⃣ キャッシュ削除テスト")
    update_result = await service.update_user(123, {"name": "Updated User"})
    print(f"更新結果: {update_result}")
    print(f"Redis操作: {mock_redis.operations}")
    
    print("\n5️⃣ 削除後のアクセス（再度キャッシュミス）")
    result4 = await service.get_user(123)
    print(f"結果: {result4}")
    print(f"サービス呼び出し回数: {service.call_count}")
    
    # 削除後は新しい呼び出しが発生するか確認
    assert service.call_count == 3, "削除後は再度サービスが呼ばれるべき"
    
    print("\n📊 最終状態")
    print(f"キャッシュ内容: {list(mock_redis.data.keys())}")
    print(f"Redis操作履歴: {mock_redis.operations}")
    
    print("\n=== ✅ RedisCacherクラステスト完了 ===")


async def test_cache_key_generation():
    """キャッシュキー生成のテスト"""
    print("=== 🔑 キーキー生成テスト開始 ===")
    
    mock_redis = MockRedisClient()
    cacher = RedisCacher(mock_redis)
    
    class TestObject:
        async def test_method(self, user_id: int, category: str = "default"):
            @cacher.cache("data:{user_id}:{category}")
            async def _test_method(user_id: int, category: str):
                return f"data_{user_id}_{category}"
            return await _test_method(user_id, category)
    
    obj = TestObject()
    
    # 異なるパラメータでのキー生成テスト
    result1 = await obj.test_method(123, "premium")
    result2 = await obj.test_method(123, "basic")
    result3 = await obj.test_method(456, "premium")
    
    print(f"Redis操作: {mock_redis.operations}")
    print(f"キャッシュキー: {list(mock_redis.data.keys())}")
    
    # キーが正しく生成されているか確認
    expected_keys = ["data:123:premium", "data:123:basic", "data:456:premium"]
    for key in expected_keys:
        assert any(key in op for op in mock_redis.operations), f"キー {key} が生成されていない"
    
    print("=== ✅ キー生成テスト完了 ===")


async def test_multiple_key_eviction():
    """複数キー削除のテスト"""
    print("=== 🧹 複数キー削除テスト開始 ===")
    
    mock_redis = MockRedisClient()
    cacher = RedisCacher(mock_redis)
    
    # 複数のキャッシュを設定
    await mock_redis.set("users:all", pickle.dumps(["user1", "user2"]))
    await mock_redis.set("user:123", pickle.dumps({"id": 123, "name": "User123"}))
    await mock_redis.set("user:456", pickle.dumps({"id": 456, "name": "User456"}))
    
    print(f"初期キャッシュ: {list(mock_redis.data.keys())}")
    
    class TestService:
        async def bulk_update(self, user_id: int):
            @cacher.evict("users:all", "user:{user_id}")
            async def _bulk_update(user_id: int):
                return f"updated_{user_id}"
            return await _bulk_update(user_id)
    
    service = TestService()
    result = await service.bulk_update(123)
    
    print(f"更新結果: {result}")
    print(f"残りキャッシュ: {list(mock_redis.data.keys())}")
    print(f"削除操作: {[op for op in mock_redis.operations if 'DELETE' in op]}")
    
    # 指定されたキーが削除されているか確認
    assert "users:all" not in mock_redis.data, "users:allが削除されていない"
    assert "user:123" not in mock_redis.data, "user:123が削除されていない"
    assert "user:456" in mock_redis.data, "user:456は削除されてはいけない"
    
    print("=== ✅ 複数キー削除テスト完了 ===")


if __name__ == "__main__":
    async def run_all_tests():
        try:
            await test_redis_cacher_class()
            await test_cache_key_generation()
            await test_multiple_key_eviction()
            print("\n🎉 全テスト完了！RedisCacherクラスは正常に動作しています ✨")
        except Exception as e:
            print(f"❌ テストエラー: {e}")
            import traceback
            traceback.print_exc()
    
    asyncio.run(run_all_tests())
