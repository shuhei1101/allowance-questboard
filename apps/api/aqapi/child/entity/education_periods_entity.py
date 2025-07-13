from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class EducationPeriodsEntity(BaseEntity):
    """子供の教育期間を定義するエンティティ
    
    例えば、小学校は6年間、中学校は3年間、高校は3年間など、教育機関ごとに期間を定義する
    これにより、子供の学歴履歴を管理し、教育機関ごとの期間を追跡できるようにする
    子供を作成したときに初期値が設定され、親が自由に設定可能
    """

    __tablename__ = "education_periods"
    __table_args__ = (
        # 期間は0より大きい
        CheckConstraint("period > 0", name="chk_education_periods_period_positive"),
        # 一意制約
        UniqueConstraint("child_id", "education_id", name="uq_education_periods_child_education"),
    )

    child_id: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID")
    education_id: Mapped[int] = mapped_column(Integer, ForeignKey("educations.id", ondelete="RESTRICT"), nullable=False, comment="学歴ID")
    period: Mapped[int] = mapped_column(Integer, nullable=False, comment="教育期間")

    child = relationship("ChildrenEntity", foreign_keys=[child_id])
    educations = relationship("EducationsEntity", foreign_keys=[education_id])
