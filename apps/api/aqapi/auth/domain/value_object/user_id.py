from uuid import UUID
from aqapi.core.domain.value_object.base_value_object import BaseValueObject


class UserId(BaseValueObject):
    """ユーザーのIDを表す値オブジェクト"""

    def __init__(self, value: UUID):
        self._value = value
        super().__init__()

    def _validate(self) -> None:
        if not isinstance(self._value, UUID):
            raise ValueError("IDはUUIDでなければなりません。")
            
