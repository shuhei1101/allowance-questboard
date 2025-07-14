from collections import defaultdict
from typing import Any, List, Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel, dataclasses
from sqlalchemy.orm import Session
from fastapi import Query
from dataclasses import dataclass
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.pagination.pagination_meta import PaginationMeta
from aqapi.core.pagination.paginator import Paginator
from aqapi.quest.query_service.family_quest_query_service import FamilyQuestQueryService
from aqapi.quest.query_service.family_quest_query_model import FamilyQuestSummaries

# DTOクラス定義
@dataclasses.dataclass
class QuestMemberDTO:
    child_id: int
    child_icon_id: Optional[int]

@dataclasses.dataclass  
class QuestDTO:
    id: int
    title: str
    category_id: int
    icon_id: int
    is_shared: bool
    is_public: Optional[bool]
    members: List[QuestMemberDTO]

class FamilyQuestSummariesResponse(BaseModel):
    meta: Optional[PaginationMeta]
    items: List[QuestDTO]  # QuestDTOをそのまま返す

router = APIRouter()

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
    quest_items = []
    for summary in query_models.items:
        quest_dto = QuestDTO(
            id=summary.id,
            title=summary.title,
            category_id=summary.category_id,
            icon_id=summary.icon_id,
            is_shared=summary.is_shared,
            is_public=summary.is_public,
            members=[
                QuestMemberDTO(
                    child_id=member.child_id,
                    child_icon_id=member.child_icon_id
                ) 
                for member in summary.members.items
            ]
        )
        quest_items.append(quest_dto)

    return FamilyQuestSummariesResponse(meta=meta, items=quest_items)
