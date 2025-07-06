import pytest
from aqapi.quest.models.value_object.quest_level import QuestLevel


class TestQuestLevel:
    """QuestLevelの単体テスト"""
    
    def test_正常な値でQuestLevelが作成できること(self):
        # Arrange
        test_level = 5
        
        # Act
        quest_level = QuestLevel(test_level)
        
        # Assert
        assert quest_level.value == test_level
    
    def test_0でQuestLevelが作成できること(self):
        # Act
        quest_level = QuestLevel(0)
        
        # Assert
        assert quest_level.value == 0
    
    def test_10でQuestLevelが作成できること(self):
        # Act
        quest_level = QuestLevel(10)
        
        # Assert
        assert quest_level.value == 10
    
    def test_マイナス値の場合ValueError例外が発生すること(self):
        # Act & Assert
        with pytest.raises(ValueError, match="クエストレベルは0から10の範囲で設定してください。"):
            QuestLevel(-1)
    
    def test_11以上の場合ValueError例外が発生すること(self):
        # Act & Assert
        with pytest.raises(ValueError, match="クエストレベルは0から10の範囲で設定してください。"):
            QuestLevel(11)
    
    def test_非整数の場合ValueError例外が発生すること(self):
        # Act & Assert
        with pytest.raises(ValueError, match="クエストレベルは整数で設定してください。"):
            QuestLevel(5.5)
    
    def test_同じ値のQuestLevelが等価になること(self):
        # Arrange
        quest_level1 = QuestLevel(3)
        quest_level2 = QuestLevel(3)
        
        # Act & Assert
        assert quest_level1 == quest_level2
    
    def test_異なる値のQuestLevelが非等価になること(self):
        # Arrange
        quest_level1 = QuestLevel(3)
        quest_level2 = QuestLevel(5)
        
        # Act & Assert
        assert quest_level1 != quest_level2
    
    def test_文字列表現が正しく返されること(self):
        # Arrange
        test_level = 7
        quest_level = QuestLevel(test_level)
        
        # Act
        result = str(quest_level)
        
        # Assert
        assert result == str(test_level)
    
    def test_from_rawで整数からQuestLevelが作成できること(self):
        # Arrange
        level_int = 8
        
        # Act
        quest_level = QuestLevel.from_raw(level_int)
        
        # Assert
        assert quest_level.value == level_int
    
    def test_from_rawで数字文字列からQuestLevelが作成できること(self):
        # Arrange
        level_str = "6"
        
        # Act
        quest_level = QuestLevel.from_raw(level_str)
        
        # Assert
        assert quest_level.value == 6
    
    def test_from_rawで不正な型の場合ValueError例外が発生すること(self):
        # Arrange
        invalid_data = "invalid"
        
        # Act & Assert
        with pytest.raises(ValueError, match="QuestLevelの生データは整数または数字文字列である必要があります。"):
            QuestLevel.from_raw(invalid_data)
    
    def test_from_rawで非数字文字列の場合ValueError例外が発生すること(self):
        # Arrange
        invalid_data = "abc"
        
        # Act & Assert
        with pytest.raises(ValueError, match="QuestLevelの生データは整数または数字文字列である必要があります。"):
            QuestLevel.from_raw(invalid_data)