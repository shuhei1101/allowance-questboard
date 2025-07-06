from dataclasses import dataclass
from uuid import UUID
from typing import Any
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


@dataclass
class QuestId(BaseValueObject):
    """クエストIDの値オブジェクト"""
    
    value: UUID
    
    def __init__(self, value: UUID):
        self.value = value
        super().__init__()
    
    def _validate(self) -> None:
        if self.value is None:
            raise ValueError("クエストIDは必須です。")
    
    @classmethod
    def from_raw(cls, raw_value: Any) -> 'QuestId':
        """生の値からQuestIdを作成する"""
        if isinstance(raw_value, str):
            return cls(UUID(raw_value))
        elif isinstance(raw_value, UUID):
            return cls(raw_value)
        else:
            raise ValueError("QuestIdの生データはUUIDまたは文字列である必要があります。")
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestId):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return str(self.value)