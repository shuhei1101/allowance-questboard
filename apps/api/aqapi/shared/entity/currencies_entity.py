"""
通貨マスタのSQLAlchemyエンティティクラス
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class CurrenciesEntity(BaseEntity):
    """通貨マスタエンティティ"""

    __tablename__ = "currencies"

    code = Column(String, nullable=False, unique=True, comment="通貨コード")
    name = Column(String, nullable=False, comment="通貨名")
    symbol = Column(String, nullable=False, comment="通貨記号")
    is_active = Column(Boolean, nullable=False, default=True, comment="有効フラグ")
    sort_order = Column(Integer, nullable=False, default=0, comment="表示順序")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        """初期データを投入するメソッド"""
        return [
            CurrenciesEntity(code="JPY", name="Japanese Yen", symbol="¥", is_active=True, sort_order=1),
            CurrenciesEntity(code="USD", name="US Dollar", symbol="$", is_active=True, sort_order=2),
        ]
