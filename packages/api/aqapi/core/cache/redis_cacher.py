import functools
import hashlib
import pickle
import inspect
import redis.asyncio as redis

class RedisCacher:
    def __init__(self, redis: redis.Redis):
        self.redis = redis

    def _make_cache_key(self, key_template: str, func, args, kwargs):
        if key_template:
            bound = inspect.signature(func).bind(*args, **kwargs)
            bound.apply_defaults()
            arguments = {k: v for k, v in bound.arguments.items() 
                         if k not in ('self', 'cls')}
            return key_template.format(**arguments)
        else:
            filtered_args = args[1:] if args and hasattr(args[0], '__class__') else args
            raw_key = f"{func.__module__}.{func.__name__}:{filtered_args}:{kwargs}"
            return hashlib.sha256(raw_key.encode()).hexdigest()

    def cache(self, key: str, ttl: int = 60 * 60 * 24 * 7):
        def decorator(func):
            @functools.wraps(func)
            async def wrapper(*args, **kwargs):
                cache_key = self._make_cache_key(key, func, args, kwargs)
                cached = await self.redis.get(cache_key)
                if cached:
                    print(f"✨ HIT: {cache_key}")
                    return pickle.loads(cached)
                result = await func(*args, **kwargs)
                await self.redis.set(cache_key, pickle.dumps(result), ex=ttl)
                return result
            return wrapper
        return decorator

    def evict(self, *keys: str):
        def decorator(func):
            @functools.wraps(func)
            async def wrapper(*args, **kwargs):
                result = await func(*args, **kwargs)
                for key_template in keys:
                    cache_key = self._make_cache_key(key_template, func, args, kwargs)
                    await self.redis.delete(cache_key)
                    print(f"🧹 Deleted cache: {cache_key}")
                return result
            return wrapper
        return decorator
