from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class FamilyQuestsEntity(BaseEntity):
    """家族クエストエンティティ"""

    __tablename__ = "family_quests"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("family_id", "quest_id"),
    )

    quest_id = Column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID")
    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])
    family = relationship("FamiliesEntity", foreign_keys=[family_id])
