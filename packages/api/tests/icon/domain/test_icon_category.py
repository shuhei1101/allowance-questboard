import pytest
from aqapi.icon.domain.icon_category import IconCategory
from aqapi.icon.domain.value_object.icon_category_id import IconCategoryId
from aqapi.icon.domain.value_object.icon_category_value import IconCategoryValue
from aqapi.icon.entity.icon_categories_entity import IconCategoriesEntity


class TestIconCategory:
    """IconCategoryドメインモデルの単体テスト"""
    
    class Test_Enum値の定義:
        """Enum値の定義のテスト"""
        
        def test_ACTIONが正しく定義されていること(self):
            # 準備・実行
            action = IconCategory.ACTION
            
            # 検証
            assert isinstance(action.value, IconCategoryValue)
            assert action.value._id._value == 1
        
        def test_NAVIGATIONが正しく定義されていること(self):
            # 準備・実行
            navigation = IconCategory.NAVIGATION
            
            # 検証
            assert isinstance(navigation.value, IconCategoryValue)
            assert navigation.value._id._value == 2
        
        def test_COMMUNICATIONが正しく定義されていること(self):
            # 準備・実行
            communication = IconCategory.COMMUNICATION
            
            # 検証
            assert isinstance(communication.value, IconCategoryValue)
            assert communication.value._id._value == 3
        
        def test_全てのEnum値が取得できること(self):
            # 準備・実行
            all_categories = list(IconCategory)
            
            # 検証
            assert len(all_categories) == 3
            assert IconCategory.ACTION in all_categories
            assert IconCategory.NAVIGATION in all_categories
            assert IconCategory.COMMUNICATION in all_categories
    
    class Test__id_type:
        """_id_typeのテスト"""
        
        def test_id_typeがIconCategoryIdに設定されていること(self):
            # 準備・実行・検証
            assert IconCategory._id_type == IconCategoryId
    
    class Test_from_entities:
        """from_entitiesメソッドのテスト"""
        
        def test_空のエンティティリストでも正常に動作すること(self):
            # 準備
            entities = []
            
            # 実行・検証（例外が発生しないことを確認）
            IconCategory.from_entities(entities)
