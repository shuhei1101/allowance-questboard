from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, CheckConstraint, Boolean
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class FamilyLevelTablesEntity(BaseEntity):
    """家族用レベルテーブルエンティティ"""

    __tablename__ = "family_level_tables"

    superclass_id: Mapped[int] = mapped_column(Integer, ForeignKey("level_tables.id", ondelete="CASCADE"), nullable=False, comment="親レベルテーブルID")
    family_id: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    is_public: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, comment="公開フラグ")

    # Relationships
    level_table = relationship("LevelTablesEntity", foreign_keys=[superclass_id])
    family = relationship("FamiliesEntity", foreign_keys=[family_id])
