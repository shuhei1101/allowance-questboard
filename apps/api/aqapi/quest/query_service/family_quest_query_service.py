from typing import Optional, List
from sqlalchemy.orm import Session

from aqapi.child.entity.children_entity import ChildrenEntity
from aqapi.core.pagination.pagination_meta import PaginationMeta
from aqapi.core.pagination.paginator import Paginator
from aqapi.quest.entity.child_quests_entity import ChildQuestsEntity
from aqapi.quest.entity.family_quests_entity import FamilyQuestsEntity
from aqapi.quest.entity.quests_entity import QuestsEntity, QuestsTranslationEntity
from aqapi.quest.entity.shared_quests_entity import SharedQuestsEntity
from aqapi.family.entity.family_members_entity import FamilyMembersEntity

class FamilyQuestQueryService:
    def __init__(self, session: Session):
        self.session = session

    def fetch_quest_summary(
        self, family_id: int, language_id: int, paginator: Optional[Paginator] = None
    ) -> tuple["Optional[PaginationMeta]", "List[FamilyQuestQueryModel]"]:
        """家族IDでクエストを取得してQueryModelとして返す

        取得情報:
            - クエストID
            - クエスト名: 翻訳テーブルから取得(言語ごと)
            - クエストカテゴリID
            - クエストアイコン
            - 公開、非公開フラグ
            - オンライン公開有無
            - 受注しているChildアイコン

        Returns:
            tuple[Optional[PaginationMeta], List[FamilyQuestQueryModel]]: 
                ページネーション情報とQueryModelのリスト
        """
        query = (
            self.session.query(
                FamilyQuestsEntity.id.label("quest_id"),
                QuestsTranslationEntity.title.label("title"),
                QuestsEntity.category_id.label("category_id"),
                QuestsEntity.icon_id.label("icon_id"),
                FamilyQuestsEntity.is_shared.label("is_shared"),
                SharedQuestsEntity.is_public.label("is_public"),
                ChildrenEntity.id.label("child_id"),
                FamilyMembersEntity.icon_id.label("child_icon_id"),
            )
            .join(QuestsEntity, FamilyQuestsEntity.quest_id == QuestsEntity.id)
            .join(QuestsTranslationEntity, QuestsEntity.id == QuestsTranslationEntity.quest_id)
            .join(ChildQuestsEntity, QuestsEntity.id == ChildQuestsEntity.quest_id)
            .join(ChildrenEntity, ChildQuestsEntity.child_id == ChildrenEntity.id)
            .join(FamilyMembersEntity, ChildrenEntity.family_member_id == FamilyMembersEntity.id)
            .outerjoin(SharedQuestsEntity, FamilyQuestsEntity.shared_quest_id == SharedQuestsEntity.id)
            .filter(QuestsTranslationEntity.language_id == language_id)
            .filter(FamilyQuestsEntity.family_id == family_id)
            .filter(ChildrenEntity.family_id == family_id)
            .order_by(FamilyQuestsEntity.id)
        )

        if paginator:
            meta, rows = paginator.paginate(query)
        else:
            meta = None
            rows = query.all()

        summarys = FamilyQuestSummarys.from_rows(rows)

        return meta, summarys
        
