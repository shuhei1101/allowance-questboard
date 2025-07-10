from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.model.value_object.quest_id import QuestId


@dataclass
class Quest(BaseModel, ABC):
    """クエストドメインモデル基底クラス（抽象クラス）"""
    _id: Optional[QuestId] = field()
    _subclass_type: int = field()
    _subclass_id: int = field()
    _category_id: int = field()
    _icon_id: int = field()
    _age_from: int = field()
    _age_to: int = field()
    _has_published_month: bool = field()
    _month_from: Optional[int] = field()
    _month_to: Optional[int] = field()
    _created_at: Optional[datetime] = field()
    _updated_at: Optional[datetime] = field()
    
    def __init__(self, id: Optional[QuestId], subclass_type: int, subclass_id: int, 
                 category_id: int, icon_id: int, age_from: int, age_to: int,
                 has_published_month: bool, month_from: Optional[int], month_to: Optional[int],
                 created_at: Optional[datetime], updated_at: Optional[datetime], version: Version):
        super().__init__(version)
        self._id = id
        self._subclass_type = subclass_type
        self._subclass_id = subclass_id
        self._category_id = category_id
        self._icon_id = icon_id
        self._age_from = age_from
        self._age_to = age_to
        self._has_published_month = has_published_month
        self._month_from = month_from
        self._month_to = month_to
        self._created_at = created_at
        self._updated_at = updated_at
    
    @classmethod
    @abstractmethod
    def from_raw(cls, raw_data: dict):
        """生データからドメインモデルを生成する"""
        pass
