import pytest
from unittest.mock import Mock, MagicMock
from aqapi.core.repository.base_repository import BaseRepository
from aqapi.core.dao.base_dao import BaseDao
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version


class ConcreteRepository(BaseRepository):
    """テスト用の具象Repositoryクラス"""
    
    def __init__(self, dao: BaseDao):
        self._dao = dao
    
    def _is_latest_version(self, entity: BaseModel) -> bool:
        """_is_latest_versionの具象実装"""
        if not hasattr(entity, 'id') or entity.id is None:
            raise ValueError("エンティティにIDが設定されていません")
        
        # DAOから現在のバージョンを取得
        current_version = self._dao.get_version(entity.id)
        
        # エンティティのバージョンと比較
        return entity.version().value == current_version


class TestBaseRepository:
    """BaseRepositoryクラスのテスト"""

    def test_abstract_class(self):
        """抽象クラスのテスト - 直接インスタンス化できないことを確認"""
        with pytest.raises(TypeError):
            BaseRepository()

    def test_is_latest_version_true(self):
        """エンティティが最新バージョンの場合のテスト"""
        # Mock DAO
        mock_dao = Mock(spec=BaseDao)
        mock_dao.get_version.return_value = 1
        
        # Mock Entity
        mock_entity = Mock(spec=BaseModel)
        mock_entity.id = 1
        mock_version = Mock(spec=Version)
        mock_version.value = 1
        mock_entity.version.return_value = mock_version
        
        repository = ConcreteRepository(mock_dao)
        
        result = repository._is_latest_version(mock_entity)
        
        assert result is True
        mock_dao.get_version.assert_called_once_with(1)

    def test_is_latest_version_false(self):
        """エンティティが古いバージョンの場合のテスト"""
        # Mock DAO
        mock_dao = Mock(spec=BaseDao)
        mock_dao.get_version.return_value = 2
        
        # Mock Entity
        mock_entity = Mock(spec=BaseModel)
        mock_entity.id = 1
        mock_version = Mock(spec=Version)
        mock_version.value = 1
        mock_entity.version.return_value = mock_version
        
        repository = ConcreteRepository(mock_dao)
        
        result = repository._is_latest_version(mock_entity)
        
        assert result is False
        mock_dao.get_version.assert_called_once_with(1)

    def test_is_latest_version_no_id(self):
        """エンティティにIDが設定されていない場合のテスト"""
        mock_dao = Mock(spec=BaseDao)
        mock_entity = Mock(spec=BaseModel)
        mock_entity.id = None
        
        repository = ConcreteRepository(mock_dao)
        
        with pytest.raises(ValueError, match="エンティティにIDが設定されていません"):
            repository._is_latest_version(mock_entity)

    def test_is_latest_version_no_id_attribute(self):
        """エンティティにid属性がない場合のテスト"""
        mock_dao = Mock(spec=BaseDao)
        mock_entity = Mock(spec=BaseModel)
        # idアトリビュートを削除
        if hasattr(mock_entity, 'id'):
            delattr(mock_entity, 'id')
        
        repository = ConcreteRepository(mock_dao)
        
        with pytest.raises(ValueError, match="エンティティにIDが設定されていません"):
            repository._is_latest_version(mock_entity)