from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity


class LanguagesEntity(BaseEntity):
    """言語マスタエンティティ"""

    __tablename__ = "languages"

    code = Column(String(10), nullable=False, unique=True, comment="言語コード")
    name = Column(String(100), nullable=False, comment="言語名")
    is_active = Column(Boolean, nullable=False, default=True, comment="有効フラグ")
    sort_order = Column(Integer, nullable=False, default=0, comment="表示順序")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            LanguagesEntity(code="ja", name="Japanese", is_active=True, sort_order=1),
            LanguagesEntity(code="en", name="English", is_active=True, sort_order=2),
        ]
