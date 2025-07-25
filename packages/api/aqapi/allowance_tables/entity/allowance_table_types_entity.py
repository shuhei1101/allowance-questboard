from typing import override
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity

class AllowanceTableTypesEntity(BaseEntity):
    """お小遣いテーブルサブタイプエンティティ"""

    __tablename__ = "allowance_table_types"

    table_name: Mapped[str] = mapped_column(String, nullable=False, unique=True, comment="テーブル名")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
                AllowanceTableTypesEntity(table_name="family_allowance_tables"),
                AllowanceTableTypesEntity(table_name="child_allowance_tables"),
                AllowanceTableTypesEntity(table_name="shared_allowance_tables"),
            ]
