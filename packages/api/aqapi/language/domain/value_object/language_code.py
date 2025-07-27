from dataclasses import dataclass
from typing import override

from aqapi.core.domain.value_object.base_value_object import BaseValueObject
from aqapi.core.messages.locale_string import LocaleString

@dataclass
class LanguageCode(BaseValueObject[str]):
    """言語コードの値オブジェクト"""
    
    _value: str

    def __init__(self, value: str):
        super().__init__(value)

    def _validate(self) -> None:
        self._validator.required()

    @property
    @override
    def _value_name(self) -> LocaleString:
        return LocaleString(
            ja="言語コード",
            en="Language Code"
        )
