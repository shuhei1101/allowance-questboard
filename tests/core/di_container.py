import pytest
from unittest.mock import Mock
from aqapi.core.di_container import DIContainer, injector


class TestDIContainer:
    """DIコンテナのテストクラス"""

    def setup_method(self):
        """各テストの前にDIコンテナをリセット"""
        self.container = DIContainer()

    class TestRegister:
        """registerメソッドのテスト"""
        
        def setup_method(self):
            self.container = DIContainer()
            
        def test_シングルトンの登録と取得ができること(self):
            """シングルトンインスタンスの登録と取得をテスト"""
            # Arrange
            mock_instance = Mock()
            
            # Act
            self.container.register(Mock, mock_instance)
            result = self.container.get(Mock)
            
            # Assert
            assert result is mock_instance

    class TestRegisterMultiple:
        """register_multipleメソッドのテスト"""
        
        def setup_method(self):
            self.container = DIContainer()
            
        def test_複数インスタンスの登録と取得ができること(self):
            """複数インスタンスの登録と取得をテスト"""
            # Arrange
            mock1 = Mock()
            mock2 = Mock()
            mock_instances = [mock1, mock2]
            
            # Act
            self.container.register_multiple(Mock, mock_instances)
            result = self.container.get(Mock)
            
            # Assert
            assert result is mock_instances

    class TestGet:
        """getメソッドのテスト"""
        
        def setup_method(self):
            self.container = DIContainer()
            
        def test_登録されていない型の取得で例外が発生すること(self):
            """登録されていない型の取得で適切な例外が発生することをテスト"""
            # Act & Assert
            with pytest.raises(KeyError):
                self.container.get(str)

    class TestReset:
        """resetメソッドのテスト"""
        
        def setup_method(self):
            self.container = DIContainer()
            
        def test_resetでクリアができること(self):
            """resetメソッドが正しく動作することをテスト"""
            # Arrange
            mock_instance = Mock()
            self.container.register(Mock, mock_instance)
            
            # Act
            self.container.reset()
            
            # Assert
            with pytest.raises(KeyError):
                self.container.get(Mock)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])