from dataclasses import dataclass
from typing import Optional
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


@dataclass
class QuestId(BaseValueObject):
    """クエストIDの値オブジェクト"""
    
    value: Optional[int]
    
    def __init__(self, value: Optional[int]):
        self.value = value
        super().__init__()
    
    def _validate(self) -> None:
        if self.value is not None and (not isinstance(self.value, int) or self.value < 1):
            raise ValueError("クエストIDは正の整数である必要があります。")
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestId):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return str(self.value) if self.value is not None else "None"