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

class QuestMember(BaseModel):
    id: int

    @classmethod
    def from_row(cls, row: Any) -> "QuestMember":
        return cls(id=row.child_id)

class FamilyQuestItem(BaseModel):
    id: int
    title: str
    children: List[QuestMember]

    @classmethod
    def from_data(cls, id: int, data: Any):
        return cls(
            id=id,
            title=data["title"],
            children=data["children"],
        )

class FamilyQuestItems(BaseModel):
    items: List[FamilyQuestItem]

    @classmethod
    def from_rows(cls, rows: Any) -> "FamilyQuestItems":
        grouped = defaultdict(lambda: {"title": "", "children": []})
        for row in rows:
            id = row.id
            grouped[id]["title"] = row.title
            grouped[id]["children"].append(QuestMember.from_row(row))  # type: ignore

        return FamilyQuestItems(
            items=[FamilyQuestItem.from_data(id, data) for id, data in grouped.items()]
        )

class FamilyQuestSummariesResponse(BaseModel):
    meta: Optional[PaginationMeta]
    items: FamilyQuestItems

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

    meta, items = service.fetch_quest_summary(
        family_id=family_id, language_id=language_id, paginator=paginator
    )

    return FamilyQuestSummariesResponse(meta=meta, items=items)
