from typing import Optional, List
from sqlalchemy.orm import Session

from aqapi.child.entity.children_entity import ChildrenEntity
from aqapi.core.pagination.pagination_meta import PaginationMeta
from aqapi.core.pagination.paginator import Paginator
from aqapi.quest.entity.child_quests_entity import ChildQuestsEntity
from aqapi.quest.entity.family_quests_entity import FamilyQuestsEntity
from aqapi.quest.entity.quests_entity import QuestsEntity, QuestsTranslationEntity
from aqapi.quest.entity.shared_quests_entity import SharedQuestsEntity
from aqapi.family.entity.family_members import FamilyMembersEntity


class FamilyQuestQueryModel:
    """家族クエスト情報のQueryModel
    
    QueryServiceでJOINしたテーブルの全ての情報を格納するクラス。
    SQLのクエリ結果とAPIレスポンスの間の中間表現として使用。
    """
    
    def __init__(self, id: int, title: str, category_id: int, icon_id: int,
                 is_shared: bool, is_public: Optional[bool], child_id: int,
                 child_icon_id: Optional[int]):
        # FamilyQuestsEntity からの情報
        self.id = id  # クエストID
        self.is_shared = is_shared  # 共有フラグ
        
        # QuestsEntity からの情報
        self.category_id = category_id  # カテゴリID
        self.icon_id = icon_id  # アイコンID
        
        # QuestsTranslationEntity からの情報
        self.title = title  # クエスト名（翻訳済み）
        
        # SharedQuestsEntity からの情報
        self.is_public = is_public  # 公開フラグ
        
        # ChildrenEntity からの情報
        self.child_id = child_id  # 子供ID
        
        # FamilyMembersEntity からの情報
        self.child_icon_id = child_icon_id  # 子供のアイコンID

    @classmethod
    def from_row(cls, row) -> "FamilyQuestQueryModel":
        """SQLクエリ結果の行からQueryModelを作成"""
        return cls(
            id=row.id,
            title=row.title,
            category_id=row.category_id,
            icon_id=row.icon_id,
            is_shared=row.is_shared,
            is_public=row.is_public,
            child_id=row.child_id,
            child_icon_id=row.child_icon_id
        )


class FamilyQuestQueryService:
    def __init__(self, session: Session):
        self.session = session

    def fetch_quest_summary(
        self, family_id: int, language_id: int, paginator: Optional[Paginator] = None
    ) -> tuple["Optional[PaginationMeta]", "List[FamilyQuestQueryModel]"]:
        """家族IDでクエストを取得してQueryModelとして返す

        必要な情報:
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

        # SQLクエリ結果をQueryModelに変換
        query_models = [FamilyQuestQueryModel.from_row(row) for row in rows]

        return meta, query_models  # type: ignore
