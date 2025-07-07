from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity, BaseHistoryEntity


class UserSettingsEntity(BaseEntity):
    """ユーザ設定エンティティ"""

    __tablename__ = "user_settings"

    user_id = Column(UUID(as_uuid=True), ForeignKey("auth.users.id", ondelete="CASCADE"), primary_key=True, comment="ユーザID")
    language_id = Column(Integer, ForeignKey("languages.id", ondelete="RESTRICT"), nullable=False, comment="言語コード")

    language = relationship("LanguagesEntity", foreign_keys=[language_id])

class UserSettingsHistoryEntity(BaseHistoryEntity):
    """ユーザ設定履歴エンティティ"""

    __tablename__ = "user_settings_history"

    user_id = Column(UUID(as_uuid=True))
    language_id = Column(Integer)

    @classmethod
    def from_source(cls, source: "UserSettingsEntity"):
        return cls(
            source_user_id=source.user_id,
            language_id=source.language_id,
            source_created_at=source.created_at,
            source_updated_at=source.updated_at,
        )
