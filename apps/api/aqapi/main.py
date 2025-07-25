from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from contextlib import asynccontextmanager

from aqapi.core.di_container import di_container
from aqapi.quest.api.v1 import get_family_quest_summaries_route
from aqapi.auth.api.v1 import login_route
from aqapi.language.api.v1 import init_route

from aqapi.core.config.db_config import db_config

@asynccontextmanager
async def lifespan(app: FastAPI):
    """アプリケーションのライフサイクル管理"""
    # 起動時
    print("🚀 アプリケーション起動中...")
    
    print("✨ アプリケーション起動完了！")
    yield
    # 終了時
    print("🛑 アプリケーション終了中...")

app = FastAPI(lifespan=lifespan)

# CORS設定を追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では適切なオリジンを指定してください
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # OPTIONSを明示的に追加
    allow_headers=["*"],
    expose_headers=["*"],
)

db_config.import_all_entities()

BASE_URL = "/api/v1"
QUEST_URL = f"{BASE_URL}/quest"
app.include_router(get_family_quest_summaries_route.router, prefix=QUEST_URL, tags=["Quest", "Family"])
app.include_router(login_route.router, prefix=BASE_URL, tags=["Auth"])
app.include_router(init_route.router, prefix=BASE_URL, tags=["Language"])

add_pagination(app)
