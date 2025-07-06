from abc import ABC, abstractmethod
from typing import TypeVar, Any

T = TypeVar('T', bound='BaseValueObject')


class BaseValueObject(ABC):
    """値オブジェクトの基底クラス"""
    
    def __init__(self):
        self.validate()
    
    @abstractmethod
    def validate(self) -> None:
        """値オブジェクトの値を検証する"""
        pass
    
    @classmethod
    @abstractmethod
    def from_raw(cls: type[T], raw_value: Any) -> T:
        """生の値から値オブジェクトを作成する"""
        pass