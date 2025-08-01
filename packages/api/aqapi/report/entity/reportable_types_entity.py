from datetime import datetime
from typing import override
from sqlalchemy import Column, Integer, String, Text, DateTime, func, CheckConstraint
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import db_config


class ReportableTypesEntity(BaseEntity):
    """レポート対象タイプエンティティ"""

    __tablename__ = "reportable_types"

    table_name: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, comment="レポート対象テーブル名")
    description: Mapped[str] = mapped_column(Text, nullable=False, comment="レポート対象タイプの説明")

    @override
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
