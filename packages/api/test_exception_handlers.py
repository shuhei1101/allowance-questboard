"""
例外ハンドラーのテスト用スクリプト
"""
import pytest
from fastapi import FastAPI, Request
from fastapi.testclient import TestClient
from fastapi.responses import JSONResponse

from aqapi.core.domain.value_object.value_validator import ValueValidateException
from aqapi.core.domain.value_object.relation_validator import RelationValidateException
from aqapi.core.messages.locale_string import LocaleString


def test_value_validate_exception_handler():
    """ValueValidateException例外ハンドラーのテスト"""
    
    # テスト用のFastAPIアプリを作成
    app = FastAPI()
    
    # テスト用のエンドポイントを作成（意図的にエラーを発生させる）
    @app.get("/test-validation-error")
    async def test_validation_error():
        # ValueValidateExceptionを意図的に発生させる
        raise ValueValidateException(
            value_name=LocaleString(ja="テストフィールド", en="Test Field"),
            error_type="test_error",
            message=LocaleString(ja="テストエラーメッセージ", en="Test error message")
        )
    
    # 例外ハンドラーをインポートして登録
    from aqapi.core.exception.exception_handlers import value_validate_exception_handler
    
    @app.exception_handler(ValueValidateException)
    async def handle_value_validate_exception(request: Request, exc: ValueValidateException):
        return value_validate_exception_handler(request, exc)
    
    # テストクライアントを作成
    client = TestClient(app)
    
    # テストリクエストを送信
    response = client.get("/test-validation-error")
    
    # レスポンスをチェック
    assert response.status_code == 400
    response_data = response.json()
    
    print("Response:", response_data)
    
    assert "error" in response_data
    assert response_data["error"]["type"] == "validation_error"
    assert response_data["error"]["message"] == "テストエラーメッセージ"
    assert response_data["error"]["status_code"] == 400
    assert "Field: テストフィールド" in response_data["error"]["details"]
    

def test_relation_validate_exception_handler():
    """RelationValidateException例外ハンドラーのテスト"""
    
    # テスト用のFastAPIアプリを作成
    app = FastAPI()
    
    # テスト用のエンドポイントを作成（意図的にエラーを発生させる）
    @app.get("/test-relation-error")
    async def test_relation_error():
        # RelationValidateExceptionを意図的に発生させる
        raise RelationValidateException(
            error_type="test_relation_error",
            message="テスト関連エラーメッセージ"
        )
    
    # 例外ハンドラーをインポートして登録
    from aqapi.core.exception.exception_handlers import relation_validate_exception_handler
    
    @app.exception_handler(RelationValidateException)
    async def handle_relation_validate_exception(request: Request, exc: RelationValidateException):
        return relation_validate_exception_handler(request, exc)
    
    # テストクライアントを作成
    client = TestClient(app)
    
    # テストリクエストを送信
    response = client.get("/test-relation-error")
    
    # レスポンスをチェック
    assert response.status_code == 400
    response_data = response.json()
    
    print("Response:", response_data)
    
    assert "error" in response_data
    assert response_data["error"]["type"] == "relation_validation_error"
    assert response_data["error"]["message"] == "テスト関連エラーメッセージ"
    assert response_data["error"]["status_code"] == 400
    assert "test_relation_error" in response_data["error"]["details"]


if __name__ == "__main__":
    print("例外ハンドラーのテストを実行中...")
    test_value_validate_exception_handler()
    print("✅ ValueValidateException テスト成功！")
    
    test_relation_validate_exception_handler()
    print("✅ RelationValidateException テスト成功！")
    
    print("🎉 全てのテストが成功しました！")
