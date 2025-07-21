from typing import List, Optional
from sqlalchemy.orm import Session
from aqapi.quest.entity.quests_entity import QuestsEntity
from aqapi.core.dao.base_dao import BaseDao


class QuestDao(BaseDao):
    """クエストDAOクラス"""

    def __init__(self, session: Session):
        """コンストラクタ

        :param Session session: SQLAlchemyのセッション
        """
        super().__init__(session)

    def fetch_all(self) -> List[QuestsEntity]:
        """全てのクエストエンティティを取得する

        :return List[QuestsEntity]: クエストエンティティのリスト
        """
        return self.session.query(QuestsEntity).all()

    def fetch_by_id(self, id: int) -> Optional[QuestsEntity]:
        """IDでクエストエンティティを取得する

        :param int id: クエストのID
        :return Optional[QuestsEntity]: クエストエンティティ（見つからない場合はNone）
        """
        return self.session.query(QuestsEntity).filter(QuestsEntity.id == id).first()

    def insert(self, entity) -> int:
        self.session.add(entity)
        self.session.flush()  # ←ここでDBに一度送って、ID発行される
        return entity.id

    def update(self, entity: QuestsEntity) -> None:
        """クエストエンティティを更新する

        :param QuestsEntity entity: 更新するクエストエンティティ
        """
        self.session.merge(entity)

    def delete(self, id: int) -> None:
        """IDでクエストエンティティを削除する

        :param int id: 削除するクエストのID
        """
        entity = self.fetch_by_id(id)
        if entity:
            self.session.delete(entity)
