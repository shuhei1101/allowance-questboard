from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class FamiliesEntity(BaseEntity):
    """家族エンティティ"""

    __tablename__ = "families"

    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="家名")
    icon_id: Mapped[int] = mapped_column(Integer, ForeignKey("icons.id", ondelete="SET NULL"), nullable=True, comment="アイコンID")
    introduction: Mapped[str] = mapped_column(Text, nullable=True, comment="説明文")

    icon = relationship("IconsEntity", foreign_keys=[icon_id])

class FamiliesHistoryEntity(BaseHistoryEntity):
    """家族履歴エンティティ"""

    __tablename__ = "families_history"

    family_id: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="家名")
    icon_id: Mapped[int] = mapped_column(Integer, ForeignKey("icons.id", ondelete="SET NULL"), nullable=True, comment="アイコンID")
    introduction: Mapped[str] = mapped_column(Text, nullable=True, comment="説明文")

    icon = relationship("IconsEntity", foreign_keys=[icon_id])
