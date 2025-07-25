from datetime import datetime
from typing import override
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class ScreensEntity(BaseEntity):
    """スクリーンエンティティ"""

    __tablename__ = "screens"

    code: Mapped[str] = mapped_column(String(20), nullable=False, unique=True, comment="スクリーンコード")
    description: Mapped[str] = mapped_column(Text, nullable=True, comment="スクリーンの説明")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            ScreensEntity(code="HOME", description="ホーム画面"),
            ScreensEntity(code="QUEST_LIST", description="クエスト一覧"),
            ScreensEntity(code="QUEST_DETAIL", description="クエスト詳細"),
        ]
