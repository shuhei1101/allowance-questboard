from typing import Optional
from uuid import UUID
from sqlalchemy.orm import Session
from aqapi.auth.dao.auth_dao import AuthDao
from aqapi.auth.domain.auth_info import AuthInfo


class GetAuthInfoUsecase:
    """認証情報取得ユースケース"""

    def __init__(self, session: Session):
        """コンストラクタ

        :param Session session: SQLAlchemyのセッション
        """
        self.session = session
        self.auth_dao = AuthDao(session)

    def execute(self, user_id: UUID) -> Optional[AuthInfo]:
        """ユーザーIDから認証情報を取得する

        :param UUID user_id: ユーザーID
        :return Optional[AuthInfo]: 認証情報（見つからない場合はNone）
        """
        # まず家族メンバー情報を取得
        family_member = self.auth_dao.fetch_family_member_by_user_id(user_id)
        if family_member is None:
            return None

        # 親情報を取得
        parent = self.auth_dao.fetch_parent_by_family_member_id(family_member.id)
        parent_id = parent.id if parent else None
        family_id_from_parent = parent.family_id if parent else None

        # 子供情報を取得
        child = self.auth_dao.fetch_child_by_family_member_id(family_member.id)
        child_id = child.id if child else None
        family_id_from_child = child.family_id if child else None

        # 家族IDを決定（親または子供のどちらかから取得）
        family_id = family_id_from_parent or family_id_from_child
        if family_id is None:
            return None

        return AuthInfo(
            user_id=user_id,
            family_member_id=family_member.id,
            family_id=family_id,
            parent_id=parent_id,
            child_id=child_id
        )
