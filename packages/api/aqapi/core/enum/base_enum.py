from typing import TYPE_CHECKING, TypeVar, Any
from enum import Enum

from aqapi.core.domain.value_object.base_id import BaseId

IdType = TypeVar('IdType', bound=BaseId)

class BaseEnum(Enum):
    """列挙型の基底クラス"""
    
    @classmethod
    def from_id(cls, id: BaseId) -> 'BaseEnum':
        """IDから列挙型の値を取得"""
        for item in cls:
            if item.value.id == id:
                return item
        raise ValueError(f"ID {id} is not valid for {cls.__name__}")
    
