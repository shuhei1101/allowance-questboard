from sqlalchemy.engine import Row


@dataclass(frozen=True)
class FamilyQuestQueryModel:
    """家族クエスト情報のQueryModel"""

    id: int
    title: str
    category_id: int
    icon_id: int
    is_shared: bool
    is_public: Optional[bool]
    child_id: int
    child_icon_id: Optional[int]

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