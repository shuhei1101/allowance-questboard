from typing import Optional
from sqlalchemy.orm import Session

from aqapi.core.query_service.base_query_service import BaseQueryService
from aqapi.family_member.entity.family_members_entity import FamilyMembersEntity
from aqapi.parent.entity.parents_entity import ParentsEntity
from aqapi.child.entity.children_entity import ChildrenEntity

class FetchUserInfoQueryCommand:
    """ユーザー情報取得クエリコマンド"""
    
    def __init__(self, user_id: str):
        self.user_id = user_id

class FetchUserInfoQueryModel:
    """ユーザー情報取得クエリモデル"""

    def __init__(self, user_id: str, parent_id: Optional[int] = None, member_id: Optional[int] = None):
        self.user_id = user_id
        self.parent_id = parent_id
        self.member_id = member_id

    @classmethod
    def from_row(cls, row) -> "FetchUserInfoQueryModel":
        """データベースの行からクエリモデルを作成

        :param row: データベースから取得した行
        :return FetchUserInfoQueryModel: クエリモデル
        """
        return cls(
            user_id=row.user_id,
            parent_id=row.parent_id,
            member_id=row.member_id
        )

class FetchUserInfoQuery(BaseQueryService):
    """ユーザー情報取得クエリサービス"""

    def __init__(self, session: Session):
        super().__init__(session)

    def execute(self, command: FetchUserInfoQueryCommand) -> Optional[FetchUserInfoQueryModel]:
        """ユーザーIDからログイン情報を取得する

        :param FetchUserInfoQueryCommand command: ユーザー情報取得コマンド
        :return Optional[FetchUserInfoQueryModel]: ユーザー情報クエリモデル（見つからない場合はNone）
        """
        
        # 一回のクエリでJOINを使用してすべての情報を取得
        query = (
            self.session.query(
                FamilyMembersEntity.user_id.label("user_id"),
                ParentsEntity.id.label("parent_id"),
                ChildrenEntity.id.label("member_id")
            )
            .filter(FamilyMembersEntity.user_id == command.user_id)
            .outerjoin(ParentsEntity, ParentsEntity.family_member_id == FamilyMembersEntity.id)
            .outerjoin(ChildrenEntity, ChildrenEntity.family_member_id == FamilyMembersEntity.id)
        )
        
        row = query.first()
        
        if row is None:
            return None
            
        return FetchUserInfoQueryModel.from_row(row)
