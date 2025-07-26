from typing import override
from aqapi.language.domain.value_object.language_id import LanguageId
from aqapi.language.domain.value_object.language_code import LanguageCode
from aqapi.language.domain.value_object.language_name import LanguageName
from aqapi.shared.entity.sort_order import SortOrder
from aqapi.language.entity.languages_entity import LanguagesEntity
from aqapi.core.enum.domain.value_object.base_enum_value import BaseEnumValue
from aqapi.core.enum.domain.value_object.enum_value_protocol import EnumValueProtocol


class LanguageTypeValue(BaseEnumValue[LanguageId], EnumValueProtocol):
    """言語タイプの値オブジェクト集約"""
    
    def __init__(self, 
        id: LanguageId,
        code: LanguageCode = LanguageCode(""),
        name: LanguageName = LanguageName(""),
        is_active: bool = False,
        sort_order: SortOrder = SortOrder(0)
    ):
        self._id = id
        self._code = code
        self._name = name
        self._is_active = is_active
        self._sort_order = sort_order

    @override
    def set_from_entity(self, entity: LanguagesEntity) -> None:
        """エンティティから値を設定する
        
        :param entity: 言語エンティティ
        """
        self._code = LanguageCode(entity.code)
        self._name = LanguageName(entity.name)
        self._is_active = entity.is_active
        self._sort_order = SortOrder(entity.sort_order)

    @property
    @override
    def id(self) -> LanguageId:
        """値オブジェクトのIDを返す"""
        return self._id
    
    @property
    def code(self) -> LanguageCode:
        """言語コードを返す"""
        return self._code
    
    @property
    def name(self) -> LanguageName:
        """言語名を返す"""
        return self._name
    
    @property
    def is_active(self) -> bool:
        """有効フラグを返す"""
        return self._is_active
    
    @property
    def sort_order(self) -> SortOrder:
        """表示順序を返す"""
        return self._sort_order
