from abc import abstractmethod
from typing import Generic, List, Optional, Type, TypeVar
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from aqapi.core.entity.base_entity import BaseEntity

EntityType = TypeVar('EntityType', bound='BaseEntity')

class BaseDao(Generic[EntityType]):
    """データアクセスオブジェクトの基底クラス（排他制御対応）"""
    def __init__(self, session: AsyncSession):
        self.session = session

    @property
    @abstractmethod
    def entity_class(self) -> Type[EntityType]:
        """エンティティクラスを返す"""
        raise NotImplementedError("Subclasses must implement this method.")

    async def get_version(self, id: int) -> int:
        """指定したIDの現在のバージョンを取得する

        :param int id: エンティティのID
        :return int: 現在のバージョン
        :raises ValueError: 指定したIDのエンティティが存在しない場合
        """
        entity = await self.fetch_by_id(id)
        if not entity:
            raise ValueError(f"Entity with id {id} does not exist.")
        return entity.version

    async def fetch_all(self) -> List[EntityType]:
        """全てのエンティティを取得する

        :return List: エンティティのリスト
        """
        stmt = select(self.entity_class)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def fetch_by_id(self, id: int) -> Optional[EntityType]:
        """IDでエンティティを取得する

        :param int id: エンティティのID
        :return: エンティティオブジェクト（見つからない場合はNone）
        """
        stmt = select(self.entity_class).where(self.entity_class.id == id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def insert(self, entity: EntityType) -> int:
        """新しいエンティティを作成する

        :param entity: 作成するエンティティオブジェクト
        :return int: 作成されたエンティティのID
        :raises ValueError: エンティティの作成に失敗した場合
        """
        self.session.add(entity)
        await self.session.flush()
        return entity.id

    async def update(self, entity: EntityType) -> None:
        """エンティティを更新する

        :param entity: 更新するエンティティ
        """
        await self.session.merge(entity)

    async def delete(self, id: int) -> None:
        """IDでエンティティを削除する

        :param int id: 削除するエンティティのID
        """
        entity = await self.fetch_by_id(id)
        if entity:
            await self.session.delete(entity)

    async def commit(self) -> None:
        """セッションをコミット"""
        await self.session.commit()

    async def rollback(self) -> None:
        """セッションをロールバック"""
        await self.session.rollback()
