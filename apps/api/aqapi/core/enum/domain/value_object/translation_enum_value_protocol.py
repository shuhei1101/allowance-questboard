from abc import ABC, abstractmethod
from typing import Mapping
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity


class TranslationEnumValueProtocol(ABC):
    """翻訳ありエンティティから更新可能な値オブジェクトのインターフェース"""
    
    @abstractmethod
    def set_from_entity(self, entity: BaseEntity, translation_dict: Mapping[int, BaseTranslationEntity]) -> None:
        """エンティティと翻訳辞書から値を設定する
        
        :param entity: 更新に使用するエンティティ
        :param translation_dict: 言語IDをキーとした翻訳エンティティのマッピング
        """
        pass
