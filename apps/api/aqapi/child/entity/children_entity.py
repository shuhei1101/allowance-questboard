from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseHistoryEntity, BaseTranslationEntity


class ChildrenEntity(BaseEntity):
    """子供エンティティ"""

    __tablename__ = "children"
    __table_args__ = (
        # 本文は空文字不可
        CheckConstraint("length(name) > 0", name="chk_children_name_not_empty"),
        # 誕生日は未来日不可
        CheckConstraint("birthday <= CURRENT_DATE", name="chk_children_birthday_not_future"),
    )

    user_id = Column(UUID(as_uuid=True), ForeignKey("auth.users.id", ondelete="CASCADE"), nullable=False, unique=True, comment="ユーザID")
    family_id = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    name = Column(String(100), nullable=False, comment="子供名")
    icon_id = Column(Integer, ForeignKey("icons.id", ondelete="SET NULL"), nullable=True, comment="アイコンID")
    birthday = Column(Date, nullable=False, comment="誕生日")

    family = relationship("FamiliesEntity")
    icon = relationship("IconsEntity")

class ChildrenHistoryEntity(BaseHistoryEntity):
    """子供履歴エンティティ"""

    __tablename__ = "children_history"

    user_id = Column(UUID(as_uuid=True))
    family_id = Column(Integer)
    name = Column(String(100))
    icon_id = Column(Integer)
    birthday = Column(Date)

    @classmethod
    def from_source(cls, source: "ChildrenEntity"):
        """元のレコードから履歴エンティティを生成"""
        return cls(
            source_id=source.id,
            user_id=source.user_id,
            family_id=source.family_id,
            name=source.name,
            icon_id=source.icon_id,
            birthday=source.birthday,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
