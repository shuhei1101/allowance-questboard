from sqlalchemy import Column, Integer, String, Text, DateTime
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.config.db_config import DB_CONF
from sqlalchemy.sql import func


class LevelTableTypesEntity(BaseEntity):
    """レベルサブタイプエンティティ"""

    __tablename__ = "level_table_types"

    table_name = Column(String, nullable=False, unique=True, comment="レベルテーブルサブタイプ名")
    description = Column(Text, nullable=False, comment="タイプの説明")
