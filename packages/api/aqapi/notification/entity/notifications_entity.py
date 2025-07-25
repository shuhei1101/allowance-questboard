from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, Index
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class NotificationsEntity(BaseEntity):
    """通知エンティティ"""

    __tablename__ = "notifications"
    __table_args__ = (
        Index("idx_notifications_unread", "recipient_id", "is_read", postgresql_where="is_read = false"),
        Index("idx_notifications_received_at", "received_at"),
    )

    recipient_id: Mapped[int] = mapped_column(Integer, ForeignKey("family_members.id", ondelete="SET NULL"), nullable=True, comment="家族メンバーID")
    notifiable_type: Mapped[int] = mapped_column(Integer, ForeignKey("notifiable_types.id", ondelete="RESTRICT"), nullable=False, comment="通知対象タイプID")
    push_to: Mapped[int] = mapped_column(Integer, ForeignKey("screens.id", ondelete="SET NULL"), nullable=True, comment="遷移先スクリーンID")
    is_read: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, comment="既読フラグ")
    read_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True, comment="既読日時")
    received_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="通知受信日時")

    family_member = relationship("FamilyMembersEntity", foreign_keys=[recipient_id])
    notifiable_type_ref = relationship("NotifiableTypesEntity", foreign_keys=[notifiable_type])
    screen = relationship("ScreensEntity", foreign_keys=[push_to])
