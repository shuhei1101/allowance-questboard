from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

from aqapi.quest.api.v1 import get_family_quest_summaries_route
from aqapi.auth.api.v1 import login_route
from aqapi.language.api.v1 import init_route
from aqapi.core.config.db_config import DB_CONF

# 全エンティティをインポート
DB_CONF.import_all_entities()

app = FastAPI()

# CORS設定を追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では適切なオリジンを指定してください
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # OPTIONSを明示的に追加
    allow_headers=["*"],
    expose_headers=["*"],
)

BASE_URL = "/api/v1"
QUEST_URL = f"{BASE_URL}/quest"
app.include_router(get_family_quest_summaries_route.router, prefix=QUEST_URL, tags=["Quest", "Family"])
app.include_router(login_route.router, prefix=BASE_URL, tags=["Auth"])
app.include_router(init_route.router, prefix=BASE_URL, tags=["Language"])

add_pagination(app)
