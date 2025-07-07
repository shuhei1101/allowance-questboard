from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity

class AllowanceByAgeEntity(BaseEntity):
    """年齢別お小遣いテーブルエンティティ"""

    __tablename__ = "allowance_by_age"
    __table_args__ = (
        # 年齢は0以上
        CheckConstraint("age >= 0", name="chk_allowance_by_age_age_positive"),
        # 金額は0以上
        CheckConstraint("amount >= 0", name="chk_allowance_by_age_amount_positive"),
        # 一意制約
        UniqueConstraint("age", "allowance_table_id", name="uq_allowance_by_age_age_allowance_table"),
    )

    allowance_table_id = Column(Integer,ForeignKey("allowance_tables.id", ondelete="CASCADE"), nullable=False)
    age = Column(Integer, nullable=False, comment="年齢")
    amount = Column(Integer, nullable=False, default=0, comment="お小遣い額")

    allowance_tables = relationship("AllowanceTablesEntity")

class AllowanceByAgeHistoryEntity(BaseHistoryEntity):
    """年齢別お小遣い履歴テーブルエンティティ"""

    __tablename__ = "allowance_by_age_history"

    allowance_table_id = Column(Integer)
    age = Column(Integer)
    amount = Column(Integer)

    @classmethod
    def from_source(cls, source: "AllowanceByAgeEntity"):
        return cls(
            source_id=source.id,
            allowance_table_id=source.allowance_table_id,
            age=source.age,
            amount=source.amount,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
