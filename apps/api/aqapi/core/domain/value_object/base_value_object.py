from abc import abstractmethod
from typing import Generic, TypeVar

ValueType = TypeVar('ValueType')

class BaseValueObject(Generic[ValueType]):
    """値オブジェクトの基底クラス"""
    
    def __init__(self, value: ValueType):
        self._value = value
        self._validate()
    
    @abstractmethod
    def _validate(self) -> None:
        """値オブジェクトの値を検証する"""
        raise NotImplementedError("Subclasses must implement this method.")
