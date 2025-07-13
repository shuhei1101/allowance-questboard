from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, func, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class IconNameByPlatormEntity(BaseEntity):
    """Platformごとのアイコン名マッピングエンティティ"""

    __tablename__ = "icon_platform_keys"
    __table_args__ = (
        UniqueConstraint("icon_id", "platform_id", name="uq_icon_platform_mapping"),
    )

    icon_id: Mapped[int] = mapped_column(Integer, ForeignKey("icons.id", ondelete="CASCADE"), nullable=False, comment="アイコンID(外部キー)")
    platform_id: Mapped[int] = mapped_column(Integer, ForeignKey("icon_platforms.id", ondelete="CASCADE"), nullable=False, comment="プラットフォームタイプ(外部キー)")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="アイコン名(例: 'Add', 'Delete')")

    icon = relationship("IconsEntity", foreign_keys=[icon_id])

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            IconNameByPlatormEntity(icon_id=1, platform_id=1, name="directions_run"),
            IconNameByPlatormEntity(icon_id=2, platform_id=1, name="directions_rounded"),
            IconNameByPlatormEntity(icon_id=3, platform_id=1, name="chat_bubble_outline"),
        ]
