from dataclasses import dataclass

from aqapi.core.domain.value_object.base_id import BaseId

@dataclass
class IconCategoryId(BaseId):
    """アイコンカテゴリのIDを表すクラス"""
    
    def __init__(self, value: int):
        super().__init__(value)
