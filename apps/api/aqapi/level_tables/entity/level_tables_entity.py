from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class LevelTablesEntity(BaseEntity):
    """レベルテーブル基底クラスエンティティ"""

    __tablename__ = "level_tables"
    __table_args__ = (
        # サブクラスタイプは0以上
        CheckConstraint("subclass_type >= 0", name="chk_level_tables_subclass_type_positive"),
    )

    subclass_type = Column(Integer, ForeignKey("level_table_types.id", ondelete="RESTRICT"), nullable=False, comment="サブクラスタイプ")
