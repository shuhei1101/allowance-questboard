from typing import override
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import db_config


class IconPlatforms(BaseEntity):

    __tablename__ = "icon_platforms"

    type: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, comment="プラットフォーム名(一意制約)")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            IconPlatforms(type="Flutter"),
        ]
