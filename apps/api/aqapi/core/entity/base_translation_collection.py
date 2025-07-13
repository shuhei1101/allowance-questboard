from collections import defaultdict
from typing import Generic, TypeVar
from aqapi.core.entity.base_translation_entity import BaseTranslationEntity

TranslationType = TypeVar('TranslationType', bound=BaseTranslationEntity)

class BaseTranslationCollection(Generic[TranslationType]):
    def __init__(self, items: list[TranslationType]) -> None:
        self._items = items
        self._items_by_source_id: dict[int, dict[int, TranslationType]] = defaultdict(dict)
        self.update_items_by_source_id()

    def update_items_by_source_id(self) -> None:
        """source_idごとの辞書を更新する"""
        for item in self._items:
            if item.source_id not in self._items_by_source_id:
                self._items_by_source_id[item.source_id] = {}
            self._items_by_source_id[item.source_id][item.language_id] = item

    def get(self, source_id: int, language_id: int) -> TranslationType | None:
        """source_idとlanguage_idでアイテムを取得"""
        if not isinstance(source_id, int):
            raise TypeError(f"source_idはintである必要があります。実際: {type(source_id)}")
        if not isinstance(language_id, int):
            raise TypeError(f"language_idはintである必要があります。実際: {type(language_id)}")
        
        source_items = self._items_by_source_id.get(source_id)
        if source_items is None:
            return None
        
        return source_items.get(language_id)

    def get_by_source_id(self, source_id: int) -> dict[int, TranslationType]:
        """source_idで全ての言語のアイテムを辞書型で取得"""
        if not isinstance(source_id, int):
            raise TypeError(f"source_idはintである必要があります。実際: {type(source_id)}")
        
        source_items = self._items_by_source_id.get(source_id)
        if source_items is None:
            return {}
        
        return {language_id: item for language_id, item in source_items.items()}
