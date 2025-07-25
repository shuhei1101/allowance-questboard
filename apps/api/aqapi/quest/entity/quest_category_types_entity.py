from typing import override
from sqlalchemy import Column, Integer, String, Text
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from sqlalchemy.orm import relationship, Mapped, mapped_column
from aqapi.core.config.db_config import DB_CONF


class QuestCategoryTypesEntity(BaseEntity):
    """クエストカテゴリサブクラステーブルエンティティ"""

    __tablename__ = "quest_category_types"

    table_name: Mapped[str] = mapped_column(String, nullable=False, unique=True, comment="テーブル名")
    description: Mapped[str] = mapped_column(Text, nullable=False, comment="タイプの説明")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            QuestCategoryTypesEntity(table_name="template_quest_categories", description="テンプレートカテゴリ"),
            QuestCategoryTypesEntity(table_name="custom_quest_categories", description="家族がカスタムしたカテゴリ"),
        ]
