from fastapi import FastAPI
from fastapi_pagination import add_pagination

from aqapi.quest.api.v1 import get_family_quest_summaries_route
from aqapi.auth.api.v1 import login_route
from aqapi.core.config.db_config import DB_CONF

# 全エンティティをインポート
DB_CONF.import_all_entities()

app = FastAPI()

BASE_URL = "/api/v1"
app.include_router(get_family_quest_summaries_route.router, prefix=BASE_URL, tags=["Quest", "Family"])
app.include_router(login_route.router, prefix=BASE_URL, tags=["Auth"])

add_pagination(app)
