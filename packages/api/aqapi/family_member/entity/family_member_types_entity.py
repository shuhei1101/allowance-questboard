from typing import List, override
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import db_config
from aqapi.core.entity.base_entity import BaseEntity

class FamilyMemberTypesEntity(BaseEntity):
    """家族メンバータイプエンティティ"""

    __tablename__ = "family_member_types"

    table_name: Mapped[str] = mapped_column(String, nullable=False, unique=True, comment="family_memberテーブル名")
    description: Mapped[str] = mapped_column(Text, nullable=False, comment="タイプの説明")

    @override
    @classmethod
    def _seed_data(cls) -> List['BaseEntity']:
        return [
            FamilyMemberTypesEntity(table_name="parents", description="親"),
            FamilyMemberTypesEntity(table_name="children", description="子供"),
        ]
