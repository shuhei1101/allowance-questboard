from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity
from aqapi.core.config.db_config import DB_CONF


class MemberQuestsEntity(BaseEntity):
    """子供クエストエンティティ"""

    __tablename__ = "child_quests"
    __table_args__ = (
        # レベルは0より大きい
        CheckConstraint("current_level > 0", name="chk_child_quests_current_level_positive"),
        # 達成日時は公開日時以降
        CheckConstraint("(achieved_at IS NULL) OR (achieved_at IS NOT NULL AND achieved_at >= published_at)", name="chk_child_quests_achieved_after_published"),
        # 一意制約
        UniqueConstraint("quest_id", "child_id"),
    )

    quest_id = Column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=False, comment="クエストID")
    child_id = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="子供ID")
    current_level = Column(Integer, nullable=False, default=1, comment="現在のレベル")
    status_id = Column(Integer, ForeignKey("child_quest_statuses.id", ondelete="RESTRICT"), nullable=False, comment="クエストステータスID")
    published_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), comment="クエスト公開日時")
    achieved_at = Column(DateTime(timezone=True), nullable=True, comment="クエスト達成日時")

    quest = relationship("QuestsEntity", foreign_keys=[quest_id])
    child = relationship("ChildrenEntity", foreign_keys=[child_id])
    status = relationship("MemberQuestStatusesEntity", foreign_keys=[status_id])

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            MemberQuestsEntity(quest_id=1, child_id=1, current_level=1, status_id=1),
            MemberQuestsEntity(quest_id=2, child_id=1, current_level=1, status_id=1),
            MemberQuestsEntity(quest_id=3, child_id=2, current_level=1, status_id=1),
        ]


class MemberQuestsHistoryEntity(BaseHistoryEntity):
    """子供クエスト履歴エンティティ"""

    __tablename__ = "child_quests_history"

    quest_id = Column(Integer)
    child_id = Column(Integer)
    current_level = Column(Integer)
    status_id = Column(Integer)
    published_at = Column(DateTime(timezone=True))
    achieved_at = Column(DateTime(timezone=True))

    @classmethod
    def from_source(cls, source: "MemberQuestsEntity"):
        """元のレコードから履歴エンティティを生成"""
        return cls(
            source_id=source.id,
            quest_id=source.quest_id,
            child_id=source.child_id,
            current_level=source.current_level,
            status_id=source.status_id,
            published_at=source.published_at,
            achieved_at=source.achieved_at,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
