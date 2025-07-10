import pytest
from abc import ABC
from typing import Any
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


class ConcreteValueObject(BaseValueObject):
    """テスト用の具象値オブジェクト"""
    
    def __init__(self, value: Any):
        self.value = value
        super().__init__()
    
    def _validate(self) -> None:
        if self.value is None:
            raise ValueError("値は必須です。")


class InvalidValueObject(BaseValueObject):
    """テスト用の無効な値オブジェクト（validateで例外発生）"""
    
    def __init__(self, value: Any):
        self.value = value
        super().__init__()
    
    def _validate(self) -> None:
        raise ValueError("常に無効です。")


class TestBaseValueObject:
    """BaseValueObjectクラスのテスト"""
    
    def test_正常な値で値オブジェクトが作成できること(self):
        # Arrange & Act
        value_object = ConcreteValueObject("test_value")
        
        # Assert
        assert value_object.value == "test_value"
    
    def test_コンストラクタでvalidateが実行されること(self):
        # Arrange & Act & Assert
        with pytest.raises(ValueError, match="値は必須です。"):
            ConcreteValueObject(None)
    
    def test_validateで例外が発生した場合オブジェクト作成が失敗すること(self):
        # Arrange & Act & Assert
        with pytest.raises(ValueError, match="常に無効です。"):
            InvalidValueObject("any_value")
    
    def test_BaseValueObjectは抽象クラスであること(self):
        # Assert
        assert issubclass(BaseValueObject, ABC)
        assert hasattr(BaseValueObject, '__abstractmethods__')
        assert '_validate' in BaseValueObject.__abstractmethods__