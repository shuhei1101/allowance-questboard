from typing import Optional
from uuid import UUID
from sqlalchemy.orm import Session
from aqapi.core.dao.dao import Dao
from aqapi.family_member.entity.family_members_entity import FamilyMembersEntity
from aqapi.parent.entity.parents_entity import ParentsEntity
from aqapi.child.entity.children_entity import ChildrenEntity


class AuthDao(Dao):
    """認証DAOクラス"""

    def __init__(self, session: Session):
        """コンストラクタ

        :param Session session: SQLAlchemyのセッション
        """
        super().__init__(session)

    def fetch_family_member_by_user_id(self, user_id: UUID) -> Optional[FamilyMembersEntity]:
        """ユーザーIDで家族メンバーエンティティを取得する

        :param UUID user_id: ユーザーID
        :return Optional[FamilyMembersEntity]: 家族メンバーエンティティ（見つからない場合はNone）
        """
        return self.session.query(FamilyMembersEntity).filter(
            FamilyMembersEntity.user_id == user_id
        ).first()

    def fetch_parent_by_family_member_id(self, family_member_id: int) -> Optional[ParentsEntity]:
        """家族メンバーIDで親エンティティを取得する

        :param int family_member_id: 家族メンバーID
        :return Optional[ParentsEntity]: 親エンティティ（見つからない場合はNone）
        """
        return self.session.query(ParentsEntity).filter(
            ParentsEntity.family_member_id == family_member_id
        ).first()

    def fetch_child_by_family_member_id(self, family_member_id: int) -> Optional[ChildrenEntity]:
        """家族メンバーIDで子供エンティティを取得する

        :param int family_member_id: 家族メンバーID
        :return Optional[ChildrenEntity]: 子供エンティティ（見つからない場合はNone）
        """
        return self.session.query(ChildrenEntity).filter(
            ChildrenEntity.family_member_id == family_member_id
        ).first()
