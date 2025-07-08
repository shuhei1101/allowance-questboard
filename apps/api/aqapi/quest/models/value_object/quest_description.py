from dataclasses import dataclass
from typing import Optional
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


@dataclass
class QuestDescription(BaseValueObject):
    """クエスト詳細内容の値オブジェクト"""
    
    value: Optional[str]
    
    def __init__(self, value: Optional[str]):
        self.value = value.strip() if value else None
        super().__init__()
    
    def _validate(self) -> None:
        if self.value is not None and len(self.value.strip()) > 1000:
            raise ValueError("クエスト詳細は1000文字以内で設定してください。")
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestDescription):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return self.value or ""