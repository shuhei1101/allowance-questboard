from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.auth.jwt_handler import get_user_id
from aqapi.auth.api.v1.login_response import LoginResponse
from aqapi.auth.query_service.login_query_service import LoginQueryService
from aqapi.auth.query_service.login_query_command import LoginQueryCommand


router = APIRouter()

@router.post("/login", response_model=LoginResponse)
async def login(
    user_id: UUID = Depends(get_user_id),
    session: Session = Depends(DB_CONF.get_session)
):
    """JWTトークンを使用したログイン処理
    
    ヘッダーのBearerトークンからユーザーIDを取得し、
    認証情報を返します。

    :param UUID user_id: JWTトークンから取得したユーザーID
    :param Session session: データベースセッション
    :return LoginResponse: ログインレスポンス
    :raises HTTPException: ユーザーが見つからない場合
    """
    try:
        query_service = LoginQueryService(session)
        command = LoginQueryCommand(user_id=user_id)
        query_result = query_service.execute(command)
        
        return LoginResponse.from_query_result(query_result)
        
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
