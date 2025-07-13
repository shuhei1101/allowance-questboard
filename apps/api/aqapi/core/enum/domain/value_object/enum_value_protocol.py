from abc import ABC, abstractmethod
from aqapi.core.entity.base_entity import BaseEntity


class EnumValueProtocol(ABC):
    """翻訳なしエンティティから更新可能な値オブジェクトのインターフェース"""
    
    @abstractmethod
    def set_from_entity(self, entity: BaseEntity) -> None:
        """エンティティから値を設定する
        
        :param entity: 更新に使用するエンティティ
        """
        pass
