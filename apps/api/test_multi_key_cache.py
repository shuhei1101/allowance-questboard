#!/usr/bin/env python3
import asyncio
import sys
import os
from unittest.mock import AsyncMock, MagicMock
import pickle
import inspect
import functools

# パスを追加
sys.path.append(os.path.abspath('.'))

def _make_cache_key(key_template: str, func, args, kwargs):
    """キャッシュキーを生成する"""
    if key_template:
        bound = inspect.signature(func).bind(*args, **kwargs)
        bound.apply_defaults()
        
        # selfやclsを除外してキーを生成
        arguments = {k: v for k, v in bound.arguments.items() 
                    if k not in ('self', 'cls')}
        
        return key_template.format(**arguments)
    else:
        # selfを除外した引数でハッシュ生成
        filtered_args = args[1:] if args and hasattr(args[0], '__class__') else args
        raw_key = f"{func.__module__}.{func.__name__}:{filtered_args}:{kwargs}"
        return hashlib.sha256(raw_key.encode()).hexdigest() # type: ignore

# モックRedisクライアント
class MockRedisClient:
    def __init__(self):
        self.data = {}
    
    async def get(self, key: str):
        return self.data.get(key)
    
    async def set(self, key: str, value: bytes, ex: int = None): # type: ignore
        self.data[key] = value
        return True
    
    async def delete(self, key: str):
        deleted = key in self.data
        self.data.pop(key, None)
        return deleted

# グローバルなモックRedisクライアント
mock_redis = MockRedisClient()

def cache_evict(*keys: str):
    """キャッシュ削除用デコレーター（複数キー対応）"""
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            result = await func(*args, **kwargs)
            deleted_keys = []
            for key_template in keys:
                cache_key = _make_cache_key(key_template, func, args, kwargs)
                was_deleted = await mock_redis.delete(cache_key)
                if was_deleted:
                    deleted_keys.append(cache_key)
                    print(f"🧹 Deleted cache: {cache_key}")
                else:
                    print(f"❌ Cache not found: {cache_key}")
            print(f"📊 Total deleted: {len(deleted_keys)} keys")
            return result
        return wrapper
    return decorator

class TestMultiKeyDao:
    def __init__(self):
        pass
    
    async def setup_test_cache(self):
        """テスト用のキャッシュを設定"""
        await mock_redis.set("quests:all", pickle.dumps(["quest1", "quest2", "quest3"]))
        await mock_redis.set("quests:123", pickle.dumps({"id": 123, "title": "Test Quest"}))
        await mock_redis.set("user:456", pickle.dumps({"id": 456, "name": "Test User"}))
        print("📝 テストキャッシュを設定しました")
        print(f"💾 現在のキャッシュ: {list(mock_redis.data.keys())}")
    
    @cache_evict("quests:all", "quests:{id}")
    async def update_quest(self, id: int, data: dict):
        print(f"💾 クエスト更新: id={id}, data={data}")
        return True
    
    @cache_evict("user:{user_id}", "user:profile:{user_id}", "user:settings:{user_id}")
    async def update_user_complex(self, user_id: int, data: dict):
        print(f"💾 ユーザー複合更新: user_id={user_id}, data={data}")
        return True

async def test_multi_key_evict():
    """複数キー削除のテスト"""
    print("=== 🎯 複数キー削除テスト開始 ===")
    
    dao = TestMultiKeyDao()
    
    # 1. テスト用キャッシュをセットアップ
    print("\n1️⃣ テスト用キャッシュのセットアップ")
    await dao.setup_test_cache()
    
    # 2. 複数キー削除テスト（クエスト更新）
    print("\n2️⃣ クエスト更新（2つのキャッシュ削除）")
    await dao.update_quest(123, {"title": "Updated Quest"})
    print(f"💾 残りのキャッシュ: {list(mock_redis.data.keys())}")
    
    # 3. 複数キー削除テスト（ユーザー複合更新）
    print("\n3️⃣ ユーザー複合更新（3つのキャッシュ削除）")
    # まず複数のユーザーキャッシュを設定
    await mock_redis.set("user:456", pickle.dumps({"id": 456, "name": "Test User"}))
    await mock_redis.set("user:profile:456", pickle.dumps({"age": 25, "city": "Tokyo"}))
    await mock_redis.set("user:settings:456", pickle.dumps({"theme": "dark", "lang": "ja"}))
    print(f"💾 ユーザーキャッシュ設定後: {list(mock_redis.data.keys())}")
    
    await dao.update_user_complex(456, {"name": "Updated User"})
    print(f"💾 残りのキャッシュ: {list(mock_redis.data.keys())}")
    
    # 4. 存在しないキャッシュの削除テスト
    print("\n4️⃣ 存在しないキャッシュの削除テスト")
    await dao.update_quest(999, {"title": "Non-existent Quest"})
    
    print("\n=== ✨ 複数キー削除テスト完了 ===")

if __name__ == "__main__":
    try:
        asyncio.run(test_multi_key_evict())
    except Exception as e:
        print(f"❌ テストエラー: {e}")
        import traceback
        traceback.print_exc()
