from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class FamilyQuestsEntity(BaseEntity):
    """家族クエストエンティティ"""

    __tablename__ = "family_quests"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("family_id", "quest_id"),
    )

    quest_id: Mapped[int] = mapped_column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID")
    family_id: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    is_public: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, comment="公開フラグ")

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])
    family = relationship("FamiliesEntity", foreign_keys=[family_id])
