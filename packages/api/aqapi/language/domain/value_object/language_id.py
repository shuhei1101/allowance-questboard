from dataclasses import dataclass
from typing import TYPE_CHECKING, override

from aqapi.core.domain.value_object.base_id import BaseId
from aqapi.core.messages.locale_string import LocaleString


class LanguageId(BaseId):
    """言語IDの値オブジェクト"""
    def __init__(self, value: int):
        super().__init__(value)

    @property
    @override
    def _value_name(self) -> LocaleString:
        return LocaleString(
            ja="言語ID",
            en="Language ID"
        )
