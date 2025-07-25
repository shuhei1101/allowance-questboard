from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import db_config
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class SavingsRecordsEntity(BaseEntity):
    """貯金記録エンティティ"""

    __tablename__ = "savings_records"
    __table_args__ = (
        # 金額は0でない
        CheckConstraint("amount != 0", name="chk_savings_records_amount_not_zero"),
        # 残高は0以上
        CheckConstraint("balance >= 0", name="chk_savings_records_balance_positive")
    )

    saved_by: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID")
    amount: Mapped[int] = mapped_column(Integer, nullable=False, default=0, comment="貯金額")
    balance: Mapped[int] = mapped_column(Integer, nullable=False, default=0, comment="貯金残高")
    recorded_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="貯金記録日時")

    saver = relationship("ChildrenEntity", foreign_keys=[saved_by])
