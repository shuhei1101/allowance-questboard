from datetime import date
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID, Date, Uuid
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity

class FamilyMembersEntity(BaseEntity):
    """家族メンバーエンティティ"""

    __tablename__ = "family_members"
    __table_args__ = (
        # 名前は空文字不可
        CheckConstraint("length(name) > 0", name="chk_parents_name_not_empty"),
        # 誕生日は未来日不可
        CheckConstraint("birthday <= CURRENT_DATE", name="chk_parents_birthday_not_future"),
    )
    
    user_id: Mapped[Uuid] = mapped_column(UUID(as_uuid=True), ForeignKey("auth.users.id", ondelete="CASCADE"), nullable=False, comment="ユーザID(外部キー：auth.users.id")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="名前")
    icon_id: Mapped[int] = mapped_column(Integer, ForeignKey("icons.id", ondelete="SET NULL"), nullable=True, comment="アイコンID(外部キー、NULL許可)")
    birthday: Mapped[date] = mapped_column(Date, nullable=False, comment="誕生日(未来日不可)")

    icon = relationship("IconsEntity", foreign_keys=[icon_id])

class FamilyMembersHistoryEntity(BaseHistoryEntity):
    """家族メンバー履歴エンティティ"""

    __tablename__ = "family_members_history"

    user_id: Mapped[Uuid] = mapped_column(UUID(as_uuid=True))
    name: Mapped[str] = mapped_column(String(100))
    icon_id: Mapped[int] = mapped_column(Integer)
    birthday: Mapped[date] = mapped_column(Date)

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
