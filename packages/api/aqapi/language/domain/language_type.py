from aqapi.language.domain.value_object.language_type_value import LanguageTypeValue
from aqapi.language.domain.value_object.language_id import LanguageId
from aqapi.core.enum.domain.base_enum import BaseEnum
from aqapi.core.enum.domain.enum_mixin import EnumMixin
from aqapi.language.entity.languages_entity import LanguagesEntity

class LanguageType(EnumMixin[LanguagesEntity], BaseEnum):
    """言語の種類"""

    JAPANESE = LanguageTypeValue(LanguageId(1))
    ENGLISH = LanguageTypeValue(LanguageId(2))
