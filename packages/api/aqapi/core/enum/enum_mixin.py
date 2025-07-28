from typing import Generic, TypeVar, cast
from aqapi.core.entity.base_entity import BaseEntity

from aqapi.core.enum.enum_value.enum_value_protocol import EnumValueProtocol

EntityType = TypeVar('EntityType', bound=BaseEntity)

class EnumMixin(Generic[EntityType]):
    """翻訳テーブルなしのシンプルなエンティティから更新可能なMixin"""

    @classmethod
    def update_from_entities(cls, entities: list[EntityType]) -> None:
        """エンティティリストから列挙型の値を更新する（翻訳テーブルなし）
        
        :param entities: 更新に使用するエンティティのリスト
        """
        enum_vals = list(cls)  # type: ignore
        for entity in entities:
            for enum_val in enum_vals:
                # 型安全性を保つためにプロトコルでキャスト
                value = cast(EnumValueProtocol, enum_val.value)
                if value.id.value == entity.id:  # type: ignore
                    # 値のIDとエンティティのIDが一致する場合、値を更新
                    value.set_from_entity(entity)
                    break
