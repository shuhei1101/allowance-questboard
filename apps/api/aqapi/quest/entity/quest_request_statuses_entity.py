from datetime import datetime
from typing import override
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, UniqueConstraint, func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import DB_CONF


class QuestRequestStatusesEntity(BaseEntity):
    """クエストリクエストステータスエンティティ"""

    __tablename__ = "quest_request_statuses"

    code: Mapped[str] = mapped_column(String(20), nullable=False, unique=True, comment="ステータスコード")
    description: Mapped[str] = mapped_column(String(255), nullable=True, comment="ステータスの説明")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
                QuestRequestStatusesEntity(code="pending", description="審査待ち"),
                QuestRequestStatusesEntity(code="approved", description="承認済み"),
                QuestRequestStatusesEntity(code="rejected", description="却下"),
            ]

class QuestRequestStatusesTranslationEntity(BaseTranslationEntity):
    """クエストリクエストステータス翻訳エンティティ"""

    __tablename__ = "quest_request_statuses_translation"
    __table_args__ = (
        UniqueConstraint("quest_request_status_id", "language_id", name="uq_quest_request_statuses_translation_status_language"),
    )

    quest_request_status_id: Mapped[int] = mapped_column(Integer, ForeignKey("quest_request_statuses.id", ondelete="CASCADE"), nullable=False, comment="ステータスID")
    name: Mapped[str] = mapped_column(String(100), nullable=False, comment="ステータス名の翻訳")
    
    quest_request_statuses = relationship("QuestRequestStatusesEntity", foreign_keys=[quest_request_status_id])

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            QuestRequestStatusesTranslationEntity(quest_request_status_id=1, name="審査待ち", language_id=1),
            QuestRequestStatusesTranslationEntity(quest_request_status_id=1, name="pending", language_id=2),
            QuestRequestStatusesTranslationEntity(quest_request_status_id=2, name="承認済み", language_id=1),
            QuestRequestStatusesTranslationEntity(quest_request_status_id=2, name="approved", language_id=2),
            QuestRequestStatusesTranslationEntity(quest_request_status_id=3, name="却下", language_id=1),
            QuestRequestStatusesTranslationEntity(quest_request_status_id=3, name="rejected", language_id=2),
        ]
