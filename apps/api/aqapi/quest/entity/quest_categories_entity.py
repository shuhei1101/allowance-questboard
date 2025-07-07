from datetime import datetime
from typing import List
from sqlalchemy import CheckConstraint, Column, Integer, DateTime, ForeignKey, String, func, UniqueConstraint
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.config.db_config import DB_CONF


class QuestCategoriesEntity(BaseEntity):
    """クエストカテゴリエンティティ"""

    __tablename__ = "quest_categories"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("subclass_type", "subclass_id", name="uq_quest_category_type_id"),
    )

    subclass_type = Column(Integer, ForeignKey("quest_category_types.id", ondelete="RESTRICT"), nullable=False, comment="サブクラスタイプ")
    subclass_id = Column(Integer, nullable=False, comment="サブクラスID")

    subclass_type_ref = relationship("QuestCategoryTypesEntity")

class QuestCategoriesTranslationEntity(BaseEntity):
    """クエストカテゴリ翻訳エンティティ"""

    __tablename__ = "quest_categories_translation"
    __table_args__ = (
        UniqueConstraint("quest_category_id", "language_id", name="uq_quest_categories_translation_category_language"),
        CheckConstraint("length(name) > 0", name="chk_quest_categories_translation_name_not_empty"),
    )

    quest_category_id = Column(Integer, ForeignKey("quest_categories.id", ondelete="CASCADE"), nullable=False, comment="クエストカテゴリID")
    language_id = Column(String(10), ForeignKey("languages.id", ondelete="SET NULL"), nullable=False, comment="言語コード")
    name = Column(String(100), nullable=False, comment="カテゴリ名の翻訳")
    language = relationship("LanguagesEntity")

    quest_categories = relationship("QuestCategoriesEntity")
