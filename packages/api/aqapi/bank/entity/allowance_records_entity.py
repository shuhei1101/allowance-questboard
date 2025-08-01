from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import db_config
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity

class AllowanceRecordsEntity(BaseEntity):
    """お小遣い記録エンティティ"""

    __tablename__ = "allowance_records"
    __table_args__ = (
        # 金額は0以上
        CheckConstraint("amount >= 0", name="chk_allowance_records_amount_positive"),
    )

    child_id: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID")
    allowanceable_type: Mapped[int] = mapped_column(Integer, ForeignKey("allowanceable_types.id", ondelete="SET NULL"), nullable=True, comment="お小遣いの種類ID")
    title: Mapped[str] = mapped_column(String(255), nullable=False, comment="お小遣いのタイトル")
    amount: Mapped[int] = mapped_column(Integer, nullable=False, comment="お小遣い額")
    recorded_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="お小遣いが記録された日時")

    child = relationship("ChildrenEntity", foreign_keys=[child_id])
    allowanceable_table_type = relationship("AllowanceableTypesEntity", foreign_keys=[allowanceable_type])
