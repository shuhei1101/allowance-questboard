from dataclasses import dataclass


@dataclass
class QuestTitle:
    """クエスト名の値オブジェクト"""
    
    value: str
    
    def __init__(self, value: str):
        if not value or not value.strip():
            raise ValueError("クエスト名は必須です。")
        if len(value.strip()) > 100:
            raise ValueError("クエスト名は100文字以内で設定してください。")
        self.value = value.strip()
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestTitle):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return self.value