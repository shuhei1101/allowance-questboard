from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, Optional
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.models.value_object.quest_id import QuestId
from aqapi.quest.models.value_object.quest_title import QuestTitle
from aqapi.quest.models.value_object.quest_description import QuestDescription
from aqapi.quest.models.value_object.quest_level import QuestLevel


@dataclass
class Quest(BaseModel):
    """クエストドメインモデル"""
    _id: QuestId = field(repr=False)
    _title: QuestTitle = field(repr=False)
    _description: QuestDescription = field(repr=False)
    _level: QuestLevel = field(repr=False)
    _created_at: Optional[datetime] = field(repr=False)
    _updated_at: Optional[datetime] = field(repr=False)
    
    def __init__(self, id: QuestId, title: QuestTitle, description: QuestDescription, level: QuestLevel, created_at: Optional[datetime], updated_at: Optional[datetime], version: Version):
        super().__init__(version)
        self._id = id
        self._title = title
        self._description = description
        self._level = level
        self._created_at = created_at
        self._updated_at = updated_at
    
    def update_title(self, title: QuestTitle) -> None:
        """クエストタイトルを更新する"""
        self._title = title
        self._update_version()
    
    def update_description(self, description: QuestDescription) -> None:
        """クエスト詳細を更新する"""
        self._description = description
        self._update_version()
    
    def update_level(self, level: QuestLevel) -> None:
        """クエストレベルを更新する"""
        self._level = level
        self._update_version()
    
    @classmethod
    def create_new(cls, title: QuestTitle, description: QuestDescription, level: QuestLevel) -> 'Quest':
        """新しいクエストを作成する"""
        return cls(
            id=QuestId(None),  # DB側で自動採番
            title=title,
            description=description,
            level=level,
            created_at=None,  # DB側で設定
            updated_at=None,  # DB側で設定
            version=Version(1)
        )
    
    @classmethod
    def from_raw(cls, raw_data: Any) -> 'Quest':
        """生データからクエストを作成する"""
        if not isinstance(raw_data, dict):
            raise ValueError("Questの生データは辞書である必要があります。")
        
        return cls(
            id=QuestId.from_raw(raw_data['id']),
            title=QuestTitle.from_raw(raw_data['title']),
            description=QuestDescription.from_raw(raw_data['description']),
            level=QuestLevel.from_raw(raw_data['level']),
            created_at=datetime.fromisoformat(raw_data['created_at']) if raw_data.get('created_at') else None,
            updated_at=datetime.fromisoformat(raw_data['updated_at']) if raw_data.get('updated_at') else None,
            version=Version(raw_data['version'])
        )