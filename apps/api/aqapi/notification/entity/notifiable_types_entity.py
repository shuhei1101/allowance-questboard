from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class NotifiableTypesEntity(BaseEntity):
    """通知対象タイプエンティティ"""

    __tablename__ = "notifiable_types"

    table_name = Column(String(50), nullable=False, unique=True, comment="通知対象タイプコード")
    description = Column(Text, nullable=False, comment="通知対象タイプの説明")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            NotifiableTypesEntity(table_name="quest_members", description="子供クエストの通知"),
        ]
        
