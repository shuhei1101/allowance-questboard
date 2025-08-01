from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from aqapi.core.di_container import di_container
from aqapi.language.entity.languages_entity import LanguagesEntity
from aqapi.core.dao.base_dao import BaseDao
from aqapi.core.cache.redis_cacher import RedisCacher

class LanguageDao(BaseDao):
    """言語DAOクラス"""
    redis = di_container.get(RedisCacher)

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    @property
    def entity_class(self) -> type[LanguagesEntity]:
        return LanguagesEntity
    
    @redis.cache("languages:all")
    async def fetch_all(self) -> List[LanguagesEntity]:
        return await super().fetch_all()
