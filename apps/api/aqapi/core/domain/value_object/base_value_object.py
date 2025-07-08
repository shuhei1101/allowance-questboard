from abc import ABC, abstractmethod


class BaseValueObject(ABC):
    """値オブジェクトの基底クラス"""
    
    def __init__(self):
        self._validate()
    
    @abstractmethod
    def _validate(self) -> None:
        """値オブジェクトの値を検証する"""
        pass