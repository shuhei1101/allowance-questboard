from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.auth.jwt_handler import get_user_id
from aqapi.auth.domain.auth_info import AuthInfo

from aqapi.auth.usecase.login_usecase import LoginUsecase


router = APIRouter()


class LoginResponse(BaseModel):
    user_id: str
    parent_id: Optional[int] = None
    member_id: Optional[int] = None

    @classmethod
    def from_auth_info(cls, auth_info: AuthInfo) -> "LoginResponse":
        """認証情報ドメインモデルからレスポンスモデルを作成

        :param AuthInfo auth_info: 認証情報ドメインモデル
        :return LoginResponse: レスポンスモデル
        """
        return cls(
            user_id=str(auth_info.user_id),
            parent_id=auth_info.parent_id,
            member_id=auth_info.family_member_id
        )

@router.post("/login", response_model=LoginResponse)
async def login(
    user_id: UUID = Depends(get_user_id),
    session: Session = Depends(DB_CONF.get_session)
):
    """JWTトークンを使用したログイン処理
    
    ヘッダーのBearerトークンからユーザーIDを取得し、
    認証情報を返します。

    :param LoginRequest request: ログインリクエスト
    :param UUID user_id: JWTトークンから取得したユーザーID
    :param Session session: データベースセッション
    :return LoginResponse: ログインレスポンス
    :raises HTTPException: ユーザーが見つからない場合
    """
    usecase = LoginUsecase(session)
    auth_info = usecase.execute(user_id)
    
    if auth_info is None:
        raise HTTPException(
            status_code=404,
            detail="ユーザーが見つかりません"
        )
    
    return LoginResponse.from_auth_info(auth_info)
