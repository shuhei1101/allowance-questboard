from sqlalchemy.orm import Session


class FamilyQuestsDAO:
    """クエストDAOクラス"""

    def __init__(self, session: Session):
        """
        コンストラクタ
        
        :param Session session: SQLAlchemyセッション
        """
        self.session = session
