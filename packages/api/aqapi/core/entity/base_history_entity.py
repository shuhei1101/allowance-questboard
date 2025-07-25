from abc import abstractmethod
from datetime import datetime
from typing import Generic, TypeVar
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint, UniqueConstraint, String, Text

from aqapi.core.entity.base_entity import BaseEntity

BaseEntityType = TypeVar('BaseEntityType', bound='BaseEntity')

class BaseHistoryEntity(BaseEntity, Generic[BaseEntityType]):
    """履歴テーブル用の基底クラス"""

    __abstract__ = True

    source_id: Mapped[int] = mapped_column(Integer, comment="元のレコードID")
    source_version: Mapped[int] = mapped_column(Integer, comment="元のレコードのバージョン")
    source_created_at: Mapped[datetime] = mapped_column(DateTime, comment="元レコードの作成日時")
    source_created_by: Mapped[int] = mapped_column(Integer, comment="元レコードの作成者ID")
    source_created_from: Mapped[int] = mapped_column(Integer, comment="元レコードの作成元スクリーンID")
    source_updated_at: Mapped[datetime] = mapped_column(DateTime, comment="元レコードの更新日時")
    source_updated_by: Mapped[int] = mapped_column(Integer, comment="元レコードの更新者ID")
    source_updated_from: Mapped[int] = mapped_column(Integer, comment="元レコードの更新元スクリーンID")

    @classmethod
    def from_source(cls, source: BaseEntityType) -> 'BaseHistoryEntity':
        """元のレコードから履歴エンティティを生成"""
        # 基底クラスの属性をセット
        instance = cls(
            source_id=source.id,
            source_version=source.version,
            source_created_at=source.created_at,
            source_created_by=source.created_by,
            source_created_from=source.created_from,
            source_updated_at=source.updated_at,
            source_updated_by=source.updated_by,
            source_updated_from=source.updated_from
        )
        # サブクラスで具体的な属性をセット
        cls._set_specific_attrs(instance, source)
        return instance

    @classmethod
    @abstractmethod
    def _set_specific_attrs(cls, instance: 'BaseHistoryEntity', source: BaseEntityType) -> None:
        """サブクラス固有の属性をセット（実装必須）
        
        例:
        ```python
        instance.some_attr = source.some_attr
        instance.another_attr = source.another_attr
        ```

        :param instance: 履歴エンティティのインスタンス
        :param source: 元のエンティティ
        :raises NotImplementedError: サブクラスで実装されていない場合
        """
        raise NotImplementedError("Subclasses must implement this method to set specific attributes.")
