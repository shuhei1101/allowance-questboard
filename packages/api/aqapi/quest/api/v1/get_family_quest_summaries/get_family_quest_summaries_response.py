from typing import List, Optional
from pydantic import dataclasses
from aqapi.core.pagination.pagination_meta import PaginationMeta


@dataclasses.dataclass
class QuestMemberDto:
    child_id: int
    child_icon_id: Optional[int]


@dataclasses.dataclass
class QuestDto:
    id: int
    title: str
    category_id: int
    icon_id: int
    is_shared: bool
    is_public: Optional[bool]
    members: List[QuestMemberDto]


@dataclasses.dataclass
class QuestSummariesDto:
    """クエスト一覧を表現するファーストコレクション"""
    items: List[QuestDto]
    
    @classmethod
    def from_models(cls, quest_summaries) -> "QuestSummariesDto":
        """QueryResultから変換するファクトリメソッド"""
        quest_items = []
        for summary in quest_summaries.items:
            quest_dto = QuestDto(
                id=summary.id,
                title=summary.title,
                category_id=summary.category_id,
                icon_id=summary.icon_id,
                is_shared=summary.is_shared,
                is_public=summary.is_public,
                members=[
                    QuestMemberDto(
                        child_id=member.child_id,
                        child_icon_id=member.child_icon_id
                    ) 
                    for member in summary.members.items
                ]
            )
            quest_items.append(quest_dto)
        
        return cls(items=quest_items)


@dataclasses.dataclass
class GetFamilyQuestSummariesResponse:
    """ファミリークエスト一覧取得のレスポンス"""
    meta: Optional[PaginationMeta]
    items: List[QuestDto]
    
    @classmethod
    def from_result(cls, result) -> "GetFamilyQuestSummariesResponse":
        """QueryResultから変換するファクトリメソッド"""
        quest_summaries_dto = QuestSummariesDto.from_models(result)
        return cls(
            meta=result.meta,
            items=quest_summaries_dto.items
        )
