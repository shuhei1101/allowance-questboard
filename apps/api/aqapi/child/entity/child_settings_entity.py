from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class ChildSettingsEntity(BaseEntity):
    """子供設定エンティティ"""

    __tablename__ = "child_settings"

    child_id: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, unique=True, comment="子供ID")
    min_savings: Mapped[int] = mapped_column(Integer, nullable=False, default=0, comment="最低貯金額")

    child = relationship("ChildrenEntity", foreign_keys=[child_id])


class ChildSettingsHistoryEntity(BaseHistoryEntity):
    """子供設定履歴エンティティ"""

    __tablename__ = "child_settings_history"

    child_id: Mapped[int] = mapped_column(Integer)
    min_savings: Mapped[int] = mapped_column(Integer)

    @classmethod
    def from_source(cls, source: "ChildSettingsEntity"):
        return cls(
            source_id=source.id,
            child_id=source.child_id,
            min_savings=source.min_savings,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
