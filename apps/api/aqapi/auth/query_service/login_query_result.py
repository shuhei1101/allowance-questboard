from dataclasses import dataclass
from typing import Optional
from uuid import UUID


@dataclass
class AuthInfoModel:
    """認証情報モデル
    
    :param UUID user_id: ユーザーID
    :param int family_member_id: 家族メンバーID
    :param int family_id: 家族ID
    :param Optional[int] parent_id: 親ID（親の場合のみ）
    :param Optional[int] child_id: 子供ID（子供の場合のみ）
    """
    user_id: UUID
    family_member_id: int
    family_id: int
    parent_id: Optional[int] = None
    child_id: Optional[int] = None

    @classmethod
    def from_row(cls, row) -> "AuthInfoModel":
        """SQLAlchemyのクエリ結果からAuthInfoModelを生成
        
        :param row: SQLAlchemyのクエリ結果
        :return AuthInfoModel: 認証情報モデル
        """
        return cls(
            user_id=row.user_id,
            family_member_id=row.family_member_id,
            family_id=row.family_id,
            parent_id=getattr(row, 'parent_id', None),
            child_id=getattr(row, 'child_id', None)
        )


@dataclass
class LoginQueryResult:
    """ログインクエリ結果
    
    :param AuthInfoModel item: 認証情報モデル
    """
    item: AuthInfoModel

    @classmethod
    def from_row(cls, row) -> "LoginQueryResult":
        """SQLAlchemyのクエリ結果からLoginQueryResultを生成
        
        :param row: SQLAlchemyのクエリ結果
        :return LoginQueryResult: ログインクエリ結果
        """
        return cls(
            item=AuthInfoModel.from_row(row)
        )
