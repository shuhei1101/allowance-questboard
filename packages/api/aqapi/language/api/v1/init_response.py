from typing import List
from pydantic import BaseModel
from aqapi.language.entity.languages_entity import LanguagesEntity
from aqapi.language.domain.language_type import LanguageType


class LanguageDto(BaseModel):
    """言語情報DTO"""
    id: int
    code: str
    name: str
    is_active: bool
    sort_order: int

    @classmethod
    def from_entity(cls, entity: LanguagesEntity) -> 'LanguageDto':
        """LanguagesEntityからLanguageDtoを生成"""
        return cls(
            id=entity.id,
            code=entity.code,
            name=entity.name,
            is_active=entity.is_active,
            sort_order=entity.sort_order
        )

    @classmethod
    def from_enum(cls, enum_value: LanguageType) -> 'LanguageDto':
        """LanguageTypeからLanguageDtoを生成"""
        value = enum_value.value
        return cls(
            id=value.id.value,
            code=value.code.value,
            name=value.name.value,
            is_active=value.is_active,
            sort_order=value.sort_order.value
        )


class LanguagesDto(BaseModel):
    """言語情報一覧DTO"""
    list: List[LanguageDto]

    @classmethod
    def from_entities(cls, entities: List[LanguagesEntity]) -> 'LanguagesDto':
        """LanguagesEntityのリストからLanguagesDtoを生成"""
        return cls(
            list=[LanguageDto.from_entity(entity) for entity in entities]
        )

    @classmethod
    def from_enums(cls, enums: List[LanguageType]) -> 'LanguagesDto':
        """LanguageTypeのリストからLanguagesDtoを生成"""
        return cls(
            list=[LanguageDto.from_enum(enum_value) for enum_value in enums]
        )


class InitResponse(BaseModel):
    """アプリ初期化レスポンス"""
    languages: LanguagesDto

    @classmethod
    def from_query_result(cls, query_result) -> 'InitResponse':
        """クエリ結果からレスポンスを生成"""
        return cls(
            languages=LanguagesDto.from_entities(query_result.languages)
        )

    @classmethod
    def from_result(cls, result) -> 'InitResponse':
        """ユースケース結果からレスポンスを生成"""
        return cls(
            languages=LanguagesDto.from_enums(result.languages)
        )
