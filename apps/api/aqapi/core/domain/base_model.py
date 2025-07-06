from abc import ABC, abstractmethod
from typing import TypeVar, Any
from aqapi.core.domain.value_object.version import Version

T = TypeVar('T', bound='BaseModel')


class BaseModel(ABC):
    """ドメインモデルの基底クラス"""
    def __init__(self, version: Version):
        self._version = version

    def version(self) -> Version:
        return self._version

    def next_version(self) -> None:
        """次のバージョンに進める"""
        self._version.next()
    
    def is_same_version(self, other: 'BaseModel') -> bool:
        """他のモデルと同じバージョンかどうかを比較"""
        if not isinstance(other, BaseModel):
            return NotImplemented
        return self._version == other.version()
    
    @classmethod
    @abstractmethod
    def from_raw(cls: type[T], raw_data: Any) -> T:
        """生データからドメインモデルを作成する"""
        pass
