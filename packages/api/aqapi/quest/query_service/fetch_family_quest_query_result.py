from dataclasses import dataclass
from typing import Optional, List, Dict
from sqlalchemy.engine import Row

from aqapi.core.pagination.pagination_meta import PaginationMeta


@dataclass(frozen=True)
class QuestMemberModel:
    child_id: int
    child_icon_id: Optional[int]

    @classmethod
    def from_row(cls, row: Row) -> "QuestMemberModel":
        return cls(
            child_id=row.child_id,
            child_icon_id=row.child_icon_id
        )
        
@dataclass(frozen=True)
class QuestMembersModel:
    items: List[QuestMemberModel]

    @classmethod
    def from_rows(cls, rows: List[Row]) -> "QuestMembersModel":
        return cls([QuestMemberModel.from_row(row) for row in rows])

@dataclass(frozen=True)
class FamilyQuestModel:
    id: int
    title: str
    category_id: int
    icon_id: int
    is_shared: bool
    is_public: Optional[bool]
    members: QuestMembersModel

    @classmethod
    def from_group(cls, row: Row, members: QuestMembersModel) -> "FamilyQuestModel":
        return cls(
            id=row.quest_id,
            title=row.title,
            category_id=row.category_id,
            icon_id=row.icon_id,
            is_shared=row.is_shared,
            is_public=row.is_public,
            members=members
        )

@dataclass(frozen=True)
class FetchFamilyQuestSummaryQueryResult:
    meta: Optional[PaginationMeta]
    items: List[FamilyQuestModel]

    @classmethod
    def from_rows(cls, rows: List[Row], meta: Optional[PaginationMeta] = None) -> "FetchFamilyQuestSummaryQueryResult":
        grouped: Dict[int, tuple[Row, List[Row]]] = {}

        for row in rows:
            quest_id = row.quest_id
            if quest_id not in grouped:
                grouped[quest_id] = (row, [])
            grouped[quest_id][1].append(row)

        summaries = [
            FamilyQuestModel.from_group(
                row,
                QuestMembersModel.from_rows(member_rows)
            )
            for row, member_rows in grouped.values()
        ]

        return cls(meta=meta, items=summaries)
        