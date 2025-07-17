from fastapi import FastAPI
from fastapi_pagination import add_pagination

from aqapi.quest.api.v1 import accept_quest_route, family_quest_summaries_route
from aqapi.auth.api.v1 import get_auth_info_route
from aqapi.core.config.db_config import DB_CONF

# 全エンティティをインポート
DB_CONF.import_all_entities()

app = FastAPI()

BASE_URL = "/api/v1"
BASE_QUEST_ROUTE = f"{BASE_URL}/quest"
BASE_AUTH_ROUTE = f"{BASE_URL}/auth"
app.include_router(accept_quest_route.router, prefix=BASE_QUEST_ROUTE, tags=["Quest"])
app.include_router(family_quest_summaries_route.router, prefix=BASE_QUEST_ROUTE, tags=["Quest"])
app.include_router(get_auth_info_route.router, prefix=BASE_AUTH_ROUTE, tags=["Auth"])

add_pagination(app)
