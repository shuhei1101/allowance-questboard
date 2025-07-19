from dataclasses import dataclass
from typing import Optional

from aqapi.core.pagination.paginator import Paginator
from aqapi.core.query_service.base_query_service import BaseQueryCommand


@dataclass(frozen=True)
class FetchFamilyQuestSummaryQueryCommand(BaseQueryCommand):
    """家族クエスト概要取得クエリのコマンド"""
    
    family_id: int
    language_id: int
    paginator: Optional[Paginator] = None
