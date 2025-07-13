from dataclasses import dataclass

from aqapi.core.domain.value_object.base_value_object import BaseValueObject

@dataclass
class ScreenDescription(BaseValueObject):
    """スクリーンの説明を表す値オブジェクト"""
    _value: str

    def __init__(self, value: str):
        self._value = value
        super().__init__()

    def _validate(self) -> None:
        pass
