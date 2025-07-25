from datetime import datetime, date
from decimal import Decimal
from typing import List, override
from sqlalchemy import Column, Integer, Numeric, Date, DateTime, ForeignKey, func, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class ExchangeRatesEntity(BaseEntity):
    """為替レートエンティティ"""

    __tablename__ = "exchange_rates"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("base_currency_id", "target_currency_id", "effective_date", name="uq_exchange_rates_currencies_date"),
        # レートは0より大きい
        CheckConstraint("rate > 0", name="chk_exchange_rates_rate_positive"),
        # 基準通貨と対象通貨は異なる
        CheckConstraint("base_currency_id != target_currency_id", name="chk_exchange_rates_different_currencies"),
    )

    base_currency_id: Mapped[int] = mapped_column(Integer, ForeignKey("currencies.id", ondelete="RESTRICT"), nullable=False, comment="基準通貨ID")
    target_currency_id: Mapped[int] = mapped_column(Integer, ForeignKey("currencies.id", ondelete="RESTRICT"), nullable=False, comment="対象通貨ID")
    rate: Mapped[float] = mapped_column(Numeric(15, 6), nullable=False, comment="為替レート")
    effective_date: Mapped[date] = mapped_column(Date, nullable=False, default=func.current_date(), comment="適用日")

    base_currency_id_ref = relationship("CurrenciesEntity", foreign_keys=[base_currency_id])
    target_currency_id_ref = relationship("CurrenciesEntity", foreign_keys=[target_currency_id])

    @override
    @classmethod
    def _seed_data(cls) -> List[BaseEntity]:
        return [
            ExchangeRatesEntity(base_currency_id=1, target_currency_id=2, rate=Decimal("110.123456"), effective_date=date(2023, 10, 1)),
            ExchangeRatesEntity(base_currency_id=2, target_currency_id=1, rate=Decimal("0.009123"), effective_date=date(2023, 10, 1)),
        ]
