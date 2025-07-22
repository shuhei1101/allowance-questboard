from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession
from aqapi.core.domain.value_object.base_id import BaseId

from aqapi.core.dao.base_dao import BaseDao


class BaseRepository(ABC):
    """リポジトリの基底クラス"""

    def __init__(self, session: AsyncSession):
        self.session = session

    def _is_latest_version(self, model: BaseModel, dao: BaseDao) -> bool:
        """現在のエンティティが最新バージョンかどうかを確認する

        :param any model: 確認対象のモデル
        :return bool: 最新バージョンの場合True、古いバージョンの場合False
        :raises ValueError: エンティティにIDが設定されていない場合、またはDBに該当エンティティが存在しない場合
        """
        if not model.id:
            raise ValueError("Model ID is not set.")
        
        current_version = dao.get_version(model.id)
        if current_version is None:
            raise ValueError(f"Entity with id {model.id} does not exist in the database.")
        
        return model.version == current_version
