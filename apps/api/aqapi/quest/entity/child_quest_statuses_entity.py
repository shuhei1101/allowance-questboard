from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, UniqueConstraint
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from sqlalchemy.orm import relationship
from aqapi.core.config.db_config import DB_CONF


class MemberQuestStatusesEntity(BaseEntity):
    """子供クエストステータスエンティティ"""

    __tablename__ = "child_quest_statuses"

    code = Column(String(20), nullable=False, unique=True, comment="ステータスコード")
    description = Column(String(255), nullable=True, comment="ステータスの説明")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
                MemberQuestStatusesEntity(code="assigned", description="割り当て済み"),
                MemberQuestStatusesEntity(code="in_progress", description="進行中"),
                MemberQuestStatusesEntity(code="completed", description="完了"),
            ]

class MemberQuestStatusesTranslationEntity(BaseEntity):
    """子供クエストステータス翻訳エンティティ"""

    __tablename__ = "child_quest_statuses_translation"
    __table_args__ = (UniqueConstraint("child_quest_status_id", "language_id"),)

    child_quest_status_id = Column(Integer, ForeignKey("child_quest_statuses.id", ondelete="CASCADE"), nullable=False, comment="ステータスID(外部キー)")
    language_id = Column(Integer, ForeignKey("languages.id", ondelete="SET NULL"), nullable=False, comment="言語コード")
    name = Column(String(100), nullable=False, comment="ステータス名の翻訳")

    child_quest_status = relationship("MemberQuestStatusesEntity")
    language = relationship("LanguagesEntity")


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
