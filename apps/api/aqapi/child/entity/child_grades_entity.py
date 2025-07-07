from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity


class ChildGradesEntity(BaseEntity):
    """子供の現在の学年を定義するエンティティ"""

    __tablename__ = "child_grades"
    __table_args__ = (
        # 学年は0より大きい
        CheckConstraint("grade > 0", name="chk_child_grade_grade_positive"),
    )

    child_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID(外部キー)")
    education_id = Column(Integer, ForeignKey("educations.id", ondelete="RESTRICT"), nullable=False, comment="学歴ID")
    grade = Column(Integer, nullable=False, comment="学年")

    child = relationship("ChildrenEntity", foreign_keys=[child_id])
    educations = relationship("EducationsEntity", foreign_keys=[education_id])
