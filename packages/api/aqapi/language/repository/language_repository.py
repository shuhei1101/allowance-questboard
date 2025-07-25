from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from aqapi.core.repository.base_repository import BaseRepository
from aqapi.language.domain.language_type import LanguageType
from aqapi.language.dao.language_dao import LanguageDao
from aqapi.language.entity.languages_entity import LanguagesEntity
from aqapi.language.repository.language_repository_dependencies import LanguageRepositoryDependencies


class LanguageRepository(BaseRepository):
    """言語リポジトリクラス
    
    LanguageTypeはEnumなので、通常のリポジトリとは異なり、
    DBからエンティティを取得してEnumの値を更新する形で動作する
    """

    def __init__(self, deps: LanguageRepositoryDependencies):
        self.language_dao = deps.language_dao

    async def find_all(self) -> None:
        """全ての言語エンティティを取得し、LanguageTypeのEnumを更新する
        
        戻り値はなし。LanguageType.update_from_entitiesでEnum値を直接更新する
        """
        entities: list[LanguagesEntity] = await self.language_dao.fetch_all()
        
        # EnumMixinのupdate_from_entitiesメソッドを使ってEnumの値を更新
        LanguageType.update_from_entities(entities)
