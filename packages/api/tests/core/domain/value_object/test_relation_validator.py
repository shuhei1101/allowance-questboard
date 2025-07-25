import pytest
from datetime import datetime, date
from aqapi.core.domain.value_object.relation_validator import RelationValidator, RelationValidateException


class TestRelationValidator:
    
    class Test_validate_confirmation:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_値が一致する場合は正常に通ること(self):
            # 準備
            value = "password123"
            confirmation_value = "password123"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_confirmation(value, confirmation_value)
        
        def test_値が一致しない場合は例外が発生すること(self):
            # 準備
            value = "password123"
            confirmation_value = "password456"
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_confirmation(value, confirmation_value)
            
            assert exc_info.value.error_type == "confirmation_mismatch"
        
        def test_カスタムメッセージが設定されること(self):
            # 準備
            value = "password123"
            confirmation_value = "password456"
            custom_message = "カスタムエラーメッセージ"
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_confirmation(value, confirmation_value, option_message=custom_message)
            
            assert exc_info.value.message == custom_message
    
    class Test_validate_date_range:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_開始日が終了日より前の場合は正常に通ること(self):
            # 準備
            start_date = date(2023, 1, 1)
            end_date = date(2023, 12, 31)
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_date_range(start_date, end_date)
        
        def test_開始日と終了日が同じ場合は正常に通ること(self):
            # 準備
            start_date = date(2023, 1, 1)
            end_date = date(2023, 1, 1)
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_date_range(start_date, end_date)
        
        def test_開始日が終了日より後の場合は例外が発生すること(self):
            # 準備
            start_date = date(2023, 12, 31)
            end_date = date(2023, 1, 1)
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_date_range(start_date, end_date)
            
            assert exc_info.value.error_type == "date_range_invalid"
    
    class Test_validate_datetime_range:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_開始日時が終了日時より前の場合は正常に通ること(self):
            # 準備
            start_datetime = datetime(2023, 1, 1, 9, 0, 0)
            end_datetime = datetime(2023, 1, 1, 17, 0, 0)
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_datetime_range(start_datetime, end_datetime)
        
        def test_開始日時が終了日時より後の場合は例外が発生すること(self):
            # 準備
            start_datetime = datetime(2023, 1, 1, 17, 0, 0)
            end_datetime = datetime(2023, 1, 1, 9, 0, 0)
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_datetime_range(start_datetime, end_datetime)
            
            assert exc_info.value.error_type == "datetime_range_invalid"
    
    class Test_validate_greater_than:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_値が比較値より大きい場合は正常に通ること(self):
            # 準備
            value = 100
            compare_value = 50
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_greater_than(value, compare_value)
        
        def test_値が比較値と同じ場合は例外が発生すること(self):
            # 準備
            value = 50
            compare_value = 50
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_greater_than(value, compare_value)
            
            assert exc_info.value.error_type == "greater_than_invalid"
        
        def test_値が比較値より小さい場合は例外が発生すること(self):
            # 準備
            value = 30
            compare_value = 50
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_greater_than(value, compare_value)
            
            assert exc_info.value.error_type == "greater_than_invalid"
    
    class Test_validate_greater_than_or_equal:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_値が比較値より大きい場合は正常に通ること(self):
            # 準備
            value = 100
            compare_value = 50
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_greater_than_or_equal(value, compare_value)
        
        def test_値が比較値と同じ場合は正常に通ること(self):
            # 準備
            value = 50
            compare_value = 50
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_greater_than_or_equal(value, compare_value)
        
        def test_値が比較値より小さい場合は例外が発生すること(self):
            # 準備
            value = 30
            compare_value = 50
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_greater_than_or_equal(value, compare_value)
            
            assert exc_info.value.error_type == "greater_than_or_equal_invalid"
    
    class Test_validate_age_consistency:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_年齢と生年月日が一致する場合は正常に通ること(self):
            # 準備
            birth_date = date(2000, 1, 1)
            age = 25  # 2025年基準
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_age_consistency(birth_date, age)
        
        def test_年齢と生年月日が一致しない場合は例外が発生すること(self):
            # 準備
            birth_date = date(2000, 1, 1)
            age = 23  # 実際は25歳なのに23歳と入力
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_age_consistency(birth_date, age)
            
            assert exc_info.value.error_type == "age_consistency_invalid"
    
    class Test_validate_dependency:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_両方ともNoneの場合は正常に通ること(self):
            # 準備
            dependent_value = None
            required_value = None
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_dependency(dependent_value, required_value)
        
        def test_依存値がNoneで必須値が設定されている場合は正常に通ること(self):
            # 準備
            dependent_value = None
            required_value = "設定値"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_dependency(dependent_value, required_value)
        
        def test_両方とも設定されている場合は正常に通ること(self):
            # 準備
            dependent_value = "設定値"
            required_value = "必須値"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_dependency(dependent_value, required_value)
        
        def test_依存値が設定されているが必須値がNoneの場合は例外が発生すること(self):
            # 準備
            dependent_value = "設定値"
            required_value = None
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_dependency(dependent_value, required_value)
            
            assert exc_info.value.error_type == "dependency_invalid"
    
    class Test_validate_mutual_exclusion:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_どちらもNoneの場合は正常に通ること(self):
            # 準備
            value1 = None
            value2 = None
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_mutual_exclusion(value1, value2)
        
        def test_片方のみ設定されている場合は正常に通ること(self):
            # 準備
            value1 = "設定値"
            value2 = None
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_mutual_exclusion(value1, value2)
        
        def test_両方とも設定されている場合は例外が発生すること(self):
            # 準備
            value1 = "設定値1"
            value2 = "設定値2"
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_mutual_exclusion(value1, value2)
            
            assert exc_info.value.error_type == "mutual_exclusion_invalid"
    
    class Test_validate_quantity_consistency:
        
        def setup_method(self):
            self.validator = RelationValidator()
        
        def test_合計と内訳が一致する場合は正常に通ること(self):
            # 準備
            total = 100
            parts = [30, 40, 30]
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_quantity_consistency(total, *parts)
        
        def test_合計と内訳が一致しない場合は例外が発生すること(self):
            # 準備
            total = 100
            parts = [30, 40, 40]  # 合計110になる
            
            # 実行・検証
            with pytest.raises(RelationValidateException) as exc_info:
                self.validator.validate_quantity_consistency(total, *parts)
            
            assert exc_info.value.error_type == "quantity_consistency_invalid"
