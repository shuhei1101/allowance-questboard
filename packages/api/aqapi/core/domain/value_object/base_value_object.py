from abc import abstractmethod
from typing import Generic, TypeVar
from aqapi.core.domain.value_object.value_validator import ValueValidator
from aqapi.core.messages.locale_string import LocaleString

ValueType = TypeVar('ValueType')

class BaseValueObject(Generic[ValueType]):
    """値オブジェクトの基底クラス"""
    
    def __init__(self, value: ValueType):
        self._value = value
        self._validator = ValueValidator(self._value_name, value)
        self._validate()
    
    @abstractmethod
    def _validate(self) -> None:
        """値オブジェクトの値を検証する"""
        raise NotImplementedError("Subclasses must implement this method.")

    @property
    @abstractmethod
    def _value_name(self) -> LocaleString:
        """値オブジェクトの名前を取得"""
        raise NotImplementedError("Subclasses must implement this method.")

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, BaseValueObject):
            return NotImplemented
        return self._value == other._value

    @property
    def value(self) -> ValueType:
        return self._value
