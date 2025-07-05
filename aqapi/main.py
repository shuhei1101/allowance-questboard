from fastapi import FastAPI
from fastapi_pagination import add_pagination

from aqapi.quest.api.v1 import accept_quest_route, family_quest_summaries_route


app = FastAPI()

BASE_URL = "/api/v1"
BASE_QUEST_ROUTE = f"{BASE_URL}/quest"
app.include_router(accept_quest_route.router, prefix=BASE_QUEST_ROUTE, tags=["Quest"])
app.include_router(family_quest_summaries_route.router, prefix=BASE_QUEST_ROUTE, tags=["Quest"])

add_pagination(app)
