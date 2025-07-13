from abc import ABC, abstractmethod
from datetime import datetime
from typing import Generic, Optional, TypeVar
from aqapi.core.domain.value_object.version import Version
from aqapi.core.domain.value_object.base_id import BaseId
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.family_member.domain.value_object.family_member_id import FamilyMemberId
from aqapi.shared.domain.value_object.screen_id import ScreenId

EntityType = TypeVar("EntityType", bound='BaseEntity')
IdType = TypeVar("IdType", bound=BaseId)

class BaseModel(ABC, Generic[IdType, EntityType]):
    """ドメインモデルの基底クラス"""
    
    def __init__(self, 
                 id: IdType, version: Version, 
                 created_at: Optional[datetime] = None, created_by: Optional[FamilyMemberId] = None, created_from: Optional['ScreenId'] = None,
                 updated_at: Optional[datetime] = None, updated_by: Optional[FamilyMemberId] = None, updated_from: Optional['ScreenId'] = None):
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
