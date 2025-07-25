from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import db_config
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class ChildStatusesEntity(BaseEntity):
    """子供のステータスを定義するエンティティ"""

    __tablename__ = "child_statuses"
    __table_args__ = (
        # レベルは0より大きい
        CheckConstraint("current_level > 0", name="chk_child_statuses_current_level_positive"),
        # 経験値は0以上
        CheckConstraint("total_exp >= 0", name="chk_child_statuses_total_exp_non_negative"),
        # 貯金額は0以上
        CheckConstraint("current_savings >= 0", name="chk_child_statuses_current_savings_non_negative"),
    )

    child_id: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, unique=True, comment="子供ID")
    current_level: Mapped[int] = mapped_column(Integer, nullable=False, default=1, comment="現在のレベル")
    total_exp: Mapped[int] = mapped_column(Integer, nullable=False, default=0, comment="累計獲得経験値")
    current_savings: Mapped[int] = mapped_column(Integer, nullable=False, default=0, comment="現在の貯金額")

    child = relationship("ChildrenEntity", foreign_keys=[child_id])
