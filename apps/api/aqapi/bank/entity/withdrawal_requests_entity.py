from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class WithdrawalRequestsEntity(BaseEntity):
    """引き落とし申請エンティティ"""

    __tablename__ = "withdrawal_requests"
    __table_args__ = (
        # 金額は0より大きい
        CheckConstraint("amount > 0", name="chk_withdrawal_requests_amount_positive"),
    )

    requested_by: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="申請者の子供ID")
    approved_by: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="承認者の家族ID")
    status_id: Mapped[int] = mapped_column(Integer, ForeignKey("withdrawal_request_statuses.id", ondelete="SET NULL"), nullable=False, comment="申請ステータスID")
    amount: Mapped[int] = mapped_column(Integer, nullable=False, comment="引き落とし金額")
    reason: Mapped[str] = mapped_column(String(500), nullable=False, comment="引き落とし理由")
    requested_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, comment="申請日時")
    approved_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True, comment="承認日時")

    requester = relationship("ChildrenEntity", foreign_keys=[requested_by])
    approver = relationship("FamiliesEntity", foreign_keys=[approved_by])
    status = relationship("WithdrawalRequestStatusesEntity", foreign_keys=[status_id])
