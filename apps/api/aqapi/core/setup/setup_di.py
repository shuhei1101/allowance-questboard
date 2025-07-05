from sqlalchemy.orm import Session
from aqapi.core.config.db_config import DB_CONF
from aqapi.core.di_container import injector
from aqapi.quest.dao.family_quests_dao import FamilyQuestsDAO


def setup_di():
    """DIコンテナのセットアップ関数"""
    # データベース関連の登録
    injector.register(type(DB_CONF), DB_CONF)

    # DAO層の登録
    family_quests_dao_instance = FamilyQuestsDAO(DB_CONF.SessionLocal())
    injector.register(FamilyQuestsDAO, family_quests_dao_instance)

    print("✅ DIコンテナの初期化が完了しました")
