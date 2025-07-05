import pytest
from aqapi.core.domain.value_object.version import Version
from aqapi.core.constants.error_messages import ERR_MSGS


class TestVersion:

    class Test_init:
        
        def test_正常な値でVersionオブジェクトを作成できること(self):
            version = Version(1)
            assert version.value == 1

        def test_無効な値の場合ValueError例外が発生すること(self):
            with pytest.raises(ValueError) as exc_info:
                Version(0)
            assert str(exc_info.value) == ERR_MSGS.VERSION_TOO_LOW

    class Test_next:
        
        def test_バージョンを1つ進めることができること(self):
            version = Version(1)
            version.next()
            assert version.value == 2

    class Test___eq__:
        
        def test_同じ値のVersionオブジェクト同士が等しいこと(self):
            version1 = Version(1)
            version2 = Version(1)
            assert version1 == version2

        def test_異なる値のVersionオブジェクト同士が等しくないこと(self):
            version1 = Version(1)
            version2 = Version(2)
            assert version1 != version2

        def test_Versionオブジェクトと他の型が等しくないこと(self):
            version = Version(1)
            assert version != 1
            assert version != "1"
            assert version != None


if __name__ == "__main__":
    pytest.main([__file__, "-v"])