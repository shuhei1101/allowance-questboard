import pytest
from datetime import datetime
from abc import ABC
from aqapi.core.domain.base_model import BaseModel
from aqapi.core.domain.value_object.version import Version
from aqapi.auth.domain.user import User


class ConcreteModel(BaseModel):
    """テスト用の具象モデル"""
    
    def __init__(self, version: Version = Version(1)):
        super().__init__(version)


class TestBaseModel:
    """BaseModelクラスのテスト"""
    
    class Test___init__:
        """__init__メソッドのテスト"""
        
        def test_バージョンを指定してモデルが作成できること(self):
            # 準備
            version = Version(3)
            
            # 実行
            model = ConcreteModel(version)
            
            # 検証
            assert model.version() == version
            assert model.version().value == 3
            assert model._is_updated is False
        
        def test_デフォルトでバージョン1のモデルが作成できること(self):
            # 実行
            model = ConcreteModel()
            
            # 検証
            assert model.version().value == 1
            assert model._is_updated is False
    
    class Test_version:
        """versionメソッドのテスト"""
        
        def test_設定されたバージョンが取得できること(self):
            # 準備
            version = Version(5)
            model = ConcreteModel(version)
            
            # 実行
            result = model.version()
            
            # 検証
            assert result == version
            assert result.value == 5
    
    class Test__update_version:
        """_update_versionメソッドのテスト"""
        
        def test_バージョンが1つ上がること(self):
            # 準備
            model = ConcreteModel(Version(2))
            
            # 実行
            model._update_version()
            
            # 検証
            assert model.version().value == 3
            assert model._is_updated is True
        
        def test_複数回呼び出してもバージョンは1つしか上がらないこと(self):
            # 準備
            model = ConcreteModel(Version(1))
            
            # 実行
            model._update_version()
            model._update_version()
            model._update_version()
            
            # 検証
            assert model.version().value == 2
            assert model._is_updated is True
    
    class Test_is_same_version:
        """is_same_versionメソッドのテスト"""
        
        def test_同じバージョンの場合はTrueを返すこと(self):
            # 準備
            model1 = ConcreteModel(Version(3))
            model2 = ConcreteModel(Version(3))
            
            # 実行
            result = model1.is_same_version(model2)
            
            # 検証
            assert result is True
        
        def test_異なるバージョンの場合はFalseを返すこと(self):
            # 準備
            model1 = ConcreteModel(Version(1))
            model2 = ConcreteModel(Version(2))
            
            # 実行
            result = model1.is_same_version(model2)
            
            # 検証
            assert result is False
        
        def test_BaseModel以外のオブジェクトの場合はNotImplementedを返すこと(self):
            # 準備
            model = ConcreteModel(Version(1))
            other = "not a model"  # type: ignore
            
            # 実行
            result = model.is_same_version(other)  # type: ignore
            
            # 検証
            assert result is NotImplemented
    
    class Test_abstract_class:
        """抽象クラスとしての性質のテスト"""
        
        def test_BaseModelは抽象クラスであること(self):
            # 検証
            assert issubclass(BaseModel, ABC)
