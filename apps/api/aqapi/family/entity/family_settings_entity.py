"""
家族設定のSQLAlchemyエンティティクラス
"""

from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import DB_CONF


class FamilySettingsEntity(DB_CONF.Base):
    """家族設定エンティティ"""

    __tablename__ = "families_settings"

    family_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("families.id", ondelete="CASCADE"),
        primary_key=True,
        comment="家族ID(主キー、外部キー)",
    )
    currency_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("currencies.id", ondelete="RESTRICT"),
        nullable=False,
        comment="通貨ID(外部キー)",
    )
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=func.now(), comment="作成日時"
    )
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        comment="更新日時",
    )

    # リレーション
    family = relationship("FamiliesEntity", foreign_keys=[family_id])
    currency = relationship("CurrenciesEntity", foreign_keys=[currency_id])

    def __repr__(self):
        return f"<FamilySettingsEntity(family_id={self.family_id}, currency_id={self.currency_id})>"
