from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity


class AllowanceTablesEntity(BaseEntity):
    """お小遣いテーブル基底クラスエンティティ"""

    __tablename__ = "allowance_tables"
    __table_args__ = (
        # ポリモーフィックなサブクラスを識別するための制約
        UniqueConstraint("subclass_type", "subclass_id"),
    )

    subclass_type = Column(Integer, ForeignKey("allowance_table_types.id", ondelete="RESTRICT"), nullable=False, comment="サブクラスタイプ",)
    subclass_id = Column(Integer, nullable=False, comment="サブクラスID")

    allowance_tables_sub_table_type = relationship("AllowanceTableTypesEntity")

class AllowanceTablesHistoryEntity(BaseHistoryEntity):
    """お小遣いテーブル履歴エンティティ"""

    __tablename__ = "allowance_tables_history"

    subclass_type = Column(Integer)
    subclass_id = Column(Integer)

    @classmethod
    def from_source(cls, source: "AllowanceTablesEntity"):
        return cls(
            source_id=source.id,
            subclass_type=source.subclass_type,
            subclass_id=source.subclass_id,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
