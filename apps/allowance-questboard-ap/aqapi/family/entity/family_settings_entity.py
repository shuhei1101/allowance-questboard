"""
家族設定のSQLAlchemyエンティティクラス
"""

from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from aqapi.core.config.db_config import DB_CONF


class FamilySettingsEntity(DB_CONF.Base):
    """家族設定エンティティ"""

    __tablename__ = "families_settings"

    family_id = Column(
        Integer,
        ForeignKey("families.id", ondelete="CASCADE"),
        primary_key=True,
        comment="家族ID(主キー、外部キー)",
    )
    currency_id = Column(
        Integer,
        ForeignKey("currencies.id", ondelete="RESTRICT"),
        nullable=False,
        comment="通貨ID(外部キー)",
    )
    created_at = Column(
        DateTime(timezone=True), nullable=False, default=func.now(), comment="作成日時"
    )
    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        comment="更新日時",
    )

    # リレーション
    family = relationship("FamiliesEntity")
    currency = relationship("CurrenciesEntity")

    def __repr__(self):
        return f"<FamilySettingsEntity(family_id={self.family_id}, currency_id={self.currency_id})>"
