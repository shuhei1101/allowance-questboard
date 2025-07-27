from sqlalchemy.orm import Session
from sqlalchemy import func
from aqapi.core.query_service.base_query_service import BaseQueryService
from aqapi.login.query_service.login.login_query_command import LoginQueryCommand
from aqapi.login.query_service.login.login_query_result import LoginQueryResult
from aqapi.family_member.entity.family_members_entity import FamilyMembersEntity
from aqapi.parent.entity.parents_entity import ParentsEntity
from aqapi.child.entity.children_entity import ChildrenEntity


class LoginQueryService(BaseQueryService[LoginQueryCommand]):
    """ログインクエリサービス"""

    def __init__(self, session: Session):
        """コンストラクタ

        :param Session session: SQLAlchemyのセッション
        """
        super().__init__(session)

    def execute(self, command: LoginQueryCommand) -> LoginQueryResult:
        """ログインクエリを実行
        
        ユーザーIDから認証に必要な情報を取得する
        
        :param LoginQueryCommand command: ログインクエリコマンド
        :return LoginQueryResult: ログインクエリ結果
        :raises ValueError: ユーザーが見つからない場合
        """
        # 家族メンバー、親、子供の情報を1回のクエリで取得
        result = (
            self.session.query(
                FamilyMembersEntity.user_id,
                FamilyMembersEntity.id.label('family_member_id'),
                func.coalesce(ParentsEntity.family_id, ChildrenEntity.family_id).label('family_id'),
                ParentsEntity.id.label('parent_id'),
                ChildrenEntity.id.label('child_id')
            )
            .outerjoin(ParentsEntity, FamilyMembersEntity.id == ParentsEntity.family_member_id)
            .outerjoin(ChildrenEntity, FamilyMembersEntity.id == ChildrenEntity.family_member_id)
            .filter(FamilyMembersEntity.user_id == command.user_id)
            .first()
        )
        
        if result is None:
            raise ValueError(f"ユーザーID {command.user_id} が見つかりません")
        
        return LoginQueryResult.from_row(result)
