from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class IconPlatforms(BaseEntity):

    __tablename__ = "icon_platforms"

    type = Column(String(50), nullable=False, unique=True, comment="プラットフォーム名(一意制約)")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            IconPlatforms(type="Flutter"),
        ]
