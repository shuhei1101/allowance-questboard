from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, UniqueConstraint, func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from sqlalchemy.orm import relationship
from aqapi.core.config.db_config import DB_CONF


class IconCategoriesEntity(BaseEntity):
    """アイコンカテゴリエンティティ"""

    __tablename__ = "icon_categories"

    sort_order = Column(Integer, default=0, comment="表示順序")
    is_active = Column(Boolean, nullable=False, default=True, comment="有効フラグ")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            IconCategoriesEntity(sort_order=1, is_active=True),
            IconCategoriesEntity(sort_order=2, is_active=True),
            IconCategoriesEntity(sort_order=3, is_active=True),
        ]

class IconCategoriesTranslationEntity(BaseTranslationEntity):
    """アイコンカテゴリ翻訳エンティティ"""

    __tablename__ = "icon_categories_translation"
    __table_args__ = (
        UniqueConstraint("category_id", "language_id", name="uq_icon_categories_translation_category_language"),
    )

    category_id = Column(Integer, ForeignKey("icon_categories.id", ondelete="RESTRICT"),  nullable=False, comment="アイコンカテゴリID")
    name = Column(String(100), nullable=False, comment="カテゴリ名の翻訳")

    category = relationship("IconCategoriesEntity")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            IconCategoriesTranslationEntity(category_id=1, language_id=1, name="アクション"),
            IconCategoriesTranslationEntity(category_id=1, language_id=2, name="Action"),
            IconCategoriesTranslationEntity(category_id=2, language_id=1, name="ナビゲーション"),
            IconCategoriesTranslationEntity(category_id=2, language_id=2, name="Navigation"),
            IconCategoriesTranslationEntity(category_id=3, language_id=1, name="コミュニケーション"),
            IconCategoriesTranslationEntity(category_id=3, language_id=2, name="Communication"),
        ]
