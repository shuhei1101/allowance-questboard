from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class TemplateQuestCategoriesEntity(BaseEntity):
    """テンプレートクエストカテゴリエンティティ"""

    __tablename__ = "template_quest_categories"

    category_id = Column(Integer, ForeignKey("quest_categories.id", ondelete="CASCADE"), nullable=False, unique=True, comment="クエストカテゴリID")
    name = Column(String(50), nullable=False, unique=True, comment="カテゴリコード")
    sort_order = Column(Integer, default=0, comment="表示順序")
    is_active = Column(Boolean, nullable=False, default=True, comment="有効フラグ")

    category = relationship("QuestCategoriesEntity", foreign_keys=[category_id])

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            TemplateQuestCategoriesEntity(category_id=1, name="housework", sort_order=1, is_active=True),
            TemplateQuestCategoriesEntity(category_id=2, name="study", sort_order=2, is_active=True),
            TemplateQuestCategoriesEntity(category_id=3, name="exercise", sort_order=3, is_active=True),
        ]

class TemplateQuestCategoriesTranslationEntity(BaseTranslationEntity):
    """テンプレートクエストカテゴリ翻訳エンティティ"""

    __tablename__ = "template_quest_categories_translation"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("template_quest_category_id", "language_id", name="uq_template_quest_categories_translation_category_language"),
    )

    template_quest_category_id = Column(Integer, ForeignKey("template_quest_categories.id", ondelete="CASCADE"), nullable=False, comment="テンプレートクエストカテゴリID")
    name = Column(String(100), nullable=False, comment="カテゴリ名の翻訳")

    template_quest_category = relationship("TemplateQuestCategoriesEntity", foreign_keys=[template_quest_category_id])

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            TemplateQuestCategoriesTranslationEntity(template_quest_category_id=1, name="家事", language_id="ja"),
            TemplateQuestCategoriesTranslationEntity(template_quest_category_id=1, name="Housework", language_id="en"),
            TemplateQuestCategoriesTranslationEntity(template_quest_category_id=2, name="勉強", language_id="ja"),
            TemplateQuestCategoriesTranslationEntity(template_quest_category_id=2, name="Study", language_id="en"),
            TemplateQuestCategoriesTranslationEntity(template_quest_category_id=3, name="運動", language_id="ja"),
            TemplateQuestCategoriesTranslationEntity(template_quest_category_id=3, name="Exercise", language_id="en"),
        ]
