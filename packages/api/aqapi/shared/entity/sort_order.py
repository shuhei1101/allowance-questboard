from dataclasses import dataclass
from typing import override

from aqapi.core.domain.value_object.base_value_object import BaseValueObject
from aqapi.core.messages.locale_string import LocaleString


@dataclass
class SortOrder(BaseValueObject):
    """ソート順序の値オブジェクト"""
    
    _value: int

    def __init__(self, value: int):
        super().__init__(value)

    def _validate(self) -> None:
        self._validator.required()
        self._validator.integer()

    @property
    @override
    def _value_name(self) -> LocaleString:
        return LocaleString(
            ja="ソート順序",
            en="Sort Order"
        )
