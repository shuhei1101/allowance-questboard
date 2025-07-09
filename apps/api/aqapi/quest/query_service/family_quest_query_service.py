from typing import Optional
from sqlalchemy import Tuple
from sqlalchemy.orm import Session

from aqapi.child.entity.children_entity import ChildrenEntity
from aqapi.core.pagination.pagination_meta import PaginationMeta
from aqapi.core.pagination.paginator import Paginator
from aqapi.quest.api.v1.family_quest_summaries_route import FamilyQuestItems
from aqapi.quest.entity.child_quests_entity import ChildQuestsEntity
from aqapi.quest.entity.family_quests_entity import FamilyQuestsEntity
from aqapi.quest.entity.quests_entity import QuestsEntity, QuestsTranslationEntity
from aqapi.quest.entity.shared_quests_entity import SharedQuestsEntity
from aqapi.family.entity.family_members import FamilyMembersEntity


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
            - クエストカテゴリID
            - クエストアイコン
            - 公開、非公開フラグ
            - オンライン公開有無
            - 受注しているChildアイコン

        ページネーション機能
        ソート機能
        """
        # クエスト基本情報を取得するメインクエリ
        # family_quests -> quests -> quests_translation の結合でクエスト情報を取得
        # child_quests -> children -> family_members の結合で受注している子供の情報を取得
        query = (
            self.session.query(
                FamilyQuestsEntity.id.label("id"),
                QuestsTranslationEntity.title.label("title"),
                QuestsEntity.category_id.label("category_id"),
                QuestsEntity.icon_id.label("icon_id"),
                FamilyQuestsEntity.is_shared.label("is_shared"),
                SharedQuestsEntity.is_public.label("is_public"),
                ChildrenEntity.id.label("child_id"),
                FamilyMembersEntity.icon_id.label("child_icon_id"),
            )
            # 家族クエスト -> クエスト基本情報
            .join(QuestsEntity, FamilyQuestsEntity.quest_id == QuestsEntity.id)
            # クエスト基本情報 -> クエスト翻訳情報
            .join(
                QuestsTranslationEntity,
                QuestsEntity.id == QuestsTranslationEntity.quest_id,
            )
            # クエスト基本情報 -> 子供クエスト（どの子供がこのクエストを受注しているか）
            .join(ChildQuestsEntity, QuestsEntity.id == ChildQuestsEntity.quest_id)
            # 子供クエスト -> 子供情報
            .join(ChildrenEntity, ChildQuestsEntity.child_id == ChildrenEntity.id)
            # 子供情報 -> 家族メンバー情報（アイコン取得用）
            .join(FamilyMembersEntity, ChildrenEntity.family_member_id == FamilyMembersEntity.id)
            # 家族クエスト -> 共有クエスト（公開情報取得用、LEFT JOIN）
            .outerjoin(SharedQuestsEntity, FamilyQuestsEntity.shared_quest_id == SharedQuestsEntity.id)
            # フィルタ条件
            .filter(QuestsTranslationEntity.language_id == language_id)
            .filter(FamilyQuestsEntity.family_id == family_id)
            # 同一家族内の子供のみをフィルタ
            .filter(ChildrenEntity.family_id == family_id)
            .order_by(FamilyQuestsEntity.id)
        )

        if paginator:
            meta, rows = paginator.paginate(query)
        else:
            meta = None
            rows = query.all()

        items = FamilyQuestItems.from_rows(rows)

        return meta, items  # type: ignore
