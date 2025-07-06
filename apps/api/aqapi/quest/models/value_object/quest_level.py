from dataclasses import dataclass
from typing import Any
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
    
    @classmethod
    def from_raw(cls, raw_value: Any) -> 'QuestLevel':
        """生の値からQuestLevelを作成する"""
        if isinstance(raw_value, int):
            return cls(raw_value)
        elif isinstance(raw_value, str) and raw_value.isdigit():
            return cls(int(raw_value))
        else:
            raise ValueError("QuestLevelの生データは整数または数字文字列である必要があります。")
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestLevel):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return str(self.value)