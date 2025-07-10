import pytest
from datetime import datetime, UTC
from aqapi.quest.models.family_quest import FamilyQuest
from aqapi.quest.models.shared_quest import SharedQuest
from aqapi.quest.models.template_quest import TemplateQuest
from aqapi.quest.models.value_object.quest_id import QuestId
from aqapi.core.domain.value_object.version import Version


class TestFamilyQuest:
    """FamilyQuestドメインモデルの単体テスト"""
    
    class Test___init__:
        """__init__メソッドのテスト"""
        
        def test_正常な値でFamilyQuestが作成できること(self):
            # 準備
            quest_id = QuestId(123)
            subclass_type = 1
            subclass_id = 1
            category_id = 1
            icon_id = 1
            age_from = 5
            age_to = 10
            has_published_month = False
            month_from = None
            month_to = None
            created_at = datetime.now(UTC)
            updated_at = datetime.now(UTC)
            version = Version(1)
            family_id = 1
            is_shared = False
            shared_quest_id = None
            
            # 実行
            quest = FamilyQuest(quest_id, subclass_type, subclass_id, category_id, icon_id, 
                               age_from, age_to, has_published_month, month_from, month_to, 
                               created_at, updated_at, version, family_id, is_shared, shared_quest_id)
            
            # 検証
            assert quest.id() == quest_id
            assert quest.subclass_type() == subclass_type
            assert quest.subclass_id() == subclass_id
            assert quest.category_id() == category_id
            assert quest.icon_id() == icon_id
            assert quest.age_from() == age_from
            assert quest.age_to() == age_to
            assert quest.has_published_month() == has_published_month
            assert quest.month_from() == month_from
            assert quest.month_to() == month_to
            assert quest.version() == version
            assert quest.family_id() == family_id
            assert quest.is_shared() == is_shared
            assert quest.shared_quest_id() == shared_quest_id
    
    class Test_create_new:
        """create_newメソッドのテスト"""
        
        def test_create_newで新しいFamilyQuestが作成できること(self):
            # 準備
            category_id = 1
            icon_id = 1
            age_from = 5
            age_to = 10
            has_published_month = False
            month_from = None
            month_to = None
            family_id = 1
            
            # 実行
            quest = FamilyQuest.create_new(category_id, icon_id, age_from, age_to, 
                                          has_published_month, month_from, month_to, family_id)
            
            # 検証
            assert quest.id().value is None  # DB側で自動採番
            assert quest.subclass_type() == 1  # 家族クエスト
            assert quest.category_id() == category_id
            assert quest.icon_id() == icon_id
            assert quest.age_from() == age_from
            assert quest.age_to() == age_to
            assert quest.has_published_month() == has_published_month
            assert quest.month_from() == month_from
            assert quest.month_to() == month_to
            assert quest.version().value == 1
            assert quest.family_id() == family_id
            assert quest.is_shared() == False
            assert quest.shared_quest_id() is None


class TestSharedQuest:
    """SharedQuestドメインモデルの単体テスト"""
    
    class Test___init__:
        """__init__メソッドのテスト"""
        
        def test_正常な値でSharedQuestが作成できること(self):
            # 準備
            quest_id = QuestId(123)
            subclass_type = 2
            subclass_id = 1
            category_id = 1
            icon_id = 1
            age_from = 5
            age_to = 10
            has_published_month = False
            month_from = None
            month_to = None
            created_at = datetime.now(UTC)
            updated_at = datetime.now(UTC)
            version = Version(1)
            shared_by = 1
            pinned_comment_id = None
            is_public = True
            shared_at = datetime.now(UTC)
            
            # 実行
            quest = SharedQuest(quest_id, subclass_type, subclass_id, category_id, icon_id, 
                               age_from, age_to, has_published_month, month_from, month_to, 
                               created_at, updated_at, version, shared_by, pinned_comment_id, 
                               is_public, shared_at)
            
            # 検証
            assert quest.id() == quest_id
            assert quest.subclass_type() == subclass_type
            assert quest.shared_by() == shared_by
            assert quest.pinned_comment_id() == pinned_comment_id
            assert quest.is_public() == is_public
            assert quest.shared_at() == shared_at
    
    class Test_create_new:
        """create_newメソッドのテスト"""
        
        def test_create_newで新しいSharedQuestが作成できること(self):
            # 準備
            category_id = 1
            icon_id = 1
            age_from = 5
            age_to = 10
            has_published_month = False
            month_from = None
            month_to = None
            shared_by = 1
            
            # 実行
            quest = SharedQuest.create_new(category_id, icon_id, age_from, age_to, 
                                          has_published_month, month_from, month_to, shared_by)
            
            # 検証
            assert quest.id().value is None  # DB側で自動採番
            assert quest.subclass_type() == 2  # 共有クエスト
            assert quest.shared_by() == shared_by
            assert quest.is_public() == True
            assert quest.pinned_comment_id() is None


class TestTemplateQuest:
    """TemplateQuestドメインモデルの単体テスト"""
    
    class Test___init__:
        """__init__メソッドのテスト"""
        
        def test_正常な値でTemplateQuestが作成できること(self):
            # 準備
            quest_id = QuestId(123)
            subclass_type = 3
            subclass_id = 1
            category_id = 1
            icon_id = 1
            age_from = 5
            age_to = 10
            has_published_month = False
            month_from = None
            month_to = None
            created_at = datetime.now(UTC)
            updated_at = datetime.now(UTC)
            version = Version(1)
            
            # 実行
            quest = TemplateQuest(quest_id, subclass_type, subclass_id, category_id, icon_id, 
                                 age_from, age_to, has_published_month, month_from, month_to, 
                                 created_at, updated_at, version)
            
            # 検証
            assert quest.id() == quest_id
            assert quest.subclass_type() == subclass_type
            assert quest.category_id() == category_id
    
    class Test_create_new:
        """create_newメソッドのテスト"""
        
        def test_create_newで新しいTemplateQuestが作成できること(self):
            # 準備
            category_id = 1
            icon_id = 1
            age_from = 5
            age_to = 10
            has_published_month = False
            month_from = None
            month_to = None
            
            # 実行
            quest = TemplateQuest.create_new(category_id, icon_id, age_from, age_to, 
                                           has_published_month, month_from, month_to)
            
            # 検証
            assert quest.id().value is None  # DB側で自動採番
            assert quest.subclass_type() == 3  # テンプレートクエスト