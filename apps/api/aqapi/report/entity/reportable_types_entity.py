from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, func, CheckConstraint
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class ReportableTypesEntity(BaseEntity):
    """レポート対象タイプエンティティ"""

    __tablename__ = "reportable_types"

    table_name = Column(String(50), nullable=False, unique=True, comment="レポート対象テーブル名")
    description = Column(Text, nullable=False, comment="レポート対象タイプの説明")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            ReportableTypesEntity(
                table_name="families", description="家族関連のレポート"
            ),
            ReportableTypesEntity(
                table_name="comments", description="子供関連のレポート"
            ),
        ]
