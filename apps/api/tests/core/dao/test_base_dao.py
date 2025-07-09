import pytest
from unittest.mock import Mock
from aqapi.core.dao.base_dao import BaseDao


class TestBaseDao:
    """BaseDaoクラスのテスト"""

    def test_base_dao_is_abstract_class(self):
        """BaseDaoが抽象クラスであることを確認"""
        with pytest.raises(TypeError):
            BaseDao(Mock())

    def test_get_version_is_abstract_method(self):
        """get_versionが抽象メソッドであることを確認"""
        
        class ConcretDao(BaseDao):
            def fetch_all(self):
                return []
            
            def fetch_by_id(self, id: int):
                return None
            
            def update(self, entity):
                pass
            
            def delete(self, id: int):
                pass
            # get_versionメソッドを実装しない
        
        with pytest.raises(TypeError):
            ConcretDao(Mock())

    def test_concrete_dao_implementation(self):
        """具象クラスが正常に動作することを確認"""
        
        class ConcretDao(BaseDao):
            def fetch_all(self):
                return []
            
            def fetch_by_id(self, id: int):
                return None
            
            def update(self, entity):
                pass
            
            def delete(self, id: int):
                pass
            
            def get_version(self, id: int) -> int:
                return 1
        
        mock_session = Mock()
        dao = ConcretDao(mock_session)
        
        # get_versionメソッドが呼び出せることを確認
        version = dao.get_version(1)
        assert version == 1