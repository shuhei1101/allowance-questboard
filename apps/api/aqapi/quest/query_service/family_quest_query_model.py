from sqlalchemy.engine import Row


from dataclasses import dataclass
from typing import Optional, List, Dict
from sqlalchemy.engine import Row
from collections import defaultdict

@dataclass(frozen=True)
class QuestMemberSummary:
    child_id: int
    child_icon_id: Optional[int]

    @classmethod
    def from_row(cls, row: Row) -> "QuestMemberSummary":
        return cls(
            child_id=row.child_id,
            child_icon_id=row.child_icon_id
        )

@dataclass(frozen=True)
class FamilyQuestSummary:
    id: int
    title: str
    category_id: int
    icon_id: int
    is_shared: bool
    is_public: Optional[bool]
    members: List[QuestMemberSummary]

    @classmethod
    def from_group(cls, row: Row, members: List[QuestMemberSummary]) -> "FamilyQuestSummary":
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
class FamilyQuestSummaries:
    items: List[FamilyQuestSummary]

    @classmethod
    def from_rows(cls, rows: List[Row]) -> "FamilyQuestSummarys":
        grouped: Dict[int, tuple[Row, List[QuestMemberSummary]]] = {}

        for row in rows:
            quest_id = row.quest_id

            if quest_id not in grouped:
                grouped[quest_id] = (row, [])
            grouped[quest_id][1].append(QuestMemberSummary.from_row(row))

        summaries = [
            FamilyQuestSummary.from_group(row, members)
            for row, members in grouped.values()
        ]

        return cls(items=summaries)
        