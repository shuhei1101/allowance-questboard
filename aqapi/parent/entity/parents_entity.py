from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseHistoryEntity, BaseTranslationEntity


class ParentsEntity(BaseEntity):
    """親エンティティ"""

    __tablename__ = "parents"
    __table_args__ = (
        # 家族IDは0より大きい
        CheckConstraint("family_id > 0", name="chk_parents_family_id_positive"),
        # 一意制約
        UniqueConstraint("family_id", "user_id", name="uq_parents_family_user"),
        # 本文は空文字不可
        CheckConstraint("length(name) > 0", name="chk_parents_name_not_empty"),
        # 誕生日は未来日不可
        CheckConstraint("birthday <= CURRENT_DATE", name="chk_parents_birthday_not_future"),
    )

    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    family_member_id = Column(Integer, ForeignKey("family_members.id", ondelete="CASCADE"), nullable=False, comment="家族メンバーID")
    
    family = relationship("FamiliesEntity")
    family_member = relationship("FamilyMembersEntity")
