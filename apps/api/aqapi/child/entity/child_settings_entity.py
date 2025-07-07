from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity


class ChildSettingsEntity(BaseEntity):
    """子供設定エンティティ"""

    __tablename__ = "child_settings"

    child_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, unique=True, comment="子供ID")
    min_savings = Column(Integer, nullable=False, default=0, comment="最低貯金額")

    child = relationship("ChildrenEntity", foreign_keys=[child_id])


class ChildSettingsHistoryEntity(BaseHistoryEntity):
    """子供設定履歴エンティティ"""

    __tablename__ = "child_settings_history"

    child_id = Column(Integer)
    min_savings = Column(Integer)

    @classmethod
    def from_source(cls, source: "ChildSettingsEntity"):
        return cls(
            source_id=source.id,
            child_id=source.child_id,
            min_savings=source.min_savings,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
