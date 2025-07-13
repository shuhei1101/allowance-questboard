from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint

from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class AllowanceByLevelEntity(BaseEntity):
    """レベル別お小遣いテーブルエンティティ"""

    __tablename__ = "allowance_by_level"
    __table_args__ = (
        # レベルは0以上
        CheckConstraint("level >= 0", name="chk_allowance_by_level_level_positive"),
        # 金額は0以上
        CheckConstraint("amount >= 0", name="chk_allowance_by_level_amount_positive"),
        # 一意制約
        UniqueConstraint("level", "allowance_table_id", name="uq_allowance_by_level"),
    )

    allowance_table_id: Mapped[int] = mapped_column(Integer, ForeignKey("allowance_tables.id", ondelete="CASCADE"), nullable=False, comment="お小遣いテーブルID")
    level: Mapped[int] = mapped_column(Integer, nullable=False, comment="レベル")
    amount: Mapped[int] = mapped_column(Integer, nullable=False, default=0, comment="お小遣い金額")

    allowance_tables = relationship("AllowanceTablesEntity", foreign_keys=[allowance_table_id])
