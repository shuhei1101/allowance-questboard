import pytest
from aqapi.icon.domain.value_object.icon_category_description import IconCategoryDescription


class TestIconCategoryDescription:
    """IconCategoryDescriptionクラスのテスト"""

    class Test___init__:
        """__init__メソッドのテスト"""

        def test_正常な文字列で値オブジェクトが作成できること(self):
            # 準備
            value = "アイコンカテゴリの説明"
            
            # 実行
            icon_category_description = IconCategoryDescription(value)
            
            # 検証
            assert icon_category_description._value == value

        def test_空文字列で値オブジェクトが作成できること(self):
            # 準備
            value = ""
            
            # 実行
            icon_category_description = IconCategoryDescription(value)
            
            # 検証
            assert icon_category_description._value == value

        def test_長い文字列で値オブジェクトが作成できること(self):
            # 準備
            value = "とても長いアイコンカテゴリの説明です。" * 100
            
            # 実行
            icon_category_description = IconCategoryDescription(value)
            
            # 検証
            assert icon_category_description._value == value

        def test_数字のみの文字列で値オブジェクトが作成できること(self):
            # 準備
            value = "12345"
            
            # 実行
            icon_category_description = IconCategoryDescription(value)
            
            # 検証
            assert icon_category_description._value == value

        def test_特殊文字を含む文字列で値オブジェクトが作成できること(self):
            # 準備
            value = "アイコン@カテゴリ#説明!?%"
            
            # 実行
            icon_category_description = IconCategoryDescription(value)
            
            # 検証
            assert icon_category_description._value == value

        def test_改行文字を含む文字列で値オブジェクトが作成できること(self):
            # 準備
            value = "アイコンカテゴリの\n説明です\nテスト"
            
            # 実行
            icon_category_description = IconCategoryDescription(value)
            
            # 検証
            assert icon_category_description._value == value

        def test_スペースのみの文字列で値オブジェクトが作成できること(self):
            # 準備
            value = "   "
            
            # 実行
            icon_category_description = IconCategoryDescription(value)
            
            # 検証
            assert icon_category_description._value == value

    class Test__validate:
        """_validateメソッドのテスト"""

        def test_validateメソッドが例外を投げないこと(self):
            # 準備
            icon_category_description = IconCategoryDescription("テスト説明")
            
            # 実行・検証（例外が発生しないことを確認）
            try:
                icon_category_description._validate()
            except Exception as e:
                pytest.fail(f"_validateメソッドで予期しない例外が発生しました: {e}")

    class Test_equality:
        """等価性のテスト"""

        def test_同じ値のオブジェクト同士は等価であること(self):
            # 準備
            value = "同じ説明"
            description1 = IconCategoryDescription(value)
            description2 = IconCategoryDescription(value)
            
            # 実行・検証
            assert description1._value == description2._value

        def test_異なる値のオブジェクト同士は非等価であること(self):
            # 準備
            description1 = IconCategoryDescription("説明1")
            description2 = IconCategoryDescription("説明2")
            
            # 実行・検証
            assert description1._value != description2._value
