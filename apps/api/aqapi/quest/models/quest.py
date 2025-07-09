from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, Optional
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.models.value_object.quest_id import QuestId
from aqapi.quest.models.value_object.quest_title import QuestTitle
from aqapi.quest.models.value_object.quest_description import QuestDescription
from aqapi.quest.models.value_object.quest_level import QuestLevel


@dataclass
class Quest(BaseModel):
    """クエストドメインモデル"""
    _id: QuestId = field()
    _title: QuestTitle = field()
    _description: QuestDescription = field()
    _level: QuestLevel = field()
    _created_at: Optional[datetime] = field()
    _updated_at: Optional[datetime] = field()
    
    def __init__(self, id: QuestId, title: QuestTitle, description: QuestDescription, level: QuestLevel, created_at: Optional[datetime], updated_at: Optional[datetime], version: Version):
        super().__init__(version)
        self._id = id
        self._title = title
        self._description = description
        self._level = level
        self._created_at = created_at
        self._updated_at = updated_at
    
    def id(self) -> QuestId:
        """クエストIDを取得する"""
        return self._id
    
    def title(self) -> QuestTitle:
        """クエストタイトルを取得する"""
        return self._title
    
    def description(self) -> QuestDescription:
        """クエスト詳細を取得する"""
        return self._description
    
    def level(self) -> QuestLevel:
        """クエストレベルを取得する"""
        return self._level
    
    def update_title(self, title: QuestTitle) -> 'Quest':
        """クエストタイトルを更新した新しいインスタンスを返す"""
        new_version = Version(self._version.value + 1)
        return Quest(
            id=self._id,
            title=title,
            description=self._description,
            level=self._level,
            created_at=self._created_at,
            updated_at=None,  # DB側で更新
            version=new_version
        )
    
    def update_description(self, description: QuestDescription) -> 'Quest':
        """クエスト詳細を更新した新しいインスタンスを返す"""
        new_version = Version(self._version.value + 1)
        return Quest(
            id=self._id,
            title=self._title,
            description=description,
            level=self._level,
            created_at=self._created_at,
            updated_at=None,  # DB側で更新
            version=new_version
        )
    
    def update_level(self, level: QuestLevel) -> 'Quest':
        """クエストレベルを更新した新しいインスタンスを返す"""
        new_version = Version(self._version.value + 1)
        return Quest(
            id=self._id,
            title=self._title,
            description=self._description,
            level=level,
            created_at=self._created_at,
            updated_at=None,  # DB側で更新
            version=new_version
        )
    
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