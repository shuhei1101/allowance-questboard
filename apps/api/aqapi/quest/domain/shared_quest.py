from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.domain.quest import Quest
from aqapi.quest.domain.value_object.quest_id import QuestId


@dataclass
class SharedQuest(Quest):
    """共有クエストドメインモデル"""
    _shared_by: int = field()
    _pinned_comment_id: Optional[int] = field()
    _is_public: bool = field()
    _shared_at: Optional[datetime] = field()
    
    def __init__(self, id: Optional[QuestId], subclass_type: int, subclass_id: int,
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
    
    @classmethod
    def create_new(cls, category_id: int, icon_id: int, age_from: int, age_to: int,
                   has_published_month: bool, month_from: Optional[int], month_to: Optional[int],
                   shared_by: int) -> 'SharedQuest':
        """新しい共有クエストを作成する"""
        return cls(
            id=None,  # DB側で自動採番
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
    
    @classmethod
    def from_raw(cls, raw_data: dict):
        """生データからドメインモデルを生成する"""
        # TODO: 実装が必要になったら追加
        pass
