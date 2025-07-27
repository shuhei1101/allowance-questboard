from abc import ABC, abstractmethod
from datetime import datetime
from typing import TYPE_CHECKING, Optional
from aqapi.login.domain.user import User
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.domain.value_object.quest_category_id import QuestCategoryId
from aqapi.quest.domain.value_object.quest_id import QuestId
if TYPE_CHECKING:
    from aqapi.shared.domain.screen import Screen


class Quest(BaseModel, ABC):
    """クエストドメインモデル基底クラス（抽象クラス）"""
    
    def __init__(self, id: Optional[QuestId],
        category_id: QuestCategoryId, icon_id: int, age_from: int, age_to: int,
        has_published_month: bool, month_from: Optional[int], month_to: Optional[int],
        version: Version, 
        created_at: Optional[datetime] = None, created_by: Optional[User] = None, created_from: Optional['Screen'] = None,
        updated_at: Optional[datetime] = None, updated_by: Optional[User] = None, updated_from: Optional['Screen'] = None
    ):
        super().__init__(version, created_at, created_by, created_from, updated_at, updated_by, updated_from)
        self._id = id
        self._category_id = category_id
        self._icon_id = icon_id
        self._age_from = age_from
        self._age_to = age_to
        self._has_published_month = has_published_month
        self._month_from = month_from
        self._month_to = month_to
        self._created_at = created_at
        self._updated_at = updated_at
