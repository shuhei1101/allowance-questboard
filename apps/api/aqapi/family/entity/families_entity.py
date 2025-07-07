from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity


class FamiliesEntity(BaseEntity):
    """家族エンティティ"""

    __tablename__ = "families"

    name = Column(String(100), nullable=False, comment="家名")
    icon_id = Column(Integer, ForeignKey("icons.id", ondelete="SET NULL"), nullable=True, comment="アイコンID")
    introduction = Column(Text, nullable=True, comment="説明文")

    icon = relationship("IconsEntity")

class FamiliesHistoryEntity(BaseHistoryEntity):
    """家族履歴エンティティ"""

    __tablename__ = "families_history"

    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    name = Column(String(100), nullable=False, comment="家名")
    icon_id = Column(Integer, ForeignKey("icons.id", ondelete="SET NULL"), nullable=True, comment="アイコンID")
    introduction = Column(Text, nullable=True, comment="説明文")

    icon = relationship("IconsEntity")
