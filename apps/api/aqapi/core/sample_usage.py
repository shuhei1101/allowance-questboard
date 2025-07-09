"""
使用例: BaseDAOとBaseRepositoryの実装サンプル

このファイルは、BaseDAOとBaseRepositoryクラスの使用方法を示すサンプルです。
実際のプロダクションコードでは、これらのパターンに従って実装してください。
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from aqapi.core.dao.base_dao import BaseDao
from aqapi.core.repository.base_repository import BaseRepository
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version


# サンプルエンティティクラス（実際のエンティティに置き換えてください）
class SampleEntity:
    def __init__(self, id: int, version: int = 1):
        self.id = id
        self.version = version


# サンプルドメインモデル（実際のドメインモデルに置き換えてください）
class SampleModel(BaseModel):
    def __init__(self, id: int, version: Version):
        super().__init__(version)
        self.id = id


# BaseDAOの実装例
class SampleDao(BaseDao):
    """サンプルDAOクラス - BaseDAOの使用例"""

    def fetch_all(self) -> List[SampleEntity]:
        """全てのエンティティを取得する"""
        # 実際の実装では、SQLAlchemyクエリを実行
        return self.session.query(SampleEntity).all()

    def fetch_by_id(self, id: int) -> Optional[SampleEntity]:
        """IDでエンティティを取得する"""
        return self.session.query(SampleEntity).filter(SampleEntity.id == id).first()

    def update(self, entity: SampleEntity) -> None:
        """エンティティを更新する"""
        self.session.merge(entity)

    def delete(self, id: int) -> None:
        """IDでエンティティを削除する"""
        entity = self.fetch_by_id(id)
        if entity:
            self.session.delete(entity)

    def get_version(self, id: int) -> int:
        """指定したIDの現在のバージョンを取得する"""
        entity = self.fetch_by_id(id)
        if entity is None:
            raise ValueError(f"ID {id} のエンティティが見つかりません")
        return entity.version


# BaseRepositoryの実装例
class SampleRepository(BaseRepository):
    """サンプルリポジトリクラス - BaseRepositoryの使用例"""

    def __init__(self, dao: SampleDao):
        super().__init__(dao)

    def update_with_version_check(self, model: SampleModel) -> None:
        """バージョンチェック付きの更新処理

        :param SampleModel model: 更新対象のドメインモデル
        :raises ValueError: バージョンが古い場合
        """
        # 排他制御: 最新バージョンかチェック
        if not self._is_latest_version(model):
            raise ValueError(f"エンティティ（ID: {model.id}）は他のユーザーによって更新されています。最新の情報を取得し直してください。")
        
        # バージョンを次に進める
        model.next_version()
        
        # エンティティに変換して更新（実際の実装では適切な変換処理が必要）
        entity = SampleEntity(model.id, model.version().value)
        self._dao.update(entity)


# 使用例
def usage_example():
    """使用例を示すサンプル関数"""
    
    # セッションの初期化（実際の実装では適切にセッションを管理）
    session = None  # 実際のSQLAlchemyセッション
    
    # DAOとRepositoryの初期化
    dao = SampleDao(session)
    repository = SampleRepository(dao)
    
    # ドメインモデルの作成
    model = SampleModel(id=1, version=Version(1))
    
    try:
        # バージョンチェック付きで更新
        repository.update_with_version_check(model)
        print("更新が正常に完了しました")
    except ValueError as e:
        print(f"更新エラー: {e}")


if __name__ == "__main__":
    # このファイルを直接実行した場合の処理
    print("BaseDAOとBaseRepositoryの使用例")
    print("実際の使用時は、適切なエンティティとドメインモデルに置き換えてください")