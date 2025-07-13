from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class ChildLevelTablesEntity(BaseEntity):
    """子供用レベルテーブルエンティティ"""

    __tablename__ = "child_level_tables"

    superclass_id: Mapped[int] = mapped_column(Integer, ForeignKey("level_tables.id", ondelete="CASCADE"), nullable=False, comment="親レベルテーブルID")
    child_id: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID")

    # Relationships
    level_table = relationship("LevelTablesEntity", foreign_keys=[superclass_id])
    child = relationship("ChildrenEntity", foreign_keys=[child_id])
