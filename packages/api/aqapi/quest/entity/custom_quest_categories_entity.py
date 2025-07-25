from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class CustomQuestCategoriesEntity(BaseEntity):
    """カスタムクエストカテゴリエンティティ"""

    __tablename__ = "custom_quest_categories"

    category_id: Mapped[int] = mapped_column(Integer, ForeignKey("quest_categories.id", ondelete="CASCADE"), nullable=False, unique=True, comment="クエストカテゴリID")
    family_id: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="作成者の家族ID")

    category = relationship("QuestCategoriesEntity", foreign_keys=[category_id])
    family = relationship("FamiliesEntity", foreign_keys=[family_id])
