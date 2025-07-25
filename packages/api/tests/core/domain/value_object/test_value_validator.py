import pytest
from aqapi.core.domain.value_object.value_validator import ValueValidator, ValueValidateException


class TestValueValidator:
    
    class Test_validate_required:
        
        def setup_method(self):
            self.validator = ValueValidator("テストフィールド")
        
        def test_値が存在する場合は正常に通ること(self):
            # 準備
            value = "テスト"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_required(value)
        
        def test_値がNoneの場合は例外が発生すること(self):
            # 準備
            value = None
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_required(value)
            
            assert exc_info.value.error_type == "required"
            assert "テストフィールド" in exc_info.value.message
        
        def test_値が空文字の場合は例外が発生すること(self):
            # 準備
            value = ""
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_required(value)
            
            assert exc_info.value.error_type == "required"
        
        def test_値がスペースのみの場合は例外が発生すること(self):
            # 準備
            value = "   "
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_required(value)
            
            assert exc_info.value.error_type == "required"
        
        def test_カスタムメッセージが設定されること(self):
            # 準備
            value = None
            custom_message = "カスタムエラーメッセージ"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_required(value, option_message=custom_message)
            
            assert exc_info.value.message == custom_message
    
    class Test_validate_max_length:
        
        def setup_method(self):
            self.validator = ValueValidator("テストフィールド")
        
        def test_文字数が最大以下の場合は正常に通ること(self):
            # 準備
            value = "テスト"
            max_length = 5
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_max_length(value, max_length)
        
        def test_文字数が最大値と同じ場合は正常に通ること(self):
            # 準備
            value = "テスト"
            max_length = 3
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_max_length(value, max_length)
        
        def test_文字数が最大を超える場合は例外が発生すること(self):
            # 準備
            value = "テストメッセージ"
            max_length = 3
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_max_length(value, max_length)
            
            assert exc_info.value.error_type == "max_length"
    
    class Test_validate_min_length:
        
        def setup_method(self):
            self.validator = ValueValidator("テストフィールド")
        
        def test_文字数が最小以上の場合は正常に通ること(self):
            # 準備
            value = "テストメッセージ"
            min_length = 3
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_min_length(value, min_length)
        
        def test_文字数が最小値と同じ場合は正常に通ること(self):
            # 準備
            value = "テスト"
            min_length = 3
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_min_length(value, min_length)
        
        def test_文字数が最小を下回る場合は例外が発生すること(self):
            # 準備
            value = "a"
            min_length = 3
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_min_length(value, min_length)
            
            assert exc_info.value.error_type == "min_length"
    
    class Test_validate_alphanumeric:
        
        def setup_method(self):
            self.validator = ValueValidator("テストフィールド")
        
        def test_半角英数字のみの場合は正常に通ること(self):
            # 準備
            value = "test123"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_alphanumeric(value)
        
        def test_記号が含まれる場合は例外が発生すること(self):
            # 準備
            value = "test@123"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_alphanumeric(value)
            
            assert exc_info.value.error_type == "alphanumeric"
        
        def test_全角文字が含まれる場合は例外が発生すること(self):
            # 準備
            value = "testテスト"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_alphanumeric(value)
            
            assert exc_info.value.error_type == "alphanumeric"
    
    class Test_validate_email:
        
        def setup_method(self):
            self.validator = ValueValidator("メールアドレス")
        
        def test_正しいメールアドレス形式の場合は正常に通ること(self):
            # 準備
            value = "test@example.com"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_email(value)
        
        def test_アットマークがない場合は例外が発生すること(self):
            # 準備
            value = "testexample.com"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_email(value)
            
            assert exc_info.value.error_type == "email_format"
        
        def test_ドメインがない場合は例外が発生すること(self):
            # 準備
            value = "test@"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_email(value)
            
            assert exc_info.value.error_type == "email_format"
    
    class Test_validate_phone:
        
        def setup_method(self):
            self.validator = ValueValidator("電話番号")
        
        def test_正しい電話番号形式の場合は正常に通ること(self):
            # 準備
            value = "090-1234-5678"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_phone(value)
        
        def test_ハイフンがない場合は例外が発生すること(self):
            # 準備
            value = "09012345678"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_phone(value)
            
            assert exc_info.value.error_type == "phone_format"
    
    class Test_validate_numeric:
        
        def setup_method(self):
            self.validator = ValueValidator("数値")
        
        def test_数値の場合は正常に通ること(self):
            # 準備
            value = "123.45"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_numeric(value)
        
        def test_整数の場合は正常に通ること(self):
            # 準備
            value = 123
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_numeric(value)
        
        def test_文字が含まれる場合は例外が発生すること(self):
            # 準備
            value = "abc"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_numeric(value)
            
            assert exc_info.value.error_type == "numeric_format"
    
    class Test_validate_integer:
        
        def setup_method(self):
            self.validator = ValueValidator("整数")
        
        def test_整数の場合は正常に通ること(self):
            # 準備
            value = "123"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_integer(value)
        
        def test_小数点が含まれる場合は例外が発生すること(self):
            # 準備
            value = "123.45"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_integer(value)
            
            assert exc_info.value.error_type == "integer_format"
    
    class Test_validate_range:
        
        def setup_method(self):
            self.validator = ValueValidator("値")
        
        def test_範囲内の値の場合は正常に通ること(self):
            # 準備
            value = 50
            min_value = 0
            max_value = 100
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_range(value, min_value, max_value)
        
        def test_範囲の境界値の場合は正常に通ること(self):
            # 準備
            value = 0
            min_value = 0
            max_value = 100
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_range(value, min_value, max_value)
        
        def test_範囲外の値の場合は例外が発生すること(self):
            # 準備
            value = 150
            min_value = 0
            max_value = 100
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_range(value, min_value, max_value)
            
            assert exc_info.value.error_type == "range_value"
    
    class Test_validate_password_strength:
        
        def setup_method(self):
            self.validator = ValueValidator("パスワード")
        
        def test_強いパスワードの場合は正常に通ること(self):
            # 準備
            value = "SecurePass123!"
            
            # 実行・検証（例外が発生しない）
            self.validator.validate_password_strength(value)
        
        def test_短すぎるパスワードの場合は例外が発生すること(self):
            # 準備
            value = "Pass1!"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_password_strength(value)
            
            assert exc_info.value.error_type == "password_length"
        
        def test_英字が含まれていない場合は例外が発生すること(self):
            # 準備
            value = "12345678!"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_password_strength(value)
            
            assert exc_info.value.error_type == "password_contains_alpha"
        
        def test_数字が含まれていない場合は例外が発生すること(self):
            # 準備
            value = "Password!"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_password_strength(value)
            
            assert exc_info.value.error_type == "password_contains_digit"
        
        def test_記号が含まれていない場合は例外が発生すること(self):
            # 準備
            value = "Password123"
            
            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                self.validator.validate_password_strength(value)
            
            assert exc_info.value.error_type == "password_contains_symbol"
