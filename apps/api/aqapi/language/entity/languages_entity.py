from datetime import datetime
from typing import override
from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class LanguagesEntity(BaseEntity):
    """言語マスタエンティティ"""

    __tablename__ = "languages"

    code: Mapped[str] = mapped_column(String(10), nullable=False, unique=True, comment="言語コード(選択肢表示用)")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="言語名(説明用)")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, comment="有効フラグ")
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0, comment="表示順序")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            LanguagesEntity(code="ja", name="Japanese", is_active=True, sort_order=1),
            LanguagesEntity(code="en", name="English", is_active=True, sort_order=2),
        ]
