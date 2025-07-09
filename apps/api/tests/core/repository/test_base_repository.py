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

    class Test_抽象クラス:
        def test_BaseRepositoryが抽象クラスであること(self):
            with pytest.raises(TypeError):
                BaseRepository()

    class Test__is_latest_version:
        def test_エンティティが最新バージョンの場合Trueを返すこと(self):
            mock_dao = Mock(spec=BaseDao)
            mock_dao.get_version.return_value = 1
            
            mock_entity = Mock(spec=BaseModel)
            mock_entity.id = 1
            mock_version = Mock(spec=Version)
            mock_version.value = 1
            mock_entity.version.return_value = mock_version
            
            repository = ConcreteRepository(mock_dao)
            
            result = repository._is_latest_version(mock_entity)
            
            assert result is True
            mock_dao.get_version.assert_called_once_with(1)

        def test_エンティティが古いバージョンの場合Falseを返すこと(self):
            mock_dao = Mock(spec=BaseDao)
            mock_dao.get_version.return_value = 2
            
            mock_entity = Mock(spec=BaseModel)
            mock_entity.id = 1
            mock_version = Mock(spec=Version)
            mock_version.value = 1
            mock_entity.version.return_value = mock_version
            
            repository = ConcreteRepository(mock_dao)
            
            result = repository._is_latest_version(mock_entity)
            
            assert result is False
            mock_dao.get_version.assert_called_once_with(1)

        def test_エンティティにIDが設定されていない場合例外を発生させること(self):
            mock_dao = Mock(spec=BaseDao)
            mock_entity = Mock(spec=BaseModel)
            mock_entity.id = None
            
            repository = ConcreteRepository(mock_dao)
            
            with pytest.raises(ValueError, match="エンティティにIDが設定されていません"):
                repository._is_latest_version(mock_entity)

        def test_エンティティにid属性がない場合例外を発生させること(self):
            mock_dao = Mock(spec=BaseDao)
            mock_entity = Mock(spec=BaseModel)
            # idアトリビュートを削除
            if hasattr(mock_entity, 'id'):
                delattr(mock_entity, 'id')
            
            repository = ConcreteRepository(mock_dao)
            
            with pytest.raises(ValueError, match="エンティティにIDが設定されていません"):
                repository._is_latest_version(mock_entity)