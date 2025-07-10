from dataclasses import dataclass
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


@dataclass
class QuestLevel(BaseValueObject):
    """クエストレベルの値オブジェクト"""
    
    value: int
    
    def __init__(self, value: int):
        self.value = value
        super().__init__()
    
    def _validate(self) -> None:
        if not isinstance(self.value, int):
            raise ValueError("クエストレベルは整数で設定してください。")
        if self.value < 0 or self.value > 10:
            raise ValueError("クエストレベルは0から10の範囲で設定してください。")
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestLevel):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return str(self.value)