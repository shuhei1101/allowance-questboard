from dataclasses import dataclass

from aqapi.core.domain.value_object.base_value_object import BaseValueObject

from aqapi.core.domain.value_object.base_id import BaseId


class LanguageId(BaseId):
    """言語IDの値オブジェクト"""
    def __init__(self, value: int):
        super().__init__(value)
