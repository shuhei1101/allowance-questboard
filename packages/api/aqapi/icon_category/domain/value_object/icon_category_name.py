from dataclasses import dataclass

from aqapi.core.domain.value_object.base_value_object import BaseValueObject
from aqapi.language.domain.language_type import LanguageType
from aqapi.core.domain.base_collection import BaseCollectionItem


@dataclass
class IconCategoryName(BaseValueObject, BaseCollectionItem[LanguageType]):
    _language: LanguageType
    _value: str

    def __init__(self, language: LanguageType, value: str,):
        self._language = language
        self._value = value
        super().__init__()

    def _validate(self) -> None:
        if not isinstance(self._value, str) or not self._value.strip():
            raise ValueError("IconCategoryNameは空文字であってはなりません。")
        
    @property
    def id(self) -> LanguageType:
        """言語タイプをIDとして返す"""
        return self._language
