from sqlalchemy.engine import Row


@dataclass(frozen=True)
class FamilyQuestSummary:
    id: int
    title: str
    category_id: int
    icon_id: int
    is_shared: bool
    is_public: Optional[bool]
    members: List[’QuestMemberSummary’]

    @classmethod
    def from_row(cls, row: Row) -> "FamilyQuestQueryModel":
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

@dataclass(frozen=True)
class QuestMemberSummary:
    child_id: int
    child_icon_id: Optional[int]