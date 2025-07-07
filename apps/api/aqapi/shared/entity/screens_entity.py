from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class ScreensEntity(BaseEntity):
    """スクリーンエンティティ"""

    __tablename__ = "screens"

    name = Column(String, nullable=False, unique=True, comment="スクリーン名")
    description = Column(Text, nullable=False, comment="スクリーンの説明")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            ScreensEntity(name="families", description="クエストリクエスト画面"),
            ScreensEntity(name="quests", description="クエストリクエスト詳細画面"),
        ]
