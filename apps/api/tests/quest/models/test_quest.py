import pytest
from datetime import datetime, UTC
from aqapi.quest.models.quest import Quest
from aqapi.quest.models.value_object.quest_id import QuestId
from aqapi.quest.models.value_object.quest_title import QuestTitle
from aqapi.quest.models.value_object.quest_description import QuestDescription
from aqapi.quest.models.value_object.quest_level import QuestLevel
from aqapi.core.domain.value_object.version import Version


class TestQuest:
    """Questドメインモデルの単体テスト"""
    
    class Test___init__:
        """__init__メソッドのテスト"""
        
        def test_正常な値でQuestが作成できること(self):
            # 準備
            quest_id = QuestId(123)
            title = QuestTitle("テストクエスト")
            description = QuestDescription("テスト用のクエスト詳細")
            level = QuestLevel(5)
            created_at = datetime.now(UTC)
            updated_at = datetime.now(UTC)
            version = Version(1)
            
            # 実行
            quest = Quest(quest_id, title, description, level, created_at, updated_at, version)
            
            # 検証
            assert quest._id == quest_id
            assert quest._title == title
            assert quest._description == description
            assert quest._level == level
            assert quest._created_at == created_at
            assert quest._updated_at == updated_at
            assert quest.version() == version
    
    class Test_create_new:
        """create_newメソッドのテスト"""
        
        def test_create_newで新しいクエストが作成できること(self):
            # 準備
            title = QuestTitle("新しいクエスト")
            description = QuestDescription("新しいクエストの詳細")
            level = QuestLevel(3)
            
            # 実行
            quest = Quest.create_new(title, description, level)
            
            # 検証
            assert quest._title == title
            assert quest._description == description
            assert quest._level == level
            assert quest.version().value == 1
            assert quest._id.value is None  # DB側で自動採番
            assert quest._created_at is None  # DB側で設定
            assert quest._updated_at is None  # DB側で設定
    
    class Test_update_title:
        """update_titleメソッドのテスト"""
        
        def test_update_titleでタイトルが更新されること(self):
            # 準備
            quest = Quest.create_new(
                QuestTitle("元のタイトル"),
                QuestDescription("詳細"),
                QuestLevel(1)
            )
            original_version = quest.version().value
            new_title = QuestTitle("新しいタイトル")
            
            # 実行
            quest.update_title(new_title)
            
            # 検証
            assert quest._title == new_title
            assert quest.version().value == original_version + 1
    
    class Test_update_description:
        """update_descriptionメソッドのテスト"""
        
        def test_update_descriptionで詳細が更新されること(self):
            # 準備
            quest = Quest.create_new(
                QuestTitle("タイトル"),
                QuestDescription("元の詳細"),
                QuestLevel(1)
            )
            original_version = quest.version().value
            new_description = QuestDescription("新しい詳細")
            
            # 実行
            quest.update_description(new_description)
            
            # 検証
            assert quest._description == new_description
            assert quest.version().value == original_version + 1
    
    class Test_update_level:
        """update_levelメソッドのテスト"""
        
        def test_update_levelでレベルが更新されること(self):
            # 準備
            quest = Quest.create_new(
                QuestTitle("タイトル"),
                QuestDescription("詳細"),
                QuestLevel(1)
            )
            original_version = quest.version().value
            new_level = QuestLevel(8)
            
            # 実行
            quest.update_level(new_level)
            
            # 検証
            assert quest._level == new_level
            assert quest.version().value == original_version + 1