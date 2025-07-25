from abc import ABC, abstractmethod

class BaseEnumValue(ABC):
    
    @property
    @abstractmethod
    def id(self):
        """値オブジェクトのIDを返す"""
        raise NotImplementedError("This method should be implemented by subclasses.")
