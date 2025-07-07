from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseHistoryEntity


class SharedAllowanceTablesEntity(BaseEntity):
    """保存された共有お小遣いテーブルエンティティ"""

    __tablename__ = "shared_allowance_tables"
    __table_args__ = (
        # 家族とテーブルで一意
        UniqueConstraint("family_allowance_table_id", "family_id"),
    )

    family_allowance_table_id = Column(Integer, ForeignKey("shared_allowance_tables.id", ondelete="CASCADE"), nullable=False, comment="共有お小遣いテーブルID")
    shared_by = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="共有元家族ID")

    family_allowance_table = relationship("FamilyAllowanceTablesEntity")
    family = relationship("FamiliesEntity")

class SharedAllowanceTablesHistoryEntity(BaseHistoryEntity):
    """保存された共有お小遣いテーブル履歴エンティティ"""

    __tablename__ = "shared_allowance_tables_history"

    family_allowance_table_id = Column(Integer)
    family_id = Column(Integer)

    @classmethod
    def from_source(cls, source: "SharedAllowanceTablesEntity"):
        return cls(
            source_id=source.id,
            family_allowance_table_id=source.family_allowance_table_id,
            family_id=source.shared_by,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
