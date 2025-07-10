from collections import defaultdict
from typing import Any, List, Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import Query
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.pagination.pagination_meta import PaginationMeta
from aqapi.core.pagination.paginator import Paginator
from aqapi.quest.query_service.family_quest_query_service import FamilyQuestQueryService

router = APIRouter()

class QuestMember:
    """クエストメンバーDTO"""
    def __init__(self, id: int, icon_id: Optional[int] = None):
        self.id = id
        self.icon_id = icon_id

    def dict(self):
        return {
            "id": self.id,
            "icon_id": self.icon_id
        }

    @classmethod
    def from_query_model(cls, query_model: Any) -> "QuestMember":
        return cls(
            id=query_model.child_id,
            icon_id=query_model.child_icon_id
        )

class FamilyQuestItem:
    """家族クエストアイテムDTO"""
    def __init__(self, id: int, title: str, category_id: int, icon_id: int, 
                 is_shared: bool, is_public: Optional[bool] = None, children: List[QuestMember] = None):
        self.id = id
        self.title = title
        self.category_id = category_id
        self.icon_id = icon_id
        self.is_shared = is_shared
        self.is_public = is_public
        self.children = children or []

    def dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category_id": self.category_id,
            "icon_id": self.icon_id,
            "is_shared": self.is_shared,
            "is_public": self.is_public,
            "children": [child.dict() for child in self.children]
        }

    @classmethod
    def from_query_model(cls, id: int, query_models: List[Any]) -> "FamilyQuestItem":
        """QueryModelから FamilyQuestItem を作成"""
        if not query_models:
            raise ValueError("QueryModel list cannot be empty")
        
        # 最初のクエリモデルから基本情報を取得
        first_model = query_models[0]
        children = [QuestMember.from_query_model(model) for model in query_models]
        
        return cls(
            id=id,
            title=first_model.title,
            category_id=first_model.category_id,
            icon_id=first_model.icon_id,
            is_shared=first_model.is_shared,
            is_public=first_model.is_public,
            children=children
        )

class FamilyQuestItems:
    """家族クエストアイテムリストDTO"""
    def __init__(self, items: List[FamilyQuestItem]):
        self.items = items

    def dict(self):
        return {
            "items": [item.dict() for item in self.items]
        }

    @classmethod
    def from_query_models(cls, query_models: List[Any]) -> "FamilyQuestItems":
        """QueryModelのリストから FamilyQuestItems を作成"""
        grouped = defaultdict(list)
        for model in query_models:
            grouped[model.id].append(model)

        items = [
            FamilyQuestItem.from_query_model(quest_id, models) 
            for quest_id, models in grouped.items()
        ]
        
        return cls(items=items)

class FamilyQuestSummariesResponse(BaseModel):
    meta: Optional[PaginationMeta]
    items: dict  # FamilyQuestItems.dict() の結果を格納

@router.get("/summaries", response_model=FamilyQuestSummariesResponse)
async def get_family_quest_summaries(
    family_id: int,
    language_id: int,
    page: Optional[int] = Query(None, ge=1),
    size: Optional[int] = Query(None, ge=1),
    db: Session = Depends(DB_CONF.get_db),
):
    service = FamilyQuestQueryService(session=db)

    paginator = Paginator(page=page, size=size) if page and size else None

    meta, query_models = service.fetch_quest_summary(
        family_id=family_id, language_id=language_id, paginator=paginator
    )

    # QueryModelからDTOに変換
    items = FamilyQuestItems.from_query_models(query_models)

    return FamilyQuestSummariesResponse(meta=meta, items=items.dict())
