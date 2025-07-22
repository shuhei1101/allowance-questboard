#!/usr/bin/env python3
import asyncio
import sys
import os
from unittest.mock import AsyncMock, MagicMock
import pickle
import inspect

# パスを追加
sys.path.append(os.path.abspath('.'))

def _make_cache_key(template: str, func, args, kwargs) -> str:
    """
    テンプレートとパラメータからキャッシュキーを生成する
    """
    sig = inspect.signature(func)
    bound_args = sig.bind(*args, **kwargs)
    bound_args.apply_defaults()
    
    # selfやclsパラメータを除外
    filtered_params = {
        k: v for k, v in bound_args.arguments.items()
        if k not in ('self', 'cls')
    }
    
    try:
        cache_key = template.format(**filtered_params)
        return cache_key
    except KeyError as e:
        raise ValueError(f"テンプレート '{template}' に必要なパラメータ {e} が見つかりません")

# モックRedisクライアント
class MockRedisClient:
    def __init__(self):
        self.data = {}
    
    async def get(self, key: str):
        return self.data.get(key)
    
    async def setex(self, key: str, ttl: int, value: bytes):
        self.data[key] = value
        return True
    
    async def delete(self, key: str):
        self.data.pop(key, None)
        return True

# グローバルなモックRedisクライアント
mock_redis = MockRedisClient()

def cacheable(key_template: str, ttl: int = 3600):
    """
    メソッドの戻り値をキャッシュするデコレータ
    """
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # キャッシュキーを生成
            cache_key = _make_cache_key(key_template, func, args, kwargs)
            print(f"キャッシュキー: {cache_key}")
            
            # キャッシュから取得を試行
            cached_data = await mock_redis.get(cache_key)
            if cached_data:
                print(f"キャッシュヒット: {cache_key}")
                return pickle.loads(cached_data)
            
            # キャッシュにない場合は関数を実行
            print(f"キャッシュミス: {cache_key}")
            result = await func(*args, **kwargs)
            
            # 結果をキャッシュに保存
            await mock_redis.setex(cache_key, ttl, pickle.dumps(result))
            
            return result
        return wrapper
    return decorator

def cache_evict(key_template: str):
    """
    指定されたキーのキャッシュを削除するデコレータ
    """
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # キャッシュキーを生成
            cache_key = _make_cache_key(key_template, func, args, kwargs)
            print(f"キャッシュ削除: {cache_key}")
            
            # キャッシュを削除
            await mock_redis.delete(cache_key)
            
            # 元の関数を実行
            return await func(*args, **kwargs)
        return wrapper
    return decorator

class TestDao:
    def __init__(self):
        pass
    
    @cacheable("user:{user_id}")
    async def get_user(self, user_id: int):
        print(f"💾 データベースから取得: user_id={user_id}")
        return {"id": user_id, "name": f"User{user_id}"}
    
    @cacheable("quests:{id}")
    async def fetch_by_id(self, id: int):
        print(f"💾 データベースから取得: quest_id={id}")
        return {"id": id, "title": f"Quest{id}"}
    
    @cache_evict("user:{user_id}")
    async def update_user(self, user_id: int, data: dict):
        print(f"💾 ユーザー更新: user_id={user_id}, data={data}")
        return True

async def test_cache():
    """キャッシュ機能のテスト"""
    print("=== 🎯 キャッシュテスト開始 ===")
    
    # テスト用DAOを作成
    dao = TestDao()
    
    # 1. 初回アクセス（キャッシュなし）
    print("\n1️⃣ 初回アクセス")
    result1 = await dao.get_user(123)
    print(f"結果: {result1}")
    
    # 2. 二回目アクセス（キャッシュあり）
    print("\n2️⃣ 二回目アクセス（キャッシュヒット期待）")
    result2 = await dao.get_user(123)
    print(f"結果: {result2}")
    
    # 3. 異なるIDでアクセス
    print("\n3️⃣ 異なるIDでアクセス")
    result3 = await dao.get_user(456)
    print(f"結果: {result3}")
    
    # 4. キャッシュ削除テスト
    print("\n4️⃣ キャッシュ削除テスト")
    await dao.update_user(123, {"name": "Updated User"})
    
    # 5. 削除後のアクセス（キャッシュなし）
    print("\n5️⃣ 削除後のアクセス")
    result4 = await dao.get_user(123)
    print(f"結果: {result4}")
    
    # 6. quest fetch_by_idテスト
    print("\n6️⃣ quest fetch_by_idテスト")
    quest1 = await dao.fetch_by_id(999)
    print(f"結果: {quest1}")
    
    # 7. 再度アクセス（キャッシュヒット期待）
    print("\n7️⃣ 再度アクセス（キャッシュヒット期待）")
    quest2 = await dao.fetch_by_id(999)
    print(f"結果: {quest2}")
    
    print("\n=== ✨ キャッシュテスト完了 ===")
    print(f"📊 モックRedisの状態: {list(mock_redis.data.keys())}")

def test_cache_key_generation():
    """キャッシュキー生成のテスト"""
    print("=== 🔑 キャッシュキー生成テスト ===")
    
    # ダミー関数
    def dummy_method(self, user_id: int, name: str = "default"):
        pass
    
    # ダミーオブジェクト
    class DummyClass:
        pass
    
    dummy_obj = DummyClass()
    
    # テストケース1: selfを除外したキー生成
    key1 = _make_cache_key("user:{user_id}:{name}", dummy_method, (dummy_obj, 123, "test"), {})
    print(f"キー1 (self除外): {key1}")
    
    # テストケース2: kwargsでの指定
    key2 = _make_cache_key("user:{user_id}:{name}", dummy_method, (dummy_obj, 123), {"name": "test"})
    print(f"キー2 (kwargs使用): {key2}")
    
    # テストケース3: デフォルト値の適用
    key3 = _make_cache_key("user:{user_id}:{name}", dummy_method, (dummy_obj, 123), {})
    print(f"キー3 (デフォルト値): {key3}")
    
    print("=== ✅ キャッシュキー生成テスト完了 ===")

if __name__ == "__main__":
    # キャッシュキー生成のテスト（同期）
    test_cache_key_generation()
    
    # キャッシュ機能のテスト（非同期）
    try:
        asyncio.run(test_cache())
    except Exception as e:
        print(f"❌ テストエラー: {e}")
        import traceback
        traceback.print_exc()
