from dataclasses import dataclass

from aqapi.core.domain.value_object.base_value_object import BaseValueObject
from aqapi.language.domain.language_type import LanguageType
from aqapi.core.domain.base_collection import CollectionItemProtocol

@dataclass
class IconCategoryName(BaseValueObject, CollectionItemProtocol[LanguageType]):
    _language: LanguageType
    _value: str

    def __init__(self, language: LanguageType, value: str,):
        self._language = language
        super().__init__(value)

    def _validate(self) -> None:
        if not isinstance(self._value, str) or not self._value.strip():
            raise ValueError("IconCategoryNameは空文字であってはなりません。")
        
    @property
    def id(self) -> LanguageType:
        """言語タイプをIDとして返す"""
        return self._language
