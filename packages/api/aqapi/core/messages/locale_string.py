class LocaleString:
    """メッセージの定義クラス"""
    
    def __init__(self, ja: str, en: str):
        self._ja = ja
        self._en = en

    @property
    def ja(self) -> str:
        return self._ja
    
    @property
    def en(self) -> str:
        return self._en
