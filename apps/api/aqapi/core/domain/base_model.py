from abc import ABC, abstractmethod
from typing import TypeVar, Any
from aqapi.core.domain.value_object.version import Version

T = TypeVar('T', bound='BaseModel')


class BaseModel(ABC):
    """ドメインモデルの基底クラス"""
    def __init__(self, version: Version):
        self._version = version
        self._is_updated = False

    def version(self) -> Version:
        return self._version

    def _update_version(self) -> None:
        """バージョンを1上げ、更新フラグを設定する"""
        if not self._is_updated:
            self._is_updated = True
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
