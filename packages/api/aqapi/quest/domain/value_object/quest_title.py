from dataclasses import dataclass
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


@dataclass
class QuestTitle(BaseValueObject):
    """クエスト名の値オブジェクト"""
    
    value: str
    
    def __init__(self, value: str):
        self.value = value.strip() if value else ""
        super().__init__()
    
    def _validate(self) -> None:
        if not self.value or not self.value.strip():
            raise ValueError("クエスト名は必須です。")
        if len(self.value.strip()) > 100:
            raise ValueError("クエスト名は100文字以内で設定してください。")
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestTitle):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return self.value