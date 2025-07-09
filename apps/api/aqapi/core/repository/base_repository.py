from abc import ABC
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.dao.base_dao import BaseDao


class BaseRepository(ABC):
    """リポジトリの基底クラス（排他制御対応）"""

    def __init__(self, dao: BaseDao):
        """コンストラクタ

        :param BaseDao dao: データアクセスオブジェクト
        """
        self._dao = dao

    def _is_latest_version(self, entity: BaseModel) -> bool:
        """現在のエンティティが最新バージョンかどうかを確認する

        :param BaseModel entity: 確認対象のエンティティ
        :return bool: 最新バージョンの場合True、古いバージョンの場合False
        :raises ValueError: エンティティにIDが設定されていない場合、またはDBに該当エンティティが存在しない場合
        """
        if not hasattr(entity, 'id') or entity.id is None:
            raise ValueError("エンティティにIDが設定されていません")
        
        # DAOから現在のバージョンを取得
        current_version = self._dao.get_version(entity.id)
        
        # エンティティのバージョンと比較
        return entity.version().value == current_version