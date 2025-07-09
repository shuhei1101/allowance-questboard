from abc import abstractmethod
from aqapi.core.dao.dao import Dao


class BaseDao(Dao):
    """データアクセスオブジェクトの基底クラス（排他制御対応）"""

    @abstractmethod
    def get_version(self, id: int) -> int:
        """指定したIDの現在のバージョンを取得する

        :param int id: エンティティのID
        :return int: 現在のバージョン
        :raises ValueError: 指定したIDのエンティティが存在しない場合
        """
        pass