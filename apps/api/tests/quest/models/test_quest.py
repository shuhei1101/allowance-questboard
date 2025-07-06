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
        assert quest._id == quest_id
        assert quest._title == title
        assert quest._description == description
        assert quest._level == level
        assert quest._created_at == created_at
        assert quest._updated_at == updated_at
        assert quest.version() == version
    
    def test_create_newで新しいクエストが作成できること(self):
        # Arrange
        title = QuestTitle("新しいクエスト")
        description = QuestDescription("新しいクエストの詳細")
        level = QuestLevel(3)
        
        # Act
        quest = Quest.create_new(title, description, level)
        
        # Assert
        assert quest._title == title
        assert quest._description == description
        assert quest._level == level
        assert quest.version().value == 1
        assert quest._id is not None
        assert quest._created_at is not None
        assert quest._updated_at is not None
    
    def test_update_titleでタイトルが更新されること(self):
        # Arrange
        quest = Quest.create_new(
            QuestTitle("元のタイトル"),
            QuestDescription("詳細"),
            QuestLevel(1)
        )
        original_version = quest.version().value
        original_updated_at = quest._updated_at
        new_title = QuestTitle("新しいタイトル")
        
        # Act
        quest.update_title(new_title)
        
        # Assert
        assert quest._title == new_title
        assert quest.version().value == original_version + 1
        assert quest._updated_at > original_updated_at
    
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
        assert quest._description == new_description
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
        assert quest._level == new_level
        assert quest.version().value == original_version + 1
    
    def test_from_rawで生データからクエストが作成できること(self):
        # Arrange
        raw_data = {
            'id': '550e8400-e29b-41d4-a716-446655440000',
            'title': 'テストクエスト',
            'description': 'テスト詳細',
            'level': 5,
            'created_at': '2024-01-01T00:00:00+00:00',
            'updated_at': '2024-01-01T00:00:00+00:00',
            'version': 1
        }
        
        # Act
        quest = Quest.from_raw(raw_data)
        
        # Assert
        assert quest._title.value == 'テストクエスト'
        assert quest._description.value == 'テスト詳細'
        assert quest._level.value == 5
        assert quest.version().value == 1
    
    def test_from_rawで不正なデータ型の場合ValueError例外が発生すること(self):
        # Arrange
        invalid_data = "invalid_data"
        
        # Act & Assert
        with pytest.raises(ValueError, match="Questの生データは辞書である必要があります。"):
            Quest.from_raw(invalid_data)