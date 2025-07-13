from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, func, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class QuestExpByLevelEntity(BaseEntity):
    """クエスト経験値(レベル別)エンティティ"""

    __tablename__ = "quest_exp_by_level"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("quest_id", "level", name="uq_quest_exp_by_level_quest_level"),
        # レベルは0より大きい
        CheckConstraint("level > 0", name="chk_quest_exp_by_level_level_positive"),
        # 経験値は0以上
        CheckConstraint("exp >= 0", name="chk_quest_exp_by_level_exp_non_negative"),
    )

    quest_id: Mapped[int] = mapped_column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID")
    level: Mapped[int] = mapped_column(Integer, nullable=False, comment="レベル")
    exp: Mapped[int] = mapped_column(Integer, nullable=False, comment="必要経験値")

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])
