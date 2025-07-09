from abc import ABC, abstractmethod
from aqapi.core.domain.base_model import BaseModel


class BaseRepository(ABC):
    """リポジトリの基底クラス"""

    @abstractmethod
    def _is_latest_version(self, entity: BaseModel) -> bool:
        """現在のエンティティが最新バージョンかどうかを確認する

        :param BaseModel entity: 確認対象のエンティティ
        :return bool: 最新バージョンの場合True、古いバージョンの場合False
        :raises ValueError: エンティティにIDが設定されていない場合、またはDBに該当エンティティが存在しない場合
        """
        pass