from abc import abstractmethod
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text

from aqapi.core.entity.base_entity import BaseEntity


class BaseTranslationEntity(BaseEntity):
    """翻訳テーブル用の基底クラス"""

    __abstract__ = True

    language_id: Mapped[int] = mapped_column(Integer, ForeignKey("languages.id", ondelete="SET NULL"), nullable=False, comment="言語コード")

    @property
    @abstractmethod
    def source_id(self) -> int:
        """翻訳元レコードのIDを返す"""
        raise NotImplementedError("source_idプロパティはサブクラスで実装する必要があります")
