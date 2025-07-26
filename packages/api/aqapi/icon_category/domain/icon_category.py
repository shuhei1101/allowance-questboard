from aqapi.core.enum.domain.base_enum import BaseEnum
from aqapi.core.enum.domain.translation_enum_mixin import TranslationEnumMixin
from aqapi.icon_category.domain.value_object.icon_category_id import IconCategoryId
from aqapi.icon_category.domain.value_object.icon_category_value import IconCategoryValue
from aqapi.icon_category.entity.icon_categories_entity import IconCategoriesEntity


class IconCategory(TranslationEnumMixin[IconCategoriesEntity], BaseEnum[IconCategoryId]): # type: ignore
    """アイコンカテゴリの種類"""
    
    ACTION = IconCategoryValue(IconCategoryId(1))
    NAVIGATION = IconCategoryValue(IconCategoryId(2))
    COMMUNICATION = IconCategoryValue(IconCategoryId(3))
