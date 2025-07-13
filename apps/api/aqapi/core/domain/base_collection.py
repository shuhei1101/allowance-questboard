
from abc import ABC
from typing import Generic, TypeVar, Hashable

from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.base_id import BaseId

IdType = TypeVar("IdType", bound=Hashable)

class BaseCollectionItem(ABC, Generic[IdType]):
    """コレクション内のアイテムのベースクラス、共通のインターフェイス"""

    @property
    def id(self) -> IdType:
        raise NotImplementedError("Subclasses must implement this method")

ItemType = TypeVar("ItemType", bound=BaseCollectionItem)

class BaseCollection(ABC, Generic[ItemType, IdType]):

    def __init__(self, items: list[ItemType]):
        self._items = items
        self._item_by_ids: dict[IdType, ItemType] = {}
        self.update_item_by_ids()

    @classmethod
    def from_empty(cls):
        return cls(items=[])

    def update_item_by_ids(self):
        """辞書の更新"""
        self._item_by_ids = {item.id: item for item in self._items}

    def append(self, item: ItemType) -> None:
        """アイテムを追加"""
        if not isinstance(item, BaseModel):
            raise TypeError(f"Expected item of type {ItemType}, got {type(item)}")
        self._items.append(item)
        self.update_item_by_ids()

    def get(self, item_id: IdType) -> ItemType | None:
        """IDでアイテムを取得"""
        if not isinstance(item_id, Hashable):
            raise TypeError(f"Expected item_id to be hashable, got {type(item_id)}")
        return self._item_by_ids.get(item_id)
