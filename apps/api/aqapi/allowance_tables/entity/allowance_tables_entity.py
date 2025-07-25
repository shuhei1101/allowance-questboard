from typing import override
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class AllowanceTablesEntity(BaseEntity):
    """お小遣いテーブル基底クラスエンティティ"""

    __tablename__ = "allowance_tables"

    subclass_type: Mapped[int] = mapped_column(Integer, ForeignKey("allowance_table_types.id", ondelete="RESTRICT"), nullable=False, comment="サブクラスタイプ",)

    allowance_tables_sub_table_type = relationship("AllowanceTableTypesEntity", foreign_keys=[subclass_type])

class AllowanceTablesHistoryEntity(BaseHistoryEntity[AllowanceTablesEntity]):
    """お小遣いテーブル履歴エンティティ"""

    __tablename__ = "allowance_tables_history"

    subclass_type: Mapped[int] = mapped_column(Integer)

    @override
    @classmethod
    def _set_specific_attrs(cls, instance: 'AllowanceTablesHistoryEntity', source: AllowanceTablesEntity) -> None:
        instance.subclass_type = source.subclass_type
