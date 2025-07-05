from dataclasses import dataclass
from typing import Optional


@dataclass
class QuestDescription:
    """クエスト詳細内容の値オブジェクト"""
    
    value: Optional[str]
    
    def __init__(self, value: Optional[str]):
        if value is not None and len(value.strip()) > 1000:
            raise ValueError("クエスト詳細は1000文字以内で設定してください。")
        self.value = value.strip() if value else None
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestDescription):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return self.value or ""