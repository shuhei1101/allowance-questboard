from dataclasses import dataclass
from typing import override
from aqapi.core.messages.error_messages import error_messages
from aqapi.core.domain.value_object.base_value_object import BaseValueObject

class Version(BaseValueObject[int]):

    @override
    def _validate(self) -> None:
        """バージョンの値が1以上であることを確認"""
        self._validator.validate_required()
        self._validator.validate_integer()
        self._validator.validate_min_value(1)

    def get_next_version(self) -> 'Version':
        """バージョンを1つ進める"""
        return Version(self._value + 1)
        
