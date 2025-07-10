import pytest
from unittest.mock import Mock
from aqapi.core.dao.base_dao import BaseDao


class TestBaseDao:
    """BaseDaoクラスのテスト"""

    class Test_抽象クラス:
        def test_BaseDaoが抽象クラスであること(self):
            # 準備
            mock_session = Mock()
            
            # 実行・検証
            with pytest.raises(TypeError):
                BaseDao(mock_session)

    class Test_get_version:
        def test_get_versionが抽象メソッドであること(self):
            # 準備
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
            
            mock_session = Mock()
            
            # 実行・検証
            with pytest.raises(TypeError):
                ConcretDao(mock_session)

        def test_具象クラスが正常に動作すること(self):
            # 準備
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
            
            # 実行
            version = dao.get_version(1)
            
            # 検証
            assert version == 1