from datetime import datetime
from sqlalchemy import Column, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class ExpByLevelEntity(BaseEntity):
    """経験値レベル設定エンティティ"""

    __tablename__ = "exp_by_level"

    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    level = Column(Integer, nullable=False, comment="レベル")
    exp = Column(Integer, nullable=False, comment="レベルに必要な経験値")

    family = relationship("FamiliesEntity", foreign_keys=[family_id])
