from abc import ABC
from aqapi.core.domain.value_object.version import Version


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
