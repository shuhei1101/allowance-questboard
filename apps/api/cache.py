import redis.asyncio as redis
import functools
import hashlib
import pickle
import inspect

# Redisクライアント(Cloud RunからMemorystoreにつなぐよう設定してね)
redis_client = redis.Redis(host="your-redis-host", port=6379)


# 🔐 キー生成関数(指定 or 自動)
def make_cache_key(key_template: str, func, args, kwargs):
    if key_template:
        bound = inspect.signature(func).bind(*args, **kwargs)
        bound.apply_defaults()
        return key_template.format(**bound.arguments)
    else:
        raw_key = f"{func.__module__}.{func.__name__}:{args}:{kwargs}"
        return hashlib.sha256(raw_key.encode()).hexdigest()


# 🌟 キャッシュ読み書きデコレーター
def cache(key: str = None, ttl: int = 300):
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            cache_key = make_cache_key(key, func, args, kwargs)
            cached = await redis_client.get(cache_key)
            if cached:
                print(f"✨ HIT: {cache_key}")
                return pickle.loads(cached)
            result = await func(*args, **kwargs)
            await redis_client.set(cache_key, pickle.dumps(result), ex=ttl)
            return result

        return wrapper

    return decorator


# 🚫 キャッシュ削除用デコレーター(更新系関数に)
def invalidate_cache(key: str):
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            result = await func(*args, **kwargs)
            cache_key = make_cache_key(key, func, args, kwargs)
            await redis_client.delete(cache_key)
            print(f"🧹 Deleted cache: {cache_key}")
            return result

        return wrapper

    return decorator


# 使用例
from cache import cache, invalidate_cache


class QuestRepository:

    @cache(key="quest:{quest_id}", ttl=600)
    async def get_quest(self, quest_id: int):
        # DBクエリ的な処理
        print("🎯 DBからクエスト取得！")
        return {"id": quest_id, "title": "ドラゴン退治"}

    @invalidate_cache(key="quest:{quest_id}")
    async def update_quest(self, quest_id: int, new_data: dict):
        # DB更新処理
        print("🛠 クエスト更新処理したよ〜")
        return {"status": "ok"}
