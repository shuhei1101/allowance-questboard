from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class CurrencyByLanguageEntity(BaseEntity):
    """通貨と言語の関連エンティティ"""

    __tablename__ = "currencies_by_language"

    currency_id = Column(Integer, ForeignKey("currencies.id", ondelete="CASCADE"), nullable=False, comment="通貨コード(外部キー：currencies.id")
    language_id = Column(Integer, ForeignKey("languages.id", ondelete="CASCADE"), nullable=False, comment="言語コード")

    # Relationships
    currency = relationship("CurrenciesEntity")
    language = relationship("LanguagesEntity")

    @classmethod
    def _seed_data(cls) -> list[BaseEntity]:
        return [
            CurrencyByLanguageEntity(currency_id=1, language_id=1),  # JPY
            CurrencyByLanguageEntity(currency_id=2, language_id=2),  # USD
        ]
