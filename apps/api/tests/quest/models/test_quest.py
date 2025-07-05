import pytest
from datetime import datetime, UTC
from uuid import uuid4
from aqapi.quest.models.quest import Quest
from aqapi.quest.models.value_object.quest_id import QuestId
from aqapi.quest.models.value_object.quest_title import QuestTitle
from aqapi.quest.models.value_object.quest_description import QuestDescription
from aqapi.quest.models.value_object.quest_level import QuestLevel
from aqapi.core.domain.value_object.version import Version


class TestQuest:
    """Questドメインモデルの単体テスト"""
    
    def test_正常な値でQuestが作成できること(self):
        # Arrange
        quest_id = QuestId(uuid4())
        title = QuestTitle("テストクエスト")
        description = QuestDescription("テスト用のクエスト詳細")
        level = QuestLevel(5)
        created_at = datetime.now(UTC)
        updated_at = datetime.now(UTC)
        version = Version(1)
        
        # Act
        quest = Quest(quest_id, title, description, level, created_at, updated_at, version)
        
        # Assert
        assert quest.id == quest_id
        assert quest.title == title
        assert quest.description == description
        assert quest.level == level
        assert quest.created_at == created_at
        assert quest.updated_at == updated_at
        assert quest.version() == version
    
    def test_create_newで新しいクエストが作成できること(self):
        # Arrange
        title = QuestTitle("新しいクエスト")
        description = QuestDescription("新しいクエストの詳細")
        level = QuestLevel(3)
        
        # Act
        quest = Quest.create_new(title, description, level)
        
        # Assert
        assert quest.title == title
        assert quest.description == description
        assert quest.level == level
        assert quest.version().value == 1
        assert quest.id is not None
        assert quest.created_at is not None
        assert quest.updated_at is not None
    
    def test_update_titleでタイトルが更新されること(self):
        # Arrange
        quest = Quest.create_new(
            QuestTitle("元のタイトル"),
            QuestDescription("詳細"),
            QuestLevel(1)
        )
        original_version = quest.version().value
        original_updated_at = quest.updated_at
        new_title = QuestTitle("新しいタイトル")
        
        # Act
        quest.update_title(new_title)
        
        # Assert
        assert quest.title == new_title
        assert quest.version().value == original_version + 1
        assert quest.updated_at > original_updated_at
    
    def test_update_descriptionで詳細が更新されること(self):
        # Arrange
        quest = Quest.create_new(
            QuestTitle("タイトル"),
            QuestDescription("元の詳細"),
            QuestLevel(1)
        )
        original_version = quest.version().value
        new_description = QuestDescription("新しい詳細")
        
        # Act
        quest.update_description(new_description)
        
        # Assert
        assert quest.description == new_description
        assert quest.version().value == original_version + 1
    
    def test_update_levelでレベルが更新されること(self):
        # Arrange
        quest = Quest.create_new(
            QuestTitle("タイトル"),
            QuestDescription("詳細"),
            QuestLevel(1)
        )
        original_version = quest.version().value
        new_level = QuestLevel(8)
        
        # Act
        quest.update_level(new_level)
        
        # Assert
        assert quest.level == new_level
        assert quest.version().value == original_version + 1