from dataclasses import dataclass
from typing import TYPE_CHECKING
from aqapi.core.repository.base_repository import BaseRepository
if TYPE_CHECKING:
    from aqapi.language.dao.language_dao import LanguageDao
    from aqapi.language.entity.languages_entity import LanguagesEntity
from aqapi.language.domain.language_type import LanguageType

@dataclass(frozen=True)
class LanguageRepositoryDependencies:
    """言語リポジトリの依存関係クラス"""
    
    language_dao: 'LanguageDao'

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
