from dataclasses import dataclass
from typing import Any, Optional
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
    
    @classmethod
    def from_raw(cls, raw_value: Any) -> 'QuestId':
        """生の値からQuestIdを作成する"""
        if raw_value is None:
            return cls(None)
        elif isinstance(raw_value, int):
            return cls(raw_value)
        elif isinstance(raw_value, str) and raw_value.isdigit():
            return cls(int(raw_value))
        else:
            raise ValueError("QuestIdの生データは整数、数値文字列、またはNoneである必要があります。")
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestId):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return str(self.value) if self.value is not None else "None"