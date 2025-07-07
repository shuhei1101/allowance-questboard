from typing import List
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity

class FamilyMemberTypesEntity(BaseEntity):
    """家族メンバータイプエンティティ"""

    __tablename__ = "family_member_types"

    table_name = Column(String, nullable=False, unique=True, comment="family_memberテーブル名")
    description = Column(Text, nullable=False, comment="タイプの説明")

    @classmethod
    def _seed_data(cls) -> List['BaseEntity']:
        return [
            FamilyMemberTypesEntity(table_name="parents", description="親"),
            FamilyMemberTypesEntity(table_name="children", description="子供"),
        ]
