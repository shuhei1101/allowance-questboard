from dataclasses import dataclass

from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.shared.domain.value_object.screen_code import ScreenCode
from aqapi.shared.domain.value_object.screen_description import ScreenDescription
from aqapi.shared.domain.value_object.screen_id import ScreenId


@dataclass
class Screen(BaseModel):
    _id: ScreenId
    _code: ScreenCode
    _description: ScreenDescription

    def __init__(self, id: ScreenId, code: ScreenCode, description: ScreenDescription, version: Version):
        super().__init__(version)
        self._id = id
        self._code = code
        self._description = description
        