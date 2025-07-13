from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class FamilyAllowanceTablesEntity(BaseEntity):
    """家族お小遣いテーブルエンティティ"""

    __tablename__ = "family_allowance_tables"

    superclass_id: Mapped[int] = mapped_column(Integer, ForeignKey("allowance_tables.id", ondelete="CASCADE"), nullable=False, unique=True, comment="お小遣いテーブルID",)
    family_id: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID",)
    is_public: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, comment="公開フラグ",)

    allowance_table = relationship("AllowanceTablesEntity", foreign_keys=[superclass_id])
    family = relationship("FamiliesEntity", foreign_keys=[family_id])

class FamilyAllowanceTablesHistoryEntity(BaseHistoryEntity):
    """家族お小遣いテーブル履歴エンティティ"""

    __tablename__ = "family_allowance_tables_history"

    superclass_id: Mapped[int] = mapped_column(Integer)
    family_id: Mapped[int] = mapped_column(Integer)
    is_public: Mapped[bool] = mapped_column(Boolean)

    @classmethod
    def from_source(cls, source: "FamilyAllowanceTablesEntity"):
        """元のレコードから履歴エンティティを生成"""
        
        return cls(
            source_id=source.id,
            superclass_id=source.superclass_id,
            family_id=source.family_id,
            is_public=source.is_public,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
