import functools
import inspect
from typing import override
from .redis_cacher import RedisCacher


class MockRedisCacher(RedisCacher):
    """
    RedisCacherのモッククラス
    テスト用として実際のRedis接続を行わずにキャッシュ機能を模擬する
    """
    
    def __init__(self, redis=None):
        """
        モック用なので引数は無視して何もしない
        親クラスの初期化はスキップする
        """
        # 親クラスの初期化をスキップして、redisインスタンスは設定しない
        pass

    @override
    def _make_cache_key(self, key_template: str, func, args, kwargs):
        """
        キャッシュキー作成のモック
        実際の処理は行わず、適当なキーを返す
        """
        if key_template:
            bound = inspect.signature(func).bind(*args, **kwargs)
            bound.apply_defaults()
            arguments = {k: v for k, v in bound.arguments.items() 
                         if k not in ('self', 'cls')}
            return key_template.format(**arguments)
        else:
            # モックなので簡易的な処理
            return f"mock_cache_key_{func.__name__}"

    @override
    def cache(self, key: str, ttl: int = 60 * 60 * 24 * 7):
        """
        キャッシュデコレータのモック（親クラスをオーバーライド）
        実際のキャッシュは行わず、常に元の関数を実行する
        """
        def decorator(func):
            @functools.wraps(func)
            async def wrapper(*args, **kwargs):
                # モックなのでキャッシュチェックはせず、常に関数を実行
                result = await func(*args, **kwargs)
                return result
            return wrapper
        return decorator

    @override
    def evict(self, *keys: str):
        """
        キャッシュ削除デコレータのモック（親クラスをオーバーライド）
        実際の削除は行わず、元の関数を実行するだけ
        """
        def decorator(func):
            @functools.wraps(func)
            async def wrapper(*args, **kwargs):
                result = await func(*args, **kwargs)
                # モックなので実際の削除処理は行わない
                return result
            return wrapper
        return decorator
