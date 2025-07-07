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
        # 共有設定の整合性
        CheckConstraint("(is_shared = false AND shared_quest_id IS NULL) OR (is_shared = true AND shared_quest_id IS NOT NULL)", name="chk_family_quests_shared_consistency"),
    )

    quest_id = Column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID")
    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    is_shared = Column(Boolean, nullable=False, default=False, comment="共有フラグ")
    shared_quest_id = Column(Integer, ForeignKey("shared_quests.id", ondelete="SET NULL"), nullable=True, comment="共有クエストID")

    quest = relationship("QuestsEntity")
    family = relationship("FamiliesEntity")
    shared_quest = relationship("SharedQuestsEntity")
