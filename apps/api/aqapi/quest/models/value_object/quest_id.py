from dataclasses import dataclass
from uuid import UUID


@dataclass
class QuestId:
    """クエストIDの値オブジェクト"""
    
    value: UUID
    
    def __init__(self, value: UUID):
        if value is None:
            raise ValueError("クエストIDは必須です。")
        self.value = value
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestId):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return str(self.value)