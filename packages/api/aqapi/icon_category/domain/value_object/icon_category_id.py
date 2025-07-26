from dataclasses import dataclass
from typing import override

from aqapi.core.domain.value_object.base_id import BaseId

@dataclass
class IconCategoryId(BaseId):
    """アイコンカテゴリのIDを表すクラス"""
    
    def __init__(self, value: int):
        super().__init__(value)

    @property
    @override
    def _value_name(self) -> str:
        """IDの名前を返す"""
        return f"IconCategoryId({self._value})"
