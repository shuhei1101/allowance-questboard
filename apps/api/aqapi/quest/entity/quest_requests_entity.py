from typing import override
from sqlalchemy import Column, Integer, ForeignKey, String, Text, Boolean, DateTime, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
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

    requested_by: Mapped[int] = mapped_column(Integer, ForeignKey("children.id", ondelete="CASCADE"), nullable=False, comment="リクエスト者の子供ID")
    approved_by: Mapped[int] = mapped_column(Integer, ForeignKey("families.id", ondelete="CASCADE"), nullable=False, comment="家族ID")
    quest_id: Mapped[int] = mapped_column(Integer, ForeignKey("quests.id", ondelete="CASCADE"), nullable=True, comment="既存クエストID")
    title: Mapped[str] = mapped_column(String(200), nullable=False, comment="リクエストタイトル")
    description: Mapped[str] = mapped_column(Text, nullable=False, comment="リクエスト説明")
    is_new_request: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, comment="新規クエストリクエストフラグ")
    status_id: Mapped[int] = mapped_column(Integer, ForeignKey("quest_request_statuses.id", ondelete="RESTRICT"), nullable=False, comment="ステータスID")
    answer: Mapped[str] = mapped_column(Text, nullable=True, comment="回答内容")
    answered_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True, comment="回答日時")
    requested_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True, comment="リクエスト日時")

    family = relationship("FamiliesEntity", foreign_keys=[approved_by])
    child = relationship("ChildrenEntity", foreign_keys=[requested_by])
    quest = relationship("QuestsEntity", foreign_keys=[quest_id], uselist=False, lazy="joined")
    status = relationship("QuestRequestStatusesEntity", foreign_keys=[status_id], lazy="joined")


class QuestRequestsHistoryEntity(BaseHistoryEntity[QuestRequestsEntity]):
    """クエストリクエスト履歴エンティティ"""

    __tablename__ = "quest_requests_history"

    requested_by: Mapped[int] = mapped_column(Integer)
    approved_by: Mapped[int] = mapped_column(Integer)
    quest_id: Mapped[int] = mapped_column(Integer)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)
    is_new_request: Mapped[bool] = mapped_column(Boolean)
    status_id: Mapped[int] = mapped_column(Integer)
    answer: Mapped[str] = mapped_column(Text)
    answered_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))
    requested_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True))

    @override
    @classmethod
    def _set_specific_attrs(cls, instance: 'QuestRequestsHistoryEntity', source: QuestRequestsEntity) -> None:
        instance.requested_by = source.requested_by
        instance.approved_by = source.approved_by
        instance.quest_id = source.quest_id
        instance.title = source.title
        instance.description = source.description
        instance.is_new_request = source.is_new_request
        instance.status_id = source.status_id
        instance.answer = source.answer
        instance.answered_at = source.answered_at
        instance.requested_at = source.requested_at
