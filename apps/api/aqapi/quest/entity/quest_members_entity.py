from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class QuestMembersEntity(BaseEntity):
    """クエストメンバーエンティティ
    
    家族クエストに参加している子供の情報を管理するエンティティです。
    """

    __tablename__ = "quest_members"
    __table_args__ = (
        # レベルは0より大きい
        CheckConstraint("current_level > 0", name="chk_quest_members_current_level_positive"),
        # 達成日時は公開日時以降
        CheckConstraint("(achieved_at IS NULL) OR (achieved_at IS NOT NULL AND achieved_at >= published_at)", name="chk_quest_members_achieved_after_published"),
        # 一意制約
        UniqueConstraint("family_quest_id", "member_id"),
    )

    family_quest_id: Mapped[int] = mapped_column(Integer, ForeignKey("family_quests.id", ondelete="CASCADE"), nullable=False, comment="家族クエストID")
    member_id: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID")
    current_level: Mapped[int] = mapped_column(Integer, nullable=False, default=1, comment="現在のレベル")
    status_id: Mapped[int] = mapped_column(Integer, ForeignKey("quest_member_statuses.id", ondelete="RESTRICT"), nullable=False, comment="クエストステータスID")
    published_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="クエスト公開日時")
    achieved_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True, comment="クエスト達成日時")

    family_quest = relationship("FamilyQuestsEntity", foreign_keys=[family_quest_id])
    member = relationship("ChildrenEntity", foreign_keys=[member_id])
    status = relationship("QuestMemberStatusesEntity", foreign_keys=[status_id])

class QuestMembersHistoryEntity(BaseHistoryEntity):
    """クエストメンバー履歴エンティティ"""

    __tablename__ = "quest_members_history"

    family_quest_id: Mapped[int] = mapped_column(Integer)
    member_id: Mapped[int] = mapped_column(Integer)
    current_level: Mapped[int] = mapped_column(Integer)
    status_id: Mapped[int] = mapped_column(Integer)
    published_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))
    achieved_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))

    @classmethod
    def from_source(cls, source: "QuestMembersEntity"):
        """元のレコードから履歴エンティティを生成"""
        return cls(
            source_id=source.id,
            family_quest_id=source.family_quest_id,
            member_id=source.member_id,
            current_level=source.current_level,
            status_id=source.status_id,
            published_at=source.published_at,
            achieved_at=source.achieved_at,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
