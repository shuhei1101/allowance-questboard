from typing import Hashable, override
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


class BaseId(BaseValueObject[int], Hashable):
    """ドメインモデルのIDを表す基底クラス"""

    def __init__(self, value: int):
        super().__init__(value)

    @override
    def _validate(self) -> None:
        self._validator.validate_required()
        self._validator.validate_integer()
        self._validator.validate_min_value(1)

    @property
    @override
    def _value_name(self) -> str:
        return "ID"
    
    def __hash__(self) -> int:
        """ハッシュ値の計算（辞書のキーとして使用可能にする）"""
        return hash(self._value)
    
    def __int__(self) -> int:
        """IDを整数として返す"""
        return self._value
    
