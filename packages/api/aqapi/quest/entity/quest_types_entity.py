from typing import override
from sqlalchemy import Column, Integer, String, Text
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import db_config


class QuestTypesEntity(BaseEntity):
    """クエストサブクラスタイプエンティティ"""

    __tablename__ = "quest_types"

    table_name: Mapped[str] = mapped_column(String(20), nullable=False, unique=True, comment="サブクラスタイプテーブル名")
    description: Mapped[str] = mapped_column(Text, nullable=False, comment="タイプの説明")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            QuestTypesEntity(table_name="template_quests", description="テンプレートクエストテーブル"),
            QuestTypesEntity(table_name="shared_quests", description="共有クエストテーブル"),
            QuestTypesEntity(table_name="family_quests", description="家族クエストテーブル"),
        ]
