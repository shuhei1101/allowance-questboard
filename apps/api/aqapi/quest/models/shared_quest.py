from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.models.quest import Quest
from aqapi.quest.models.value_object.quest_id import QuestId


@dataclass
class SharedQuest(Quest):
    """共有クエストドメインモデル"""
    _shared_by: int = field()
    _pinned_comment_id: Optional[int] = field()
    _is_public: bool = field()
    _shared_at: Optional[datetime] = field()
    
    def __init__(self, id: QuestId, subclass_type: int, subclass_id: int,
                 category_id: int, icon_id: int, age_from: int, age_to: int,
                 has_published_month: bool, month_from: Optional[int], month_to: Optional[int],
                 created_at: Optional[datetime], updated_at: Optional[datetime], version: Version,
                 shared_by: int, pinned_comment_id: Optional[int], is_public: bool, shared_at: Optional[datetime]):
        super().__init__(id, subclass_type, subclass_id, category_id, icon_id, age_from, age_to,
                         has_published_month, month_from, month_to, created_at, updated_at, version)
        self._shared_by = shared_by
        self._pinned_comment_id = pinned_comment_id
        self._is_public = is_public
        self._shared_at = shared_at
    
    def shared_by(self) -> int:
        """共有元家族IDを取得する"""
        return self._shared_by
    
    def pinned_comment_id(self) -> Optional[int]:
        """ピン留めコメントIDを取得する"""
        return self._pinned_comment_id
    
    def is_public(self) -> bool:
        """公開フラグを取得する"""
        return self._is_public
    
    def shared_at(self) -> Optional[datetime]:
        """共有日時を取得する"""
        return self._shared_at
    
    @classmethod
    def create_new(cls, category_id: int, icon_id: int, age_from: int, age_to: int,
                   has_published_month: bool, month_from: Optional[int], month_to: Optional[int],
                   shared_by: int) -> 'SharedQuest':
        """新しい共有クエストを作成する"""
        return cls(
            id=QuestId(None),  # DB側で自動採番
            subclass_type=2,  # 共有クエストのサブクラスタイプ
            subclass_id=1,  # 仮の値、DB側で設定
            category_id=category_id,
            icon_id=icon_id,
            age_from=age_from,
            age_to=age_to,
            has_published_month=has_published_month,
            month_from=month_from,
            month_to=month_to,
            created_at=None,  # DB側で設定
            updated_at=None,  # DB側で設定
            version=Version(1),
            shared_by=shared_by,
            pinned_comment_id=None,
            is_public=True,
            shared_at=None  # DB側で設定
        )