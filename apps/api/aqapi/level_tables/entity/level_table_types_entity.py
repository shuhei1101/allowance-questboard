from sqlalchemy import Column, Integer, String, Text, DateTime
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF
from sqlalchemy.sql import func


class LevelTableTypesEntity(BaseEntity):
    """レベルサブタイプエンティティ"""

    __tablename__ = "level_table_types"

    table_name: Mapped[str] = mapped_column(String, nullable=False, unique=True, comment="レベルテーブルサブタイプ名")
    description: Mapped[str] = mapped_column(Text, nullable=False, comment="タイプの説明")
