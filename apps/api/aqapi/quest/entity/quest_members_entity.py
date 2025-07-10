from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity
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

    family_quest_id = Column(Integer, ForeignKey("family_quests.id", ondelete="CASCADE"), nullable=False, comment="家族クエストID")
    member_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID")
    current_level = Column(Integer, nullable=False, default=1, comment="現在のレベル")
    status_id = Column(Integer, ForeignKey("quest_member_statuses.id", ondelete="RESTRICT"), nullable=False, comment="クエストステータスID")
    published_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="クエスト公開日時")
    achieved_at = Column(DateTime(timezone=True), nullable=True, comment="クエスト達成日時")

    family_quest = relationship("FamilyQuestsEntity", foreign_keys=[family_quest_id])
    member = relationship("ChildrenEntity", foreign_keys=[member_id])
    status = relationship("QuestMemberStatusesEntity", foreign_keys=[status_id])

class QuestMembersHistoryEntity(BaseHistoryEntity):
    """クエストメンバー履歴エンティティ"""

    __tablename__ = "quest_members_history"

    family_quest_id = Column(Integer)
    member_id = Column(Integer)
    current_level = Column(Integer)
    status_id = Column(Integer)
    published_at = Column(DateTime(timezone=True))
    achieved_at = Column(DateTime(timezone=True))

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
