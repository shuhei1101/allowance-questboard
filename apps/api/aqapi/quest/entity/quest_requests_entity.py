from sqlalchemy import Column, Integer, ForeignKey, String, Text, Boolean, DateTime, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity
from aqapi.core.config.db_config import DB_CONF


class QuestRequestsEntity(BaseEntity):
    """クエストリクエストエンティティ"""

    __tablename__ = "quest_requests"
    __table_args__ = (
        # タイトルは空文字不可
        CheckConstraint("length(title) > 0", name="chk_quest_requests_title_not_empty"),
        # 説明は空文字不可
        CheckConstraint("length(description) > 0", name="chk_quest_requests_description_not_empty"),
    )

    requested_by = Column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="リクエスト者の子供ID")
    approved_by = Column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    quest_id = Column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=True, comment="既存クエストID")
    title = Column(String(200), nullable=False, comment="リクエストタイトル")
    description = Column(Text, nullable=False, comment="リクエスト説明")
    is_new_request = Column(Boolean, nullable=False, default=True, comment="新規クエストリクエストフラグ")
    status_id = Column(Integer, ForeignKey("quest_request_statuses.id", ondelete="RESTRICT"), nullable=False, comment="ステータスID")
    answer = Column(Text, nullable=True, comment="回答内容")
    answered_at = Column(DateTime(timezone=True), nullable=True, comment="回答日時")
    requested_at = Column(DateTime(timezone=True), nullable=True, comment="リクエスト日時")

    family = relationship("FamiliesEntity", foreign_keys=[approved_by])
    child = relationship("ChildrenEntity", foreign_keys=[requested_by])
    quest = relationship("QuestsEntity", foreign_keys=[quest_id], uselist=False, lazy="joined")
    status = relationship("QuestRequestStatusesEntity", foreign_keys=[status_id], lazy="joined")


class QuestRequestsHistoryEntity(BaseHistoryEntity):
    """クエストリクエスト履歴エンティティ"""

    __tablename__ = "quest_requests_history"

    requested_by = Column(Integer)
    approved_by = Column(Integer)
    quest_id = Column(Integer)
    title = Column(String(200))
    description = Column(Text)
    is_new_request = Column(Boolean)
    status_id = Column(Integer)
    answer = Column(Text)
    answered_at = Column(DateTime(timezone=True))
    requested_at = Column(DateTime(timezone=True))

    @classmethod
    def from_source(cls, source: "QuestRequestsEntity"):
        """元のレコードから履歴エンティティを生成"""
        return cls(
            source_id=source.id,
            requested_by=source.requested_by,
            approved_by=source.approved_by,
            quest_id=source.quest_id,
            title=source.title,
            description=source.description,
            is_new_request=source.is_new_request,
            status_id=source.status_id,
            answer=source.answer,
            answered_at=source.answered_at,
            requested_at=source.requested_at,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
