
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Hashable

from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.base_id import BaseId

IdType = TypeVar("IdType", bound=BaseId)

class CollectionItemProtocol(Generic[IdType]):
    """コレクションアイテムのプロトコル"""
    
    @property
    def id(self) -> IdType:
        """アイテムのIDを返す"""
        raise NotImplementedError("Subclasses must implement this method to return the item ID.")


ItemType = TypeVar("ItemType", bound=BaseModel)

class BaseCollection(ABC, Generic[ItemType, IdType]):

    def __init__(self, items: list[ItemType]):
        self._items = items
        self._item_by_ids: dict[IdType, ItemType] = {}
        self.update_index()

    @classmethod
    def from_empty(cls):
        return cls(items=[])

    def update_index(self):
        """辞書の更新"""
        self._item_by_ids = {item.id: item for item in self._items}
        self._update_custom_index()

    def append(self, item: ItemType) -> None:
        """アイテムを追加"""
        if not isinstance(item, BaseModel):
            raise TypeError(f"Expected item of type {ItemType}, got {type(item)}")
        self._items.append(item)
        self.update_index()

    def get(self, item_id: IdType) -> ItemType | None:
        """IDでアイテムを取得"""
        if not isinstance(item_id, Hashable):
            raise TypeError(f"Expected item_id to be hashable, got {type(item_id)}")
        return self._item_by_ids.get(item_id)

    @abstractmethod
    def _update_custom_index(self) -> None:
        """具象クラスで実装するカスタムインデックスの更新メソッド（任意）"""
        pass
