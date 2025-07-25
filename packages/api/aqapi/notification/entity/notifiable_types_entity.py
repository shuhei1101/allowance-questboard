from datetime import datetime
from typing import override
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class NotifiableTypesEntity(BaseEntity):
    """通知対象タイプエンティティ"""

    __tablename__ = "notifiable_types"

    table_name: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, comment="通知対象タイプコード")
    description: Mapped[str] = mapped_column(Text, nullable=False, comment="通知対象タイプの説明")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            NotifiableTypesEntity(table_name="quest_members", description="子供クエストの通知"),
        ]
        
