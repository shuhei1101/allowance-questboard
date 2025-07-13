from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class ChildAllowanceTablesEntity(BaseEntity):
    """子供お小遣いテーブルエンティティ"""

    __tablename__ = "child_allowance_tables"

    superclass_id: Mapped[int] = mapped_column(Integer, ForeignKey("allowance_tables.id", ondelete="CASCADE"), nullable=False, unique=True, comment="お小遣いテーブルID",)
    child_id: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID",)

    allowance_table = relationship("AllowanceTablesEntity", foreign_keys=[superclass_id])
    child = relationship("ChildrenEntity", foreign_keys=[child_id])

class ChildAllowanceTablesHistoryEntity(BaseHistoryEntity):
    """子供お小遣いテーブル履歴エンティティ"""

    __tablename__ = "child_allowance_tables_history"

    superclass_id: Mapped[int] = mapped_column(Integer)
    child_id: Mapped[int] = mapped_column(Integer)

    @classmethod
    def from_source(cls, source: "ChildAllowanceTablesEntity"):
        return cls(
            source_id=source.id,
            superclass_id=source.superclass_id,
            child_id=source.child_id,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
