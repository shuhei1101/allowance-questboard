from typing import Generic, TypeVar

from aqapi.core.entity.base_translation_entity import BaseTranslationEntity

from aqapi.core.entity.base_entity import BaseEntity


TranslationType = TypeVar('TranslationType', bound='BaseTranslationEntity')

class TranslatableEntity(BaseEntity, Generic[TranslationType]):
    """翻訳可能なエンティティに付与するクラス"""
    
    __abstract__ = True

    def set_translation_entity(self, translation_entities: list['TranslationType']) -> None:
        """翻訳エンティティを設定する"""
        self._translations: list['TranslationType'] = []
        for entity in translation_entities:
            if entity.source_id == self.id:
                self._translations.append(entity)
    
    