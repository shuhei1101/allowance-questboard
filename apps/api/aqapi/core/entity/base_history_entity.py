from abc import abstractmethod
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text

from aqapi.core.entity.base_entity import BaseEntity


class BaseHistoryEntity(BaseEntity):
    """履歴テーブル用の基底クラス"""

    __abstract__ = True

    source_id: Mapped[int] = mapped_column(Integer, comment="元のレコードID")
    source_created_at: Mapped[DateTime] = mapped_column(DateTime, comment="元レコードの作成日時")
    source_updated_at: Mapped[DateTime] = mapped_column(DateTime, comment="元レコードの更新日時")

    @classmethod
    @abstractmethod
    def from_source(cls, source):
        """元のレコードから履歴エンティティを生成"""
        raise NotImplementedError("from_sourceメソッドはサブクラスで実装する必要があります")
