from typing import Mapping
from aqapi.core.enum.domain.value_object.base_enum_value import BaseEnumValue
from aqapi.core.enum.domain.value_object.translation_enum_value_protocol import TranslationEnumValueProtocol
from aqapi.icon_category.domain.value_object.icon_category_id import IconCategoryId
from aqapi.icon_category.domain.value_object.icon_category_names import IconCategoryNames
from aqapi.icon_category.entity.icon_categories_entity import IconCategoriesEntity, IconCategoriesTranslationEntity
from aqapi.shared.entity.sort_order import SortOrder


class IconCategoryValue(BaseEnumValue, TranslationEnumValueProtocol):
    '''アイコンカテゴリが持つ値オブジェクト集約'''

    def __init__(self, id: IconCategoryId, 
                 name_by_languages: IconCategoryNames=IconCategoryNames.from_empty(),
                 sort_order: SortOrder=SortOrder(0),
                 is_active: bool=True) -> None:
        self._id = id
        self._name_by_languages = name_by_languages
        self._sort_order = sort_order
        self._is_active = is_active

    def set_from_entity(self, entity: IconCategoriesEntity, translation_dict: Mapping[int, IconCategoriesTranslationEntity]) -> None:
        """エンティティから値を設定する
        
        :param entity: アイコンカテゴリエンティティ
        :param translation_dict: 言語IDをキーとした翻訳エンティティのマッピング
        """
        # MappingをdictにキャストしてIconCategoryNames.from_entityに渡す
        self._name_by_languages = IconCategoryNames.from_entity(dict(translation_dict))
        self._sort_order = SortOrder(entity.sort_order)
        self._is_active = entity.is_active

    @property
    def id(self) -> IconCategoryId:
        """値オブジェクトのIDを返す"""
        return self._id
    
