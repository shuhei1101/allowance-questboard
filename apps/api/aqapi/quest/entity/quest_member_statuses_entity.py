from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, UniqueConstraint
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import DB_CONF


class QuestMemberStatusesEntity(BaseEntity):
    """子供クエストステータスエンティティ"""

    __tablename__ = "quest_member_statuses"

    code: Mapped[str] = mapped_column(String(20), nullable=False, unique=True, comment="ステータスコード")
    description: Mapped[str] = mapped_column(String(255), nullable=True, comment="ステータスの説明")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
                QuestMemberStatusesEntity(code="assigned", description="割り当て済み"),
                QuestMemberStatusesEntity(code="in_progress", description="進行中"),
                QuestMemberStatusesEntity(code="completed", description="完了"),
            ]

class MemberQuestStatusesTranslationEntity(BaseTranslationEntity):
    """子供クエストステータス翻訳エンティティ"""

    __tablename__ = "quest_member_statuses_translation"
    __table_args__ = (UniqueConstraint("child_quest_status_id", "language_id"),)

    child_quest_status_id: Mapped[int] = mapped_column(Integer, ForeignKey("quest_member_statuses.id", ondelete="CASCADE"), nullable=False, comment="ステータスID(外部キー)")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="ステータス名の翻訳")

    child_quest_status = relationship("QuestMemberStatusesEntity", foreign_keys=[child_quest_status_id])


    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            MemberQuestStatusesTranslationEntity(child_quest_status_id=1, language_id=1, name="割り当て済み"),
            MemberQuestStatusesTranslationEntity(child_quest_status_id=1, language_id=2, name="Assigned"),
            MemberQuestStatusesTranslationEntity(child_quest_status_id=2, language_id=1, name="進行中"),
            MemberQuestStatusesTranslationEntity(child_quest_status_id=2, language_id=2, name="In Progress"),
            MemberQuestStatusesTranslationEntity(child_quest_status_id=3, language_id=1, name="完了"),
            MemberQuestStatusesTranslationEntity(child_quest_status_id=3, language_id=2, name="Completed"),
        ]
