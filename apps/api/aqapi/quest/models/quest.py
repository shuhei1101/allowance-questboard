from dataclasses import dataclass
from datetime import datetime, UTC
from typing import Any, Dict
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.models.value_object.quest_id import QuestId
from aqapi.quest.models.value_object.quest_title import QuestTitle
from aqapi.quest.models.value_object.quest_description import QuestDescription
from aqapi.quest.models.value_object.quest_level import QuestLevel


@dataclass
class Quest(BaseModel):
    """クエストドメインモデル"""
    
    def __init__(self, id: QuestId, title: QuestTitle, description: QuestDescription, level: QuestLevel, created_at: datetime, updated_at: datetime, version: Version):
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
        self._updated_at = datetime.now(UTC)
        self.next_version()
    
    def update_description(self, description: QuestDescription) -> None:
        """クエスト詳細を更新する"""
        self._description = description
        self._updated_at = datetime.now(UTC)
        self.next_version()
    
    def update_level(self, level: QuestLevel) -> None:
        """クエストレベルを更新する"""
        self._level = level
        self._updated_at = datetime.now(UTC)
        self.next_version()
    
    @classmethod
    def create_new(cls, title: QuestTitle, description: QuestDescription, level: QuestLevel) -> 'Quest':
        """新しいクエストを作成する"""
        import uuid
        now = datetime.now(UTC)
        return cls(
            id=QuestId(uuid.uuid4()),
            title=title,
            description=description,
            level=level,
            created_at=now,
            updated_at=now,
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
            created_at=datetime.fromisoformat(raw_data['created_at']),
            updated_at=datetime.fromisoformat(raw_data['updated_at']),
            version=Version(raw_data['version'])
        )