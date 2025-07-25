

from dataclasses import dataclass
from aqapi.core.domain.value_object.base_value_object import BaseValueObject

@dataclass
class QuestCategoryId(BaseValueObject):
    """クエストカテゴリID"""
    
    _value: int

    def __init__(self, value: int):
        self._value = value
        super().__init__()

    def _validate(self) -> None:
        if not isinstance(self._value, int) or self._value <= 0:
            raise ValueError("QuestCategoryIdは正の整数でなければなりません。")
