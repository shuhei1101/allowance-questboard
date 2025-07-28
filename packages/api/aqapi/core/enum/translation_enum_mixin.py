from typing import Generic, cast, TypeVar
from aqapi.core.entity.base_entity import BaseEntity
from aqapi.core.entity.base_translation_collection import BaseTranslationCollection
from aqapi.core.enum.value_object.translation_enum_value_protocol import TranslationEnumValueProtocol

EntityType = TypeVar('EntityType', bound=BaseEntity)

class TranslationEnumMixin(Generic[EntityType]):
    """翻訳テーブルありのエンティティから更新可能なMixin"""

    @classmethod
    def update_from_entities(cls, entities: list[EntityType], translations: BaseTranslationCollection) -> None:
        """エンティティリストから列挙型の値を更新する（翻訳テーブルあり）
        
        :param entities: 更新に使用するエンティティのリスト
        :param translations: 翻訳データのコレクション
        """
        
        enum_vals = list(cls)  # type: ignore
        for entity in entities:
            for enum_val in enum_vals:
                # 型安全性を保つためにプロトコルでキャスト
                value = cast(TranslationEnumValueProtocol, enum_val.value)
                if value.id.value == entity.id:  # type: ignore
                    # 値のIDとエンティティのIDが一致する場合、値を更新
                    translation_dict = translations.get_by_source_id(entity.id)
                    value.set_from_entity(entity, translation_dict)
                    break
