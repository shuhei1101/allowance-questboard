from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class FollowsEntity(BaseEntity):
    """フォロー関係エンティティ"""

    __tablename__ = "follows"

    follower_id: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="フォロワーの家族ID")
    followed_id: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="フォローされている家族ID")

    follower = relationship("FamiliesEntity", foreign_keys=[follower_id])
    followed = relationship("FamiliesEntity", foreign_keys=[followed_id])
