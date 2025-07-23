from typing import Hashable
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


class BaseId(BaseValueObject[int], Hashable):
    """ドメインモデルのIDを表す基底クラス"""

    def __init__(self, value: int):
        super().__init__(value)

    def _validate(self) -> None:
        if not isinstance(self._value, int) or self._value <= 0:
            raise ValueError("IDは正の整数でなければなりません。")
    
    def __eq__(self, other) -> bool:
        """等価性の比較"""
        if not isinstance(other, BaseId):
            return False
        return self._value == other._value
    
    def __hash__(self) -> int:
        """ハッシュ値の計算（辞書のキーとして使用可能にする）"""
        return hash(self._value)
    
    def __int__(self) -> int:
        """IDを整数として返す"""
        return self._value
    
    @property
    def value(self) -> int:
        """IDの値を取得"""
        return self._value
