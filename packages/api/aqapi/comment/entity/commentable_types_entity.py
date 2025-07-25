from typing import override
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity
from aqapi.core.config.db_config import db_config


class CommentableTypesEntity(BaseEntity):
    """コメント可能タイプエンティティ

    commentsテーブルのポリモーフィック関連用のテーブル
    """

    __tablename__ = "commentable_types"

    type: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, comment="コメントが可能なテーブル名")
    description: Mapped[str] = mapped_column(Text, nullable=False, comment="コメント可能タイプの説明")

    @override
    @classmethod
    def _seed_data(cls) -> list['BaseEntity']:
        return [
            CommentableTypesEntity(type="quests", description="クエスト"),
        ]
