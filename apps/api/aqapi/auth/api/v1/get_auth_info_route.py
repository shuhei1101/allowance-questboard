from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from aqapi.core.config.db_config import DB_CONF
from aqapi.auth.service.get_auth_info_usecase import GetAuthInfoUsecase
from aqapi.auth.domain.auth_info import AuthInfo


router = APIRouter()


class GetAuthInfoRequest(BaseModel):
    """認証情報取得リクエスト"""
    user_id: UUID
    """ユーザーID"""


class GetAuthInfoResponse(BaseModel):
    """認証情報取得レスポンス"""
    user_id: UUID
    """ユーザーID"""
    
    family_member_id: int
    """家族メンバーID"""
    
    family_id: int
    """家族ID"""
    
    parent_id: Optional[int] = None
    """親ID（親の場合のみ）"""
    
    child_id: Optional[int] = None
    """子供ID（子供の場合のみ）"""
    
    is_parent: bool
    """親かどうか"""
    
    is_child: bool
    """子供かどうか"""

    @classmethod
    def from_domain(cls, auth_info: AuthInfo) -> "GetAuthInfoResponse":
        """ドメインモデルからレスポンスモデルを作成

        :param AuthInfo auth_info: 認証情報ドメインモデル
        :return GetAuthInfoResponse: レスポンスモデル
        """
        return cls(
            user_id=auth_info.user_id,
            family_member_id=auth_info.family_member_id,
            family_id=auth_info.family_id,
            parent_id=auth_info.parent_id,
            child_id=auth_info.child_id,
            is_parent=auth_info.is_parent(),
            is_child=auth_info.is_child()
        )


@router.post("/auth-info", response_model=GetAuthInfoResponse)
async def get_auth_info(
    request: GetAuthInfoRequest,
    session: Session = Depends(DB_CONF.get_session)
):
    """ユーザーIDから認証情報を取得する

    :param GetAuthInfoRequest request: リクエスト
    :param Session session: データベースセッション
    :return GetAuthInfoResponse: 認証情報レスポンス
    :raises HTTPException: ユーザーが見つからない場合
    """
    usecase = GetAuthInfoUsecase(session)
    auth_info = usecase.execute(request.user_id)
    
    if auth_info is None:
        raise HTTPException(
            status_code=404,
            detail="ユーザーが見つかりません"
        )
    
    return GetAuthInfoResponse.from_domain(auth_info)
