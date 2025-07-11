from abc import ABC, abstractmethod
from aqapi.core.domain.value_object.version import Version

@dataclass
class BaseModel(ABC):
    _created_at: datetime = field()
    _created_by: User = field()
    _created_from: Screen = field()
    _updated_at: datetime = field()
    _updated_by: User = field()
    _updated_from: Screen = field()
    _version: Version = field()
    _is_updated: bool = False
    
    """ドメインモデルの基底クラス"""
    def __init__(self, version: Version):
        self._version = version
        
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
