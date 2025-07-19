from abc import abstractmethod
from typing import List


class BaseDao():
    """データアクセスオブジェクトの基底クラス（排他制御対応）"""
    def __init__(self, session):
        """コンストラクタ

        :param session: SQLAlchemyのセッション
        """
        self.session = session

    @abstractmethod
    def get_version(self, id: int) -> int:
        """指定したIDの現在のバージョンを取得する

        :param int id: エンティティのID
        :return int: 現在のバージョン
        :raises ValueError: 指定したIDのエンティティが存在しない場合
        """
        pass

    @abstractmethod
    def fetch_all(self) -> List:
        """全てのエンティティを取得する

        :return List: エンティティのリスト
        """
        pass

    @abstractmethod
    def fetch_by_id(self, id: int):
        """IDでエンティティを取得する

        :param int id: エンティティのID
        :return: エンティティオブジェクト（見つからない場合はNone）
        """
        pass

    @abstractmethod
    def update(self, entity) -> None:
        """エンティティを更新する

        :param entity: 更新するエンティティ
        """
        pass

    @abstractmethod
    def delete(self, id: int) -> None:
        """IDでエンティティを削除する

        :param int id: 削除するエンティティのID
        """
        pass

    def commit(self) -> None:
        """セッションをコミット"""
        self.session.commit()

    def rollback(self) -> None:
        """セッションをロールバック"""
        self.session.rollback()
