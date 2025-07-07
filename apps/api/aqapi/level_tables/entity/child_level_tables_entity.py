from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class ChildLevelTablesEntity(BaseEntity):
    """子供用レベルテーブルエンティティ"""

    __tablename__ = "child_level_tables"

    superclass_id = Column(Integer, ForeignKey("level_tables.id", ondelete="CASCADE"), nullable=False, comment="親レベルテーブルID")
    child_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID")

    # Relationships
    level_table = relationship("LevelTablesEntity")
    child = relationship("ChildrenEntity")
