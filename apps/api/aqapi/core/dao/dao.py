from abc import ABC, abstractmethod
from typing import List, Optional
from sqlalchemy.orm import Session


class Dao(ABC):
    """データアクセスオブジェクトの基底クラス"""

    def __init__(self, session: Session):
        """コンストラクタ

        :param Session session: SQLAlchemyのセッション
        """
        self.session = session

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
