from typing import Optional
from sqlalchemy.orm import Session

from aqapi.child.entity.children_entity import ChildrenEntity
from aqapi.core.pagination.pagination_meta import PaginationMeta
from aqapi.core.pagination.paginator import Paginator
from aqapi.quest.entity.family_quests_entity import FamilyQuestsEntity
from aqapi.quest.entity.quests_entity import QuestsEntity, QuestsTranslationEntity
from aqapi.quest.entity.shared_quests_entity import SharedQuestsEntity
from aqapi.quest.query_service.fetch_family_quest_query_result import FetchFamilyQuestSummaryQueryResult
from aqapi.family_member.entity.family_members_entity import FamilyMembersEntity
from aqapi.quest.entity.quest_members_entity import QuestMembersEntity
from aqapi.core.query_service.base_query_service import BaseQueryService
from aqapi.quest.query_service.fetch_family_quest_query_command import FetchFamilyQuestSummaryQueryCommand


class FetchFamilyQuestSummaryQuery(BaseQueryService[FetchFamilyQuestSummaryQueryCommand]):
    """家族クエスト概要取得クエリサービス"""

    def __init__(self, session: Session):
        """コンストラクタ

        :param Session session: SQLAlchemyのセッション
        """
        super().__init__(session)

    def execute(self, command: FetchFamilyQuestSummaryQueryCommand) -> FetchFamilyQuestSummaryQueryResult:
        """家族IDでクエストを取得してQueryModelとして返す

        取得情報:
            - クエストID
            - クエスト名: 翻訳テーブルから取得(言語ごと)
            - クエストカテゴリID
            - クエストアイコン
            - 公開、非公開フラグ
            - オンライン公開有無
            - 受注しているChildアイコン

        :param FetchFamilyQuestSummaryQueryCommand command: 家族クエスト概要取得コマンド
        :return FetchFamilyQuestSummaryQueryResult: クエリ結果（ページネーション情報含む）
        """
        query = (
            self.session.query(
                FamilyQuestsEntity.id.label("quest_id"),
                QuestsTranslationEntity.title.label("title"),
                QuestsEntity.category_id.label("category_id"),
                QuestsEntity.icon_id.label("icon_id"),
                SharedQuestsEntity.is_shared.label("is_shared"),
                FamilyQuestsEntity.is_public.label("is_public"),
                ChildrenEntity.id.label("child_id"),
                FamilyMembersEntity.icon_id.label("child_icon_id"),
            )
            .join(QuestsEntity, FamilyQuestsEntity.quest_id == QuestsEntity.id)
            .join(QuestsTranslationEntity, QuestsEntity.id == QuestsTranslationEntity.quest_id)
            .join(QuestMembersEntity, FamilyQuestsEntity.id == QuestMembersEntity.family_quest_id)
            .join(ChildrenEntity, QuestMembersEntity.member_id == ChildrenEntity.id)
            .join(FamilyMembersEntity, ChildrenEntity.family_member_id == FamilyMembersEntity.id)
            .outerjoin(SharedQuestsEntity, FamilyQuestsEntity.id == SharedQuestsEntity.source_family_quest_id)
            .filter(QuestsTranslationEntity.language_id == command.language_id)
            .filter(FamilyQuestsEntity.family_id == command.family_id)
            .filter(ChildrenEntity.family_id == command.family_id)
            .order_by(FamilyQuestsEntity.id)
        )

        if command.paginator:
            meta, rows = command.paginator.execute(query)
        else:
            meta = None
            rows = query.all()

        result = FetchFamilyQuestSummaryQueryResult.from_rows(rows, meta)

        return result
        
