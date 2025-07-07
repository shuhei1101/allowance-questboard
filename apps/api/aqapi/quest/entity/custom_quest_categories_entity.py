from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class CustomQuestCategoriesEntity(BaseEntity):
    """カスタムクエストカテゴリエンティティ"""

    __tablename__ = "custom_quest_categories"

    category_id = Column(Integer, ForeignKey("quest_categories.id", ondelete="CASCADE"), nullable=False, unique=True, comment="クエストカテゴリID")
    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="作成者の家族ID")

    category = relationship("QuestCategoriesEntity")
    family = relationship("FamiliesEntity")
