from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class TemplateQuestCategoriesEntity(BaseEntity):
    """テンプレートクエストカテゴリエンティティ"""

    __tablename__ = "template_quest_categories"

    category_id = Column(Integer, ForeignKey("quest_categories.id", ondelete="CASCADE"), nullable=False, unique=True, comment="クエストカテゴリID")
    sort_order = Column(Integer, default=0, comment="表示順序")
    is_active = Column(Boolean, nullable=False, default=True, comment="有効フラグ")

    category = relationship("QuestCategoriesEntity", foreign_keys=[category_id])

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            TemplateQuestCategoriesEntity(category_id=1, sort_order=1, is_active=True),
            TemplateQuestCategoriesEntity(category_id=2, sort_order=2, is_active=True),
            TemplateQuestCategoriesEntity(category_id=3, sort_order=3, is_active=True),
        ]
