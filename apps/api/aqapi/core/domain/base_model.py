from abc import ABC, abstractmethod
from datetime import datetime
from typing import Generic, Optional, TYPE_CHECKING, TypeVar
from aqapi.auth.domain.user import User
from aqapi.core.domain.value_object.version import Version
from aqapi.core.domain.value_object.base_id import BaseId
from aqapi.core.entity.base_entity import BaseEntity
if TYPE_CHECKING:
    from aqapi.shared.domain.screen import Screen

EntityType = TypeVar("EntityType", bound='BaseEntity')
IdType = TypeVar("IdType", bound=BaseId)

class BaseModel(ABC, Generic[IdType, EntityType]):
    """ドメインモデルの基底クラス"""
    
    def __init__(self, 
                 id: IdType, version: Version, 
                 created_at: Optional[datetime] = None, created_by: Optional[User] = None, created_from: Optional['Screen'] = None,
                 updated_at: Optional[datetime] = None, updated_by: Optional[User] = None, updated_from: Optional['Screen'] = None):
        self._id = id
        self._version = version
        self._created_at = created_at
        self._created_by = created_by
        self._created_from = created_from
        self._updated_at = updated_at
        self._updated_by = updated_by
        self._updated_from = updated_from
        self._is_updated = False

    @abstractmethod
    @classmethod
    def from_entity(cls, entity: EntityType) -> 'BaseModel':
        raise NotImplementedError("Subclasses must implement this method")

    @property
    def id(self) -> IdType:
        return self._id

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
