import pytest
from uuid import UUID, uuid4
from aqapi.quest.models.value_object.quest_id import QuestId


class TestQuestId:
    """QuestIdの単体テスト"""
    
    def test_正常な値でQuestIdが作成できること(self):
        # Arrange
        test_uuid = uuid4()
        
        # Act
        quest_id = QuestId(test_uuid)
        
        # Assert
        assert quest_id.value == test_uuid
    
    def test_Noneを指定した場合ValueError例外が発生すること(self):
        # Act & Assert
        with pytest.raises(ValueError, match="クエストIDは必須です。"):
            QuestId(None)
    
    def test_同じUUIDのQuestIdが等価になること(self):
        # Arrange
        test_uuid = uuid4()
        quest_id1 = QuestId(test_uuid)
        quest_id2 = QuestId(test_uuid)
        
        # Act & Assert
        assert quest_id1 == quest_id2
    
    def test_異なるUUIDのQuestIdが非等価になること(self):
        # Arrange
        quest_id1 = QuestId(uuid4())
        quest_id2 = QuestId(uuid4())
        
        # Act & Assert
        assert quest_id1 != quest_id2
    
    def test_文字列表現が正しく返されること(self):
        # Arrange
        test_uuid = uuid4()
        quest_id = QuestId(test_uuid)
        
        # Act
        result = str(quest_id)
        
        # Assert
        assert result == str(test_uuid)