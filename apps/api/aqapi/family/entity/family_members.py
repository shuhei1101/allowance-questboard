from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseHistoryEntity

class FamilyMembersEntity(BaseEntity):
    """家族メンバーエンティティ"""

    __tablename__ = "family_members"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("auth.users.id", ondelete="CASCADE"), nullable=False, unique=True, comment="ユーザID(外部キー：auth.users.id、一意制約)")
    name = Column(String(100), nullable=False, comment="名前")
    icon_id = Column(Integer, ForeignKey("icons.id", ondelete="SET NULL"), nullable=True, comment="アイコンID(外部キー、NULL許可)")
    birthday = Column(Date, nullable=False, comment="誕生日(未来日不可)")

    icon = relationship("IconsEntity")
