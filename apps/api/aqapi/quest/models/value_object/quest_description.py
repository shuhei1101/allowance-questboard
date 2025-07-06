from dataclasses import dataclass
from typing import Optional, Any
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


@dataclass
class QuestDescription(BaseValueObject):
    """クエスト詳細内容の値オブジェクト"""
    
    value: Optional[str]
    
    def __init__(self, value: Optional[str]):
        self.value = value.strip() if value else None
        super().__init__()
    
    def validate(self) -> None:
        """値の検証を行う"""
        if self.value is not None and len(self.value.strip()) > 1000:
            raise ValueError("クエスト詳細は1000文字以内で設定してください。")
    
    @classmethod
    def from_raw(cls, raw_value: Any) -> 'QuestDescription':
        """生の値からQuestDescriptionを作成する"""
        if raw_value is None or isinstance(raw_value, str):
            return cls(raw_value)
        else:
            raise ValueError("QuestDescriptionの生データは文字列またはNoneである必要があります。")
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, QuestDescription):
            return NotImplemented
        return self.value == other.value
    
    def __str__(self) -> str:
        return self.value or ""