from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession
from aqapi.core.domain.base_model import BaseModel

from aqapi.core.dao.base_dao import BaseDao


class BaseRepository(ABC):
    """リポジトリの基底クラス"""

    def _is_latest_version(self, model: BaseModel, dao: BaseDao) -> bool:
        """現在のエンティティが最新バージョンかどうかを確認する

        :param any model: 確認対象のモデル
        :return bool: 最新バージョンの場合True、古いバージョンの場合False
        :raises ValueError: エンティティにIDが設定されていない場合、またはDBに該当エンティティが存在しない場合
        """
        if not model.id:
            raise ValueError("Model ID is not set.")
        
        current_version = dao.get_version(int(model.id))
        if current_version is None:
            raise ValueError(f"{model.id}のエンティティが存在しません。")
        
        return model.version == current_version
