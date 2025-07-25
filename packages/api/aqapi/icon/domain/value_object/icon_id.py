from aqapi.core.domain.value_object.base_id import BaseId


class IconId(BaseId):
    """アイコンのIDを表す値オブジェクト"""

    def __init__(self, value: int):
        super().__init__(value)
