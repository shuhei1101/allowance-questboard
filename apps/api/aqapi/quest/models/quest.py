from dataclasses import dataclass
from datetime import datetime, UTC
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.quest.models.value_object.quest_id import QuestId
from aqapi.quest.models.value_object.quest_title import QuestTitle
from aqapi.quest.models.value_object.quest_description import QuestDescription
from aqapi.quest.models.value_object.quest_level import QuestLevel


@dataclass
class Quest(BaseModel):
    """クエストドメインモデル"""
    
    def __init__(
        self,
        id: QuestId,
        title: QuestTitle,
        description: QuestDescription,
        level: QuestLevel,
        created_at: datetime,
        updated_at: datetime,
        version: Version
    ):
        super().__init__(version)
        self._id = id
        self._title = title
        self._description = description
        self._level = level
        self._created_at = created_at
        self._updated_at = updated_at
    
    @property
    def id(self) -> QuestId:
        return self._id
    
    @property
    def title(self) -> QuestTitle:
        return self._title
    
    @property
    def description(self) -> QuestDescription:
        return self._description
    
    @property
    def level(self) -> QuestLevel:
        return self._level
    
    @property
    def created_at(self) -> datetime:
        return self._created_at
    
    @property
    def updated_at(self) -> datetime:
        return self._updated_at
    
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
    def create_new(
        cls,
        title: QuestTitle,
        description: QuestDescription,
        level: QuestLevel
    ) -> 'Quest':
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