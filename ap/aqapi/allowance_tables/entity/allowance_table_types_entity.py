from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text
from aqapi.core.entity.base_entity import BaseEntity

class AllowanceTableTypesEntity(BaseEntity):
    """お小遣いテーブルサブタイプエンティティ"""

    __tablename__ = "allowance_table_types"

    table_name = Column(String, nullable=False, unique=True, comment="テーブル名")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
                AllowanceTableTypesEntity(table_name="family_allowance_tables"),
                AllowanceTableTypesEntity(table_name="child_allowance_tables"),
                AllowanceTableTypesEntity(table_name="shared_allowance_tables"),
            ]
