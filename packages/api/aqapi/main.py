from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from contextlib import asynccontextmanager

from aqapi.core.di_container import di_container

from aqapi.quest.api.v1.get_family_quest_summaries import get_family_quest_summaries_route
from aqapi.login.api.v1.login import login_route
from aqapi.login.api.v1.init import init_route

from aqapi.core.config.db_config import db_config

# 例外ハンドラーをインポート
from aqapi.core.exception.exception_handlers import (
    value_validate_exception_handler,
    relation_validate_exception_handler,
    request_validation_exception_handler,
    http_exception_handler,
    general_exception_handler
)
from aqapi.core.domain.value_object.value_validator import ValueValidateException
from aqapi.core.domain.value_object.relation_validator import RelationValidateException

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

# 例外ハンドラーを登録
@app.exception_handler(ValueValidateException)
async def handle_value_validate_exception(request: Request, exc: ValueValidateException):
    return value_validate_exception_handler(request, exc)

@app.exception_handler(RelationValidateException)
async def handle_relation_validate_exception(request: Request, exc: RelationValidateException):
    return relation_validate_exception_handler(request, exc)

@app.exception_handler(RequestValidationError)
async def handle_request_validation_exception(request: Request, exc: RequestValidationError):
    return request_validation_exception_handler(request, exc)

@app.exception_handler(StarletteHTTPException)
async def handle_http_exception(request: Request, exc: StarletteHTTPException):
    return http_exception_handler(request, exc)

@app.exception_handler(Exception)
async def handle_general_exception(request: Request, exc: Exception):
    return general_exception_handler(request, exc)

BASE_URL = "/api/v1"
app.include_router(get_family_quest_summaries_route.router, prefix=BASE_URL, tags=["Quest", "Family"])
app.include_router(login_route.router, prefix=BASE_URL, tags=["login"])
app.include_router(init_route.router, prefix=BASE_URL, tags=["login", "init"])

add_pagination(app)
