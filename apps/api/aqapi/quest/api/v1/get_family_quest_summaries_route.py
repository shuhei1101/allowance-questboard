from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from aqapi.core.config.db_config import DB_CONF
from aqapi.core.pagination.paginator import Paginator
from aqapi.quest.query_service.fetch_family_quest_query import FetchFamilyQuestSummaryQuery
from aqapi.quest.query_service.fetch_family_quest_query_command import FetchFamilyQuestSummaryQueryCommand
from aqapi.quest.api.v1.get_family_quest_summaries_request import GetFamilyQuestSummariesRequest
from aqapi.quest.api.v1.get_family_quest_summaries_response import GetFamilyQuestSummariesResponse

router = APIRouter()

@router.get("quest/{family_id}/summaries", response_model=GetFamilyQuestSummariesResponse)
async def get_family_quest_summaries(
    family_id: int,
    language_id: int,
    page: Optional[int] = Query(None, ge=1),
    size: Optional[int] = Query(None, ge=1),
    db: Session = Depends(DB_CONF.get_session),
):
    """ファミリークエスト一覧を取得する"""
    service = FetchFamilyQuestSummaryQuery(session=db)

    paginator = Paginator(page=page, size=size) if page and size else None

    command = FetchFamilyQuestSummaryQueryCommand(
        family_id=family_id,
        language_id=language_id,
        paginator=paginator
    )
    
    result = service.execute(command)

    return GetFamilyQuestSummariesResponse.from_result(result)
