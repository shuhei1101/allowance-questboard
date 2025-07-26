from typing import Optional
from pydantic import dataclasses


@dataclasses.dataclass
class GetFamilyQuestSummariesRequest:
    """ファミリークエスト一覧取得のリクエスト"""
    family_id: int
    language_id: int
    page: Optional[int] = None
    size: Optional[int] = None
