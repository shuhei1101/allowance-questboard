"""
FastAPIアプリケーション全体で使用される例外ハンドラー
"""
import traceback
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from typing import Union, Optional

from aqapi.core.domain.value_object.value_validator import ValueValidateException
from aqapi.core.domain.value_object.relation_validator import RelationValidateException
from aqapi.core.log.app_logger import logger


class ErrorResponse:
    """エラーレスポンスの構造を統一するクラス"""
    
    @staticmethod
    def create(
        status_code: int, 
        error_type: str, 
        message: str, 
        details: Optional[str] = None
    ) -> dict:
        """エラーレスポンスを作成"""
        response = {
            "error": {
                "type": error_type,
                "message": message,
                "status_code": status_code
            }
        }
        if details:
            response["error"]["details"] = details
        return response


def value_validate_exception_handler(
    request: Request, 
    exc: ValueValidateException
) -> JSONResponse:
    """ValueValidateException用の例外ハンドラー"""
    logger.e(f"Validation error: {exc.message.ja}")
    logger.e(f"Stack trace: {traceback.format_exc()}")
    
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=ErrorResponse.create(
            status_code=status.HTTP_400_BAD_REQUEST,
            error_type="validation_error",
            message=exc.message.ja,
            details=f"Field: {exc.value_name.ja}, Error Type: {exc.error_type}"
        )
    )


def relation_validate_exception_handler(
    request: Request, 
    exc: RelationValidateException
) -> JSONResponse:
    """RelationValidateException用の例外ハンドラー"""
    logger.e(f"Relation validation error: {exc.message}")
    logger.e(f"Stack trace: {traceback.format_exc()}")
    
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=ErrorResponse.create(
            status_code=status.HTTP_400_BAD_REQUEST,
            error_type="relation_validation_error", 
            message=exc.message,
            details=f"Error Type: {exc.error_type}"
        )
    )


def request_validation_exception_handler(
    request: Request, 
    exc: RequestValidationError
) -> JSONResponse:
    """FastAPIの標準バリデーションエラー用ハンドラー"""
    logger.e(f"Request validation error: {exc.errors()}")
    logger.e(f"Stack trace: {traceback.format_exc()}")
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=ErrorResponse.create(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            error_type="request_validation_error",
            message="リクエストの形式が正しくありません",
            details=str(exc.errors())
        )
    )


def http_exception_handler(
    request: Request, 
    exc: StarletteHTTPException
) -> JSONResponse:
    """HTTPException用のハンドラー"""
    logger.e(f"HTTP exception: {exc.detail}")
    logger.e(f"Stack trace: {traceback.format_exc()}")
    
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse.create(
            status_code=exc.status_code,
            error_type="http_error",
            message=exc.detail or "HTTPエラーが発生しました"
        )
    )


def general_exception_handler(
    request: Request, 
    exc: Exception
) -> JSONResponse:
    """その他の全ての例外用ハンドラー"""
    # スタックトレース情報を取得
    stack_trace = traceback.format_exc()
    
    logger.e(f"Unexpected error: {str(exc)}")
    logger.e(f"Stack trace: {stack_trace}")
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse.create(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            error_type="internal_server_error",
            message="内部サーバーエラーが発生しました"
        )
    )
