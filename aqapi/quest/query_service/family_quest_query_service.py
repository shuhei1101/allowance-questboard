from typing import Optional
from sqlalchemy import Tuple
from sqlalchemy.orm import Session
from aqapi.api.v1.family_member.entity.children_entity import ChildrenEntity
from aqapi.api.v1.quest.entity.family_quests_entity import FamilyQuestsEntity
from aqapi.api.v1.quest.entity.child_quests_entity import MemberQuestsEntity
from aqapi.api.v1.quest.entity.quests_entity import QuestsEntity, QuestsTranslationEntity
from aqapi.api.v1.quest.routes.family_quest_summaries_route import FamilyQuestItems
from aqapi.core.pagination.pagination_meta import PaginationMeta
from aqapi.core.pagination.paginator import Paginator


class FamilyQuestQueryService:
    def __init__(self, session: Session):
        self.session = session

    def fetch_quest_summary(
        self, family_id: int, language_id: int, paginator: Optional[Paginator] = None
    ) -> tuple["Optional[PaginationMeta]", "FamilyQuestItems"]:
        """家族IDでクエストを取得

        必要な情報:
            - クエストID
            - クエスト名: 翻訳テーブルから取得(言語ごと)
            - クエストアイコン
            - 子供
            -
            -
            -
            -

        ページネーション機能
        ソート機能
        """
        query = (
            self.session.query(
                FamilyQuestsEntity.id.label("id"),
                QuestsTranslationEntity.title.label("title"),
                ChildrenEntity.id.label("child_id"),
            )
            .join(QuestsEntity, FamilyQuestsEntity.quest_id == QuestsEntity.id)
            .join(
                QuestsTranslationEntity,
                QuestsEntity.id == QuestsTranslationEntity.quest_id,
            )
            .join(MemberQuestsEntity, QuestsEntity.id == MemberQuestsEntity.quest_id)
            .join(ChildrenEntity, MemberQuestsEntity.child_id == ChildrenEntity.id)
            .filter(QuestsTranslationEntity.language_id == language_id)
            .filter(FamilyQuestsEntity.family_id == family_id)
            .order_by(FamilyQuestsEntity.id)
        )

        if paginator:
            meta, rows = paginator.paginate(query)
        else:
            meta = None
            rows = query.all()

        items = FamilyQuestItems.from_rows(rows)

        return meta, items  # type: ignore
