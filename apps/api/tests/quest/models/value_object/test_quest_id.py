import pytest
from aqapi.quest.models.value_object.quest_id import QuestId


class TestQuestId:
    """QuestIdの単体テスト"""
    
    def test_正常な値でQuestIdが作成できること(self):
        # 準備
        test_id = 123
        
        # 実行
        quest_id = QuestId(test_id)
        
        # 検証
        assert quest_id.value == test_id
    
    def test_Noneを指定した場合QuestIdが作成できること(self):
        # 実行
        quest_id = QuestId(None)
        
        # 検証
        assert quest_id.value is None
    
    def test_負の値の場合ValueError例外が発生すること(self):
        # 実行・検証
        with pytest.raises(ValueError, match="クエストIDは正の整数である必要があります。"):
            QuestId(-1)
    
    def test_ゼロの場合ValueError例外が発生すること(self):
        # 実行・検証
        with pytest.raises(ValueError, match="クエストIDは正の整数である必要があります。"):
            QuestId(0)
    
    def test_同じIDのQuestIdが等価になること(self):
        # 準備
        test_id = 123
        quest_id1 = QuestId(test_id)
        quest_id2 = QuestId(test_id)
        
        # 実行・検証
        assert quest_id1 == quest_id2
    
    def test_異なるIDのQuestIdが非等価になること(self):
        # 準備
        quest_id1 = QuestId(123)
        quest_id2 = QuestId(456)
        
        # 実行・検証
        assert quest_id1 != quest_id2
    
    def test_文字列表現が正しく返されること(self):
        # 準備
        test_id = 123
        quest_id = QuestId(test_id)
        
        # 実行
        result = str(quest_id)
        
        # 検証
        assert result == "123"
    
    def test_None値の文字列表現が正しく返されること(self):
        # 準備
        quest_id = QuestId(None)
        
        # 実行
        result = str(quest_id)
        
        # 検証
        assert result == "None"