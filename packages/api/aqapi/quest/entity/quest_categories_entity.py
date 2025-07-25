from datetime import datetime
from typing import List, override
from sqlalchemy import CheckConstraint, Column, Integer, DateTime, ForeignKey, String, func, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class QuestCategoriesEntity(BaseEntity):
    """クエストカテゴリエンティティ"""

    __tablename__ = "quest_categories"

    subclass_type: Mapped[int] = mapped_column(Integer, ForeignKey("quest_category_types.id", ondelete="RESTRICT"), nullable=False, comment="サブクラスタイプ")

    subclass_type_ref = relationship("QuestCategoryTypesEntity", foreign_keys=[subclass_type])

    @override
    @classmethod
    def _seed_data(cls) -> List['BaseEntity']:
        return [
            QuestCategoriesEntity(subclass_type=1),  # 1 家事
            QuestCategoriesEntity(subclass_type=1),  # 2 勉強
            QuestCategoriesEntity(subclass_type=1),  # 3 運動
        ]

class QuestCategoriesTranslationEntity(BaseTranslationEntity):
    """クエストカテゴリ翻訳エンティティ"""

    __tablename__ = "quest_categories_translation"
    __table_args__ = (
        UniqueConstraint("quest_category_id", "language_id", name="uq_quest_categories_translation_category_language"),
        CheckConstraint("length(name) > 0", name="chk_quest_categories_translation_name_not_empty"),
    )

    quest_category_id: Mapped[int] = mapped_column(Integer, ForeignKey("quest_categories.id", ondelete="CASCADE"), nullable=False, comment="クエストカテゴリID")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="カテゴリ名の翻訳")

    quest_categories = relationship("QuestCategoriesEntity", foreign_keys=[quest_category_id])

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            QuestCategoriesTranslationEntity(template_quest_category_id=1, name="家事", language_id="ja"),
            QuestCategoriesTranslationEntity(template_quest_category_id=1, name="Housework", language_id="en"),
            QuestCategoriesTranslationEntity(template_quest_category_id=2, name="勉強", language_id="ja"),
            QuestCategoriesTranslationEntity(template_quest_category_id=2, name="Study", language_id="en"),
            QuestCategoriesTranslationEntity(template_quest_category_id=3, name="運動", language_id="ja"),
            QuestCategoriesTranslationEntity(template_quest_category_id=3, name="Exercise", language_id="en"),
        ]
