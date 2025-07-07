from datetime import datetime
from typing import List
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class AllowanceableTypesEntity(BaseEntity):
    """お小遣い支給対象テーブルエンティティ"""

    __tablename__ = "allowanceable_types"

    table_name = Column(String(50), nullable=False, unique=True, comment="お小遣い支給対象テーブル名")
    description = Column(Text, nullable=False, comment="説明")

    @classmethod
    def _seed_data(cls) -> List[BaseEntity]:
        return [
            AllowanceableTypesEntity(table_name="child_quests", description="メンバーのクエストテーブル"),
        ]
