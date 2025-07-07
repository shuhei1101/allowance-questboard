from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseHistoryEntity, BaseTranslationEntity


class ChildStatsesEntity(BaseEntity):
    """子供ステータスエンティティ"""

    __tablename__ = "child_statses"
    __table_args__ = (
        # レベルは0より大きい
        CheckConstraint("current_level > 0", name="chk_child_stats_current_level_positive"),
        # 経験値は0以上
        CheckConstraint("total_exp >= 0", name="chk_child_stats_total_exp_non_negative"),
        # 貯金額は0以上
        CheckConstraint("current_savings >= 0", name="chk_child_stats_current_savings_non_negative"),
    )

    child_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, unique=True, comment="子供ID")
    current_level = Column(Integer, nullable=False, default=1, comment="現在のレベル")
    total_exp = Column(Integer, nullable=False, default=0, comment="累計獲得経験値")
    current_savings = Column(Integer, nullable=False, default=0, comment="現在の貯金額")

    child = relationship("ChildrenEntity")
