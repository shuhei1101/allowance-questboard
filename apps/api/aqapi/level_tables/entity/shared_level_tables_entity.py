from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class SharedLevelTablesEntity(BaseEntity):
    """保存された共有レベルテーブルエンティティ"""

    __tablename__ = "shared_level_tables"
    __table_args__ = (
        # 一意制約  
        UniqueConstraint("family_level_table_id", "shared_by"),
    )


    family_level_table_id = Column(Integer, ForeignKey("family_level_tables.id", ondelete="CASCADE"), nullable=False, comment="共有レベルテーブルID(外部キー)")
    shared_by = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")

    family_level_table = relationship("FamilyLevelTablesEntity", foreign_keys=[family_level_table_id])
    family = relationship("FamiliesEntity", foreign_keys=[shared_by])
