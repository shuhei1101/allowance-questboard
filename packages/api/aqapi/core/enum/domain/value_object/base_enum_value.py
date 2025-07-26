from abc import ABC, abstractmethod
from typing import Generic, TypeVar

from aqapi.core.domain.value_object.base_id import BaseId

IdType = TypeVar("IdType", bound='BaseId')

class BaseEnumValue(ABC, Generic[IdType]):
    """列挙型の値を表す基底クラス"""
    
    @property
    @abstractmethod
    def id(self) -> IdType:
        """値オブジェクトのIDを返す"""
        raise NotImplementedError("This method should be implemented by subclasses.")
