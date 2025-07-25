from datetime import datetime
from typing import override
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class CurrencyByLanguageEntity(BaseEntity):
    """通貨と言語の関連エンティティ"""

    __tablename__ = "currencies_by_language"

    currency_id: Mapped[int] = mapped_column(Integer, ForeignKey("currencies.id", ondelete="CASCADE"), nullable=False, comment="通貨コード(外部キー：currencies.id")
    language_id: Mapped[int] = mapped_column(Integer, ForeignKey("languages.id", ondelete="CASCADE"), nullable=False, comment="言語コード")

    # Relationships
    currency = relationship("CurrenciesEntity", foreign_keys=[currency_id])
    language = relationship("LanguagesEntity", foreign_keys=[language_id])

    @override
    @classmethod
    def _seed_data(cls) -> list[BaseEntity]:
        return [
            CurrencyByLanguageEntity(currency_id=1, language_id=1),  # JPY
            CurrencyByLanguageEntity(currency_id=2, language_id=2),  # USD
        ]
