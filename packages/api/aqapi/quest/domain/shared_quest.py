from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from aqapi.auth.domain.user import User
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.domain.quest import Quest
from aqapi.quest.domain.value_object.quest_category_id import QuestCategoryId
from aqapi.quest.domain.value_object.quest_id import QuestId
from aqapi.shared.domain.screen import Screen


@dataclass
class SharedQuest(Quest):
    """共有クエストドメインモデル"""
    
    def __init__(self, id: Optional[QuestId],
        category_id: QuestCategoryId, icon_id: int, age_from: int, age_to: int,
        has_published_month: bool, month_from: Optional[int], month_to: Optional[int],
        shared_by: int, pinned_comment_id: Optional[int], is_public: bool, shared_at: Optional[datetime],
        version: Version,
        created_at: Optional[datetime] = None, created_by: Optional[User] = None, created_from: Optional['Screen'] = None,
        updated_at: Optional[datetime] = None, updated_by: Optional[User] = None, updated_from: Optional['Screen'] = None 
    ):
        super().__init__(
            id, category_id, icon_id, age_from, age_to,
            has_published_month, month_from, month_to,
            version, created_at, created_by, created_from,
            updated_at, updated_by, updated_from
        )
        self._shared_by = shared_by  # 共有者のユーザーID
        self._pinned_comment_id = pinned_comment_id  # ピン留めされたコメントのID
        self._is_public = is_public
        self._shared_at = shared_at
    
    @classmethod
    def create_new(cls, category_id: int, icon_id: int, age_from: int, age_to: int,
                   has_published_month: bool, month_from: Optional[int], month_to: Optional[int],
                   shared_by: int) -> 'SharedQuest':
        """新しい共有クエストを作成する"""
        return cls(
            id=None,
            category_id=category_id,
            icon_id=icon_id,
            age_from=age_from,
            age_to=age_to,
            has_published_month=has_published_month,
            month_from=month_from,
            month_to=month_to,
            created_at=None,
            updated_at=None,
            version=Version(1),
            shared_by=shared_by,
            pinned_comment_id=None,
            is_public=True,
            shared_at=None
        )
    
    @classmethod
    def from_entity(cls, entity: 'SharedQuestEntity') -> 'SharedQuest':
    
