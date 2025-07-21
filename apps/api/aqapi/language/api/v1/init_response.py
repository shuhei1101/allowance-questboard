from typing import List
from pydantic import BaseModel
from aqapi.language.entity.languages_entity import LanguagesEntity


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


class LanguagesDto(BaseModel):
    """言語情報一覧DTO"""
    list: List[LanguageDto]

    @classmethod
    def from_entities(cls, entities: List[LanguagesEntity]) -> 'LanguagesDto':
        """LanguagesEntityのリストからLanguagesDtoを生成"""
        return cls(
            list=[LanguageDto.from_entity(entity) for entity in entities]
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
