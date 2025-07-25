from typing import override
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import db_config
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

class FamilyAllowanceTablesHistoryEntity(BaseHistoryEntity[FamilyAllowanceTablesEntity]):
    """家族お小遣いテーブル履歴エンティティ"""

    __tablename__ = "family_allowance_tables_history"

    superclass_id: Mapped[int] = mapped_column(Integer)
    family_id: Mapped[int] = mapped_column(Integer)
    is_public: Mapped[bool] = mapped_column(Boolean)

    @override
    @classmethod
    def _set_specific_attrs(cls, instance: 'FamilyAllowanceTablesHistoryEntity', source: FamilyAllowanceTablesEntity) -> None:
        instance.superclass_id = source.superclass_id
        instance.family_id = source.family_id
        instance.is_public = source.is_public
