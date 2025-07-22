from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from aqapi.quest.entity.quests_entity import QuestsEntity
from aqapi.core.dao.base_dao import BaseDao
from aqapi.core.config.redis_config import redis_client
from aqapi.core.cache.redis_cacher import RedisCacher
cacher = RedisCacher(redis_client)

class QuestDao(BaseDao):
    """クエストDAOクラス"""

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    @property
    def entity_class(self) -> type[QuestsEntity]:
        return QuestsEntity
    
    @cacher.cache("quests:all")
    async def fetch_all(self) -> List[QuestsEntity]:
        return await super().fetch_all()

    @cacher.cache("quests:{id}")
    async def fetch_by_id(self, id: int) -> Optional[QuestsEntity]:
        return await super().fetch_by_id(id)

    @cacher.evict("quests:all")
    async def insert(self, entity: QuestsEntity) -> int:
        return await super().insert(entity)

    @cacher.evict("quests:all", "quests:{entity.id}")
    async def update(self, entity: QuestsEntity) -> None:
        await super().update(entity)

    @cacher.evict("quests:all", "quests:{id}")
    async def delete(self, id: int) -> None:
        await super().delete(id)
