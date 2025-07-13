from aqapi.core.domain.value_object.base_id import BaseId

class FamilyMemberId(BaseId):
    """家族メンバーのIDを表す値オブジェクト"""

    def __init__(self, value: int):
        super().__init__(value)
