from dataclasses import dataclass

from aqapi.core.domain.value_object.base_value_object import BaseValueObject


@dataclass
class LanguageName(BaseValueObject):
    """言語名の値オブジェクト"""
    
    _value: str

    def __init__(self, value: str):
        self._value = value
        super().__init__()

    def _validate(self) -> None:
        if not isinstance(self._value, str) or not self._value.strip():
            raise ValueError("LanguageNameは空文字であってはなりません。")
