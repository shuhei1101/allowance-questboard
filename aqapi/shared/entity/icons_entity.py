from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.config.db_config import DB_CONF


class IconsEntity(BaseEntity):
    """アイコンエンティティ"""

    __tablename__ = "icons"

    category_id = Column(Integer, ForeignKey("icon_categories.id", ondelete="SET NULL"), nullable=True, comment="アイコンカテゴリID")
    sort_order = Column(Integer, default=0, comment="表示順序")
    is_active = Column(Boolean, nullable=False, default=True, comment="有効フラグ")

    category = relationship("IconCategoriesEntity")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            IconsEntity(category_id=1, sort_order=10, is_active=True),
            IconsEntity(category_id=2, sort_order=10, is_active=True),
            IconsEntity(category_id=3, sort_order=10, is_active=True),
        ]
