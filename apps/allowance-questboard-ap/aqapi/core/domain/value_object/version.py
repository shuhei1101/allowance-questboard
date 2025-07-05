from dataclasses import dataclass
from aqapi.core.constants.error_messages import ERR_MSGS

@dataclass
class Version:

    value: int

    def __init__(self, value: int):
        if value < 1:
            raise ValueError(ERR_MSGS.VERSION_TOO_LOW)
        self.value = value

    def next(self) -> None:
        """バージョンを1つ進める"""
        self.value += 1

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Version):
            return NotImplemented
        return self.value == other.value
