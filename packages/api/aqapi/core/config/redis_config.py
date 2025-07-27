import os
from dotenv import load_dotenv
import redis.asyncio as redis

load_dotenv()
host = os.getenv("REDIS_HOST")
port = os.getenv("REDIS_PORT")

if not host or not port:
    raise ValueError("`REDIS_HOST`と`REDIS_PORT`環境変数が必要です")

redis_client = redis.Redis(host=host, port=int(port))
