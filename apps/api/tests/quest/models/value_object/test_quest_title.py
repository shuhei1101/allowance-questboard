import pytest
from aqapi.quest.models.value_object.quest_title import QuestTitle


class TestQuestTitle:
    """QuestTitleの単体テスト"""
    
    def test_正常な値でQuestTitleが作成できること(self):
        # Arrange
        test_title = "テストクエスト"
        
        # Act
        quest_title = QuestTitle(test_title)
        
        # Assert
        assert quest_title.value == test_title
    
    def test_空文字を指定した場合ValueError例外が発生すること(self):
        # Act & Assert
        with pytest.raises(ValueError, match="クエスト名は必須です。"):
            QuestTitle("")
    
    def test_空白のみを指定した場合ValueError例外が発生すること(self):
        # Act & Assert
        with pytest.raises(ValueError, match="クエスト名は必須です。"):
            QuestTitle("   ")
    
    def test_101文字の場合ValueError例外が発生すること(self):
        # Arrange
        long_title = "a" * 101
        
        # Act & Assert
        with pytest.raises(ValueError, match="クエスト名は100文字以内で設定してください。"):
            QuestTitle(long_title)
    
    def test_前後の空白が除去されること(self):
        # Arrange
        title_with_spaces = "  テストクエスト  "
        
        # Act
        quest_title = QuestTitle(title_with_spaces)
        
        # Assert
        assert quest_title.value == "テストクエスト"
    
    def test_同じ値のQuestTitleが等価になること(self):
        # Arrange
        quest_title1 = QuestTitle("テストクエスト")
        quest_title2 = QuestTitle("テストクエスト")
        
        # Act & Assert
        assert quest_title1 == quest_title2
    
    def test_異なる値のQuestTitleが非等価になること(self):
        # Arrange
        quest_title1 = QuestTitle("テストクエスト1")
        quest_title2 = QuestTitle("テストクエスト2")
        
        # Act & Assert
        assert quest_title1 != quest_title2
    
    def test_文字列表現が正しく返されること(self):
        # Arrange
        test_title = "テストクエスト"
        quest_title = QuestTitle(test_title)
        
        # Act
        result = str(quest_title)
        
        # Assert
        assert result == test_title
    
    def test_from_rawで文字列からQuestTitleが作成できること(self):
        # Arrange
        title_str = "from_rawテスト"
        
        # Act
        quest_title = QuestTitle.from_raw(title_str)
        
        # Assert
        assert quest_title.value == title_str
    
    def test_from_rawで不正な型の場合ValueError例外が発生すること(self):
        # Arrange
        invalid_data = 123
        
        # Act & Assert
        with pytest.raises(ValueError, match="QuestTitleの生データは文字列である必要があります。"):
            QuestTitle.from_raw(invalid_data)