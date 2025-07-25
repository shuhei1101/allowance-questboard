from datetime import datetime
from typing import override
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class IconsEntity(BaseEntity):
    """アイコンエンティティ"""

    __tablename__ = "icons"

    category_id: Mapped[int] = mapped_column(Integer, ForeignKey("icon_categories.id", ondelete="SET NULL"), nullable=True, comment="アイコンカテゴリID")
    sort_order: Mapped[int] = mapped_column(Integer, default=0, comment="表示順序")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, comment="有効フラグ")

    category = relationship("IconCategoriesEntity", foreign_keys=[category_id])

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            IconsEntity(category_id=1, sort_order=10, is_active=True),
            IconsEntity(category_id=2, sort_order=10, is_active=True),
            IconsEntity(category_id=3, sort_order=10, is_active=True),
        ]
