from abc import abstractmethod


class BaseValueObject():
    """値オブジェクトの基底クラス"""
    
    def __init__(self):
        self._validate()
    
    @abstractmethod
    def _validate(self) -> None:
        """値オブジェクトの値を検証する"""
        raise NotImplementedError("Subclasses must implement this method.")
