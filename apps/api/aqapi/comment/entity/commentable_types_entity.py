from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity, BaseTranslationEntity
from aqapi.core.config.db_config import DB_CONF


class CommentableTypesEntity(BaseEntity):
    """コメント可能タイプエンティティ

    commentsテーブルのポリモーフィック関連用のテーブル
    """

    __tablename__ = "commentable_types"

    type = Column(String(50), nullable=False, unique=True, comment="コメントが可能なテーブル名")
    description = Column(Text, nullable=False, comment="コメント可能タイプの説明")

    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            CommentableTypesEntity(type="quests", description="クエスト"),
        ]
