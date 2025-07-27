from dataclasses import dataclass
from typing import override

from aqapi.core.domain.value_object.base_value_object import BaseValueObject
from aqapi.core.messages.locale_string import LocaleString


@dataclass
class LanguageName(BaseValueObject):
    """言語名の値オブジェクト"""
    
    _value: str

    def __init__(self, value: str):
        super().__init__(value)

    def _validate(self) -> None:
        self._validator.required()

    @property
    @override
    def _value_name(self) -> LocaleString:
        return LocaleString(
            ja="言語名",
            en="Language Name"
        )
