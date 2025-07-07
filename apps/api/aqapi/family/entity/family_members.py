from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity

class FamilyMembersEntity(BaseEntity):
    """家族メンバーエンティティ"""

    __tablename__ = "family_members"
    __table_args__ = (
        # 名前は空文字不可
        CheckConstraint("length(name) > 0", name="chk_parents_name_not_empty"),
        # 誕生日は未来日不可
        CheckConstraint("birthday <= CURRENT_DATE", name="chk_parents_birthday_not_future"),
    )
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("auth.users.id", ondelete="CASCADE"), nullable=False, unique=True, comment="ユーザID(外部キー：auth.users.id、一意制約)")
    name = Column(String(100), nullable=False, comment="名前")
    icon_id = Column(Integer, ForeignKey("icons.id", ondelete="SET NULL"), nullable=True, comment="アイコンID(外部キー、NULL許可)")
    birthday = Column(Date, nullable=False, comment="誕生日(未来日不可)")

    icon = relationship("IconsEntity", foreign_keys=[icon_id])

class FamilyMembersHistoryEntity(BaseHistoryEntity):
    """家族メンバー履歴エンティティ"""

    __tablename__ = "family_members_history"

    user_id = Column(UUID(as_uuid=True))
    name = Column(String(100))
    icon_id = Column(Integer)
    birthday = Column(Date)

    @classmethod
    def from_source(cls, source: "FamilyMembersEntity"):
        """元のレコードから履歴エンティティを生成"""
        return cls(
            source_id=source.id,
            user_id=source.user_id,
            name=source.name,
            icon_id=source.icon_id,
            birthday=source.birthday,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
