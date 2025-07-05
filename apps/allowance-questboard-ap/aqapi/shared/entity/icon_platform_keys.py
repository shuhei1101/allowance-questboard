from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, func, UniqueConstraint
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.config.db_config import DB_CONF


class IconNameByPlatormEntity(BaseEntity):
    """Platformごとのアイコン名マッピングエンティティ"""

    __tablename__ = "icon_platform_keys"
    __table_args__ = (
        UniqueConstraint("icon_id", "platform_id", name="uq_icon_platform_mapping"),
    )

    icon_id = Column(Integer, ForeignKey("icons.id", ondelete="CASCADE"), nullable=False, comment="アイコンID(外部キー)")
    platform_id = Column(Integer, ForeignKey("icon_platforms.id", ondelete="CASCADE"), nullable=False, comment="プラットフォームタイプ(外部キー)")
    name = Column(String(100), nullable=False, comment="アイコン名(例: 'Add', 'Delete')")

    icon = relationship("IconsEntity")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            IconNameByPlatormEntity(icon_id=1, platform_id=1, name="directions_run"),
            IconNameByPlatormEntity(icon_id=2, platform_id=1, name="directions_rounded"),
            IconNameByPlatormEntity(icon_id=3, platform_id=1, name="chat_bubble_outline"),
        ]
