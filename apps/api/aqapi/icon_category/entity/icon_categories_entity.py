from datetime import datetime
from typing import override
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, UniqueConstraint, func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from sqlalchemy.orm import relationship, Mapped, mapped_column

from aqapi.core.entity.base_translation_collection import BaseTranslationCollection


class IconCategoriesEntity(BaseEntity):
    """アイコンカテゴリエンティティ"""

    __tablename__ = "icon_categories"

    sort_order: Mapped[int] = mapped_column(Integer, default=0, comment="表示順序")
    is_active = Column(Boolean, nullable=False, default=True, comment="有効フラグ")

    @override
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

    category_id: Mapped[int] = mapped_column(Integer, ForeignKey("icon_categories.id", ondelete="RESTRICT"),  nullable=False, comment="アイコンカテゴリID")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="カテゴリ名の翻訳")

    category = relationship("IconCategoriesEntity", foreign_keys=[category_id])

    @override
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
    
    @property
    @override
    def source_id(self) -> int:
        return self.category_id

class IconCategoriesTranslationEntities(BaseTranslationCollection[IconCategoriesTranslationEntity]):
    """アイコンカテゴリ翻訳エンティティのリスト"""

    