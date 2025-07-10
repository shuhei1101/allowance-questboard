import pytest
from aqapi.quest.model.value_object.quest_description import QuestDescription


class TestQuestDescription:
    """QuestDescriptionの単体テスト"""
    
    def test_正常な値でQuestDescriptionが作成できること(self):
        # Arrange
        test_description = "テスト用のクエスト詳細"
        
        # Act
        quest_description = QuestDescription(test_description)
        
        # Assert
        assert quest_description.value == test_description
    
    def test_Noneを指定した場合QuestDescriptionが作成できること(self):
        # Act
        quest_description = QuestDescription(None)
        
        # Assert
        assert quest_description.value is None
    
    def test_1001文字の場合ValueError例外が発生すること(self):
        # Arrange
        long_description = "a" * 1001
        
        # Act & Assert
        with pytest.raises(ValueError, match="クエスト詳細は1000文字以内で設定してください。"):
            QuestDescription(long_description)
    
    def test_1000文字の場合QuestDescriptionが作成できること(self):
        # Arrange
        max_description = "a" * 1000
        
        # Act
        quest_description = QuestDescription(max_description)
        
        # Assert
        assert quest_description.value == max_description
    
    def test_前後の空白が除去されること(self):
        # Arrange
        description_with_spaces = "  テスト詳細  "
        
        # Act
        quest_description = QuestDescription(description_with_spaces)
        
        # Assert
        assert quest_description.value == "テスト詳細"
    
    def test_同じ値のQuestDescriptionが等価になること(self):
        # Arrange
        test_description = "同じ詳細"
        quest_description1 = QuestDescription(test_description)
        quest_description2 = QuestDescription(test_description)
        
        # Act & Assert
        assert quest_description1 == quest_description2
    
    def test_異なる値のQuestDescriptionが非等価になること(self):
        # Arrange
        quest_description1 = QuestDescription("詳細1")
        quest_description2 = QuestDescription("詳細2")
        
        # Act & Assert
        assert quest_description1 != quest_description2
    
    def test_文字列表現が正しく返されること(self):
        # Arrange
        test_description = "テスト詳細"
        quest_description = QuestDescription(test_description)
        
        # Act
        result = str(quest_description)
        
        # Assert
        assert result == test_description
