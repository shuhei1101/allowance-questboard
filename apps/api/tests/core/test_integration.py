import pytest
from unittest.mock import Mock
from aqapi.core.dao.base_dao import BaseDao
from aqapi.core.repository.base_repository import BaseRepository
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version


class TestIntegration:
    """BaseDAOとBaseRepositoryの統合テスト"""

    def test_version_control_integration(self):
        """排他制御の統合テスト"""
        
        # Mock DAO
        class TestDao(BaseDao):
            def __init__(self, session):
                super().__init__(session)
                self._entities = {1: {"id": 1, "version": 2}}  # DB状態をシミュレート
            
            def fetch_all(self):
                return list(self._entities.values())
            
            def fetch_by_id(self, id: int):
                return self._entities.get(id)
            
            def update(self, entity):
                self._entities[entity["id"]] = entity
            
            def delete(self, id: int):
                if id in self._entities:
                    del self._entities[id]
            
            def get_version(self, id: int) -> int:
                entity = self.fetch_by_id(id)
                if entity is None:
                    raise ValueError(f"ID {id} のエンティティが見つかりません")
                return entity["version"]
        
        # Mock Entity
        class TestModel(BaseModel):
            def __init__(self, id: int, version: Version):
                super().__init__(version)
                self.id = id
        
        # Repository
        class TestRepository(BaseRepository):
            def __init__(self, dao: TestDao):
                self._dao = dao
            
            def _is_latest_version(self, entity: BaseModel) -> bool:
                """現在のエンティティが最新バージョンかどうかを確認する"""
                if not hasattr(entity, 'id') or entity.id is None:
                    raise ValueError("エンティティにIDが設定されていません")
                
                # DAOから現在のバージョンを取得
                current_version = self._dao.get_version(entity.id)
                
                # エンティティのバージョンと比較
                return entity.version().value == current_version
            
            def update_with_version_check(self, model: TestModel):
                if not self._is_latest_version(model):
                    raise ValueError("エンティティは他のユーザーによって更新されています")
                model.next_version()
                entity = {"id": model.id, "version": model.version().value}
                self._dao.update(entity)
        
        # テスト実行
        mock_session = Mock()
        dao = TestDao(mock_session)
        repository = TestRepository(dao)
        
        # ケース1: 最新バージョンでの更新（成功）
        model1 = TestModel(id=1, version=Version(2))  # DB上のバージョンと同じ
        repository.update_with_version_check(model1)
        assert dao.get_version(1) == 3  # バージョンが1つ進んでいる
        
        # ケース2: 古いバージョンでの更新（失敗）
        model2 = TestModel(id=1, version=Version(2))  # DB上は既に3
        with pytest.raises(ValueError, match="エンティティは他のユーザーによって更新されています"):
            repository.update_with_version_check(model2)

    def test_dao_get_version_not_found(self):
        """存在しないIDでget_versionを呼んだ場合のテスト"""
        
        class TestDao(BaseDao):
            def fetch_all(self):
                return []
            
            def fetch_by_id(self, id: int):
                return None
            
            def update(self, entity):
                pass
            
            def delete(self, id: int):
                pass
            
            def get_version(self, id: int) -> int:
                entity = self.fetch_by_id(id)
                if entity is None:
                    raise ValueError(f"ID {id} のエンティティが見つかりません")
                return entity.version
        
        class TestRepository(BaseRepository):
            def __init__(self, dao: TestDao):
                self._dao = dao
            
            def _is_latest_version(self, entity: BaseModel) -> bool:
                """現在のエンティティが最新バージョンかどうかを確認する"""
                if not hasattr(entity, 'id') or entity.id is None:
                    raise ValueError("エンティティにIDが設定されていません")
                
                # DAOから現在のバージョンを取得
                current_version = self._dao.get_version(entity.id)
                
                # エンティティのバージョンと比較
                return entity.version().value == current_version
        
        mock_session = Mock()
        dao = TestDao(mock_session)
        repository = TestRepository(dao)
        
        # 存在しないエンティティでのバージョンチェック
        mock_entity = Mock()
        mock_entity.id = 999
        mock_entity.version.return_value.value = 1
        
        with pytest.raises(ValueError, match="ID 999 のエンティティが見つかりません"):
            repository._is_latest_version(mock_entity)