from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class SavedQuestsEntity(BaseEntity):
    """家族が保存した共有クエストエンティティ"""

    __tablename__ = "saved_quests"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("shared_quest_id", "saved_by"),
    )

    shared_quest_id: Mapped[int] = mapped_column(Integer, ForeignKey("shared_quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID(外部キー)")
    saved_by: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="保存した家族ID")

    shared_quest = relationship("SharedQuestsEntity", foreign_keys=[shared_quest_id])
    family = relationship("FamiliesEntity", foreign_keys=[saved_by])
