from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.config.db_config import DB_CONF


class NotificationsEntity(BaseEntity):
    """通知エンティティ"""

    __tablename__ = "notifications"
    __table_args__ = (
        Index("idx_notifications_unread", "recipient_id", "is_read", postgresql_where="is_read = false"),
        Index("idx_notifications_received_at", "received_at"),
        Index("idx_notifications_notifiable", "notifiable_type", "notifiable_id"),
    )

    recipient_id = Column(Integer, ForeignKey("family_members.id", ondelete="SET NULL"), nullable=True, comment="家族メンバーID")
    notifiable_type = Column(Integer, ForeignKey("notifiable_types.id", ondelete="RESTRICT"), nullable=False, comment="通知対象タイプID")
    notifiable_id = Column(Integer, nullable=False, comment="通知対象ID")
    push_to = Column(Integer, ForeignKey("screens.id", ondelete="SET NULL"), nullable=True, comment="遷移先スクリーンID")
    is_read = Column(Boolean, nullable=False, default=False, comment="既読フラグ")
    read_at = Column(DateTime(timezone=True), nullable=True, comment="既読日時")
    received_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="通知受信日時")

    family_member = relationship("FamilyMembersEntity")
    notifiable_type_ref = relationship("NotifiableTypesEntity")
    screen = relationship("ScreensEntity")
