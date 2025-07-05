from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, CheckConstraint, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.config.db_config import DB_CONF


class FamilyLevelTablesEntity(BaseEntity):
    """家族用レベルテーブルエンティティ"""

    __tablename__ = "family_level_tables"

    superclass_id = Column(Integer, ForeignKey("level_tables.id", ondelete="CASCADE"), nullable=False, comment="親レベルテーブルID")
    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    is_public = Column(Boolean, default=False, nullable=False, comment="公開フラグ")

    # Relationships
    level_table = relationship("LevelTablesEntity")
    family = relationship("FamiliesEntity")
