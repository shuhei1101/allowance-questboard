from sqlalchemy import Column, Integer, String, Text
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class QuestTypesEntity(BaseEntity):
    """クエストサブクラスタイプエンティティ"""

    __tablename__ = "quest_types"

    table_name = Column(String(20), nullable=False, unique=True, comment="サブクラスタイプテーブル名")
    description = Column(Text, nullable=False, comment="タイプの説明")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            QuestTypesEntity(table_name="template_quests", description="テンプレートクエストテーブル"),
            QuestTypesEntity(table_name="shared_quests", description="共有クエストテーブル"),
            QuestTypesEntity(table_name="saved_quests", description="保存済みクエストテーブル"),
            QuestTypesEntity(table_name="family_quests", description="家族クエストテーブル"),
            QuestTypesEntity(table_name="child_quests", description="子供クエストテーブル"),
        ]
