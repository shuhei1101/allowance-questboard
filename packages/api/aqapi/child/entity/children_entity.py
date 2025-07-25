from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import db_config
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class ChildrenEntity(BaseEntity):
    """子供エンティティ"""

    __tablename__ = "children"
    __table_args__ = (
        # 一意制約
        UniqueConstraint("family_id", "family_member_id", name="uq_children_family_user"),
    )

    family_member_id: Mapped[int] = mapped_column(Integer, ForeignKey("family_members.id", ondelete="CASCADE"), nullable=False, comment="家族メンバーID")
    family_id: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")

    family = relationship("FamiliesEntity", foreign_keys=[family_id])
    family_member = relationship("FamilyMembersEntity", foreign_keys=[family_member_id])
