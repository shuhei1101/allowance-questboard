from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class SavedQuestsEntity(BaseEntity):
    """保存クエストエンティティ"""

    __tablename__ = "saved_quests"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("quest_id", "saved_by"),
    )

    quest_id = Column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID(外部キー)")
    saved_by = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    saved_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="保存日時")

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])
    family = relationship("FamiliesEntity", foreign_keys=[saved_by])
