import pytest
from unittest.mock import Mock
from aqapi.core.dao.base_dao import BaseDao


class TestBaseDao:
    """BaseDaoクラスのテスト"""

    class Test_抽象クラス:
        def test_BaseDaoが抽象クラスであること(self):
            with pytest.raises(TypeError):
                BaseDao(Mock())

    class Test_get_version:
        def test_get_versionが抽象メソッドであること(self):
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

        def test_具象クラスが正常に動作すること(self):
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
            
            version = dao.get_version(1)
            assert version == 1