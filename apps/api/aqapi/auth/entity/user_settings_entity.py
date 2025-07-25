from typing import override
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text, Boolean, UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_history_entity import BaseHistoryEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class UserSettingsEntity(BaseEntity):
    """ユーザ設定エンティティ"""

    __tablename__ = "user_settings"

    user_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("auth.users.id", ondelete="CASCADE"), primary_key=True, comment="ユーザID")
    language_id: Mapped[int] = mapped_column(Integer, ForeignKey("languages.id", ondelete="RESTRICT"), nullable=False, comment="言語コード")

    language = relationship("LanguagesEntity", foreign_keys=[language_id])

class UserSettingsHistoryEntity(BaseHistoryEntity[UserSettingsEntity]):
    """ユーザ設定履歴エンティティ"""

    __tablename__ = "user_settings_history"

    user_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True))
    language_id: Mapped[int] = mapped_column(Integer)

    @override
    @classmethod
    def _set_specific_attrs(cls, instance: 'UserSettingsHistoryEntity', source: UserSettingsEntity) -> None:
        instance.user_id = source.user_id
        instance.language_id = source.language_id
