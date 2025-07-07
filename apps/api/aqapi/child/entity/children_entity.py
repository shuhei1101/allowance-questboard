from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity


class ChildrenEntity(BaseEntity):
    """子供エンティティ"""

    __tablename__ = "children"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("family_id", "family_member_id", name="uq_children_family_user"),
    )

    family_member_id = Column(Integer, ForeignKey("family_members.id", ondelete="CASCADE"), nullable=False, comment="家族メンバーID")
    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")

    family = relationship("FamiliesEntity")
    family_member = relationship("FamilyMembersEntity")
