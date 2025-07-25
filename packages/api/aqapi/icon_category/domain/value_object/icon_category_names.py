from aqapi.core.domain.base_collection import BaseCollection

from aqapi.icon_category.domain.value_object.icon_category_id import IconCategoryId
from aqapi.icon_category.domain.value_object.icon_category_name import IconCategoryName
from aqapi.icon_category.entity.icon_categories_entity import IconCategoriesTranslationEntity
from aqapi.language.domain.language_type import LanguageType
from aqapi.language.domain.value_object.language_id import LanguageId


class IconCategoryNames(BaseCollection[IconCategoryName, IconCategoryId]):
    """アイコンカテゴリ名の値オブジェクト集約"""

    @classmethod
    def from_entity(cls, translation_dict: dict[int, IconCategoriesTranslationEntity]) -> 'IconCategoryNames':
        """エンティティからアイコンカテゴリ名の集約を生成
        
        :param dict[int, IconCategoriesTranslationEntity] translation_dict: 言語ごとの翻訳エンティティの辞書
        """
        name_list = []
        for translation in translation_dict.values():
            if isinstance(translation, IconCategoriesTranslationEntity):
                name_list.append(IconCategoryName(LanguageType.from_id(LanguageId(translation.language_id)), translation.name))
        
        return cls(name_list)
            


    
