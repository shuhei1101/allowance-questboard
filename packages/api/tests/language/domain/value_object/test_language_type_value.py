import pytest
from typing import TYPE_CHECKING
from unittest.mock import MagicMock

from aqapi.language.domain.value_object.language_type_value import LanguageTypeValue
from aqapi.language.domain.value_object.language_id import LanguageId
from aqapi.language.domain.value_object.language_code import LanguageCode
from aqapi.language.domain.value_object.language_name import LanguageName
from aqapi.shared.entity.sort_order import SortOrder
from aqapi.language.entity.languages_entity import LanguagesEntity
from aqapi.core.domain.value_object.value_validator import ValueValidateException

if TYPE_CHECKING:
    pass


class TestLanguageTypeValue:
    """LanguageTypeValueのテストクラス"""

    class Test__init__:
        """コンストラクタのテスト"""

        def test_全ての引数を指定して正常にインスタンス化できること(self) -> None:
            # 準備
            language_id = LanguageId(1)
            language_code = LanguageCode("1")  # integer()バリデーションのため数字文字列
            language_name = LanguageName("Japanese")
            is_active = True
            sort_order = SortOrder(1)

            # 実行
            language_type_value = LanguageTypeValue(
                id=language_id,
                code=language_code,
                name=language_name,
                is_active=is_active,
                sort_order=sort_order
            )

            # 検証
            assert language_type_value.id == language_id
            assert language_type_value.code == language_code
            assert language_type_value.name == language_name
            assert language_type_value.is_active == is_active
            assert language_type_value.sort_order == sort_order

        def test_IDのみ指定してデフォルト値でインスタンス化できること(self) -> None:
            # 準備
            language_id = LanguageId(1)

            # 実行
            language_type_value = LanguageTypeValue(id=language_id)

            # 検証
            assert language_type_value.id == language_id
            assert language_type_value.code == LanguageCode("0")  # デフォルトで有効な値
            assert language_type_value.name == LanguageName("Unknown")  # デフォルトで有効な値
            assert language_type_value.is_active is False
            assert language_type_value.sort_order == SortOrder(0)

        def test_言語コードに空文字を指定した場合requiredバリデーションエラーが発生すること(self) -> None:
            # 準備
            language_id = LanguageId(1)

            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                LanguageTypeValue(
                    id=language_id,
                    code=LanguageCode(""),  # 空文字は required() バリデーションで失敗
                    name=LanguageName("Japanese")
                )
            
            # エラータイプを検証
            assert exc_info.value.error_type == "required"

        def test_言語コードに非整数文字列を指定した場合integerバリデーションエラーが発生すること(self) -> None:
            # 準備
            language_id = LanguageId(1)

            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                LanguageTypeValue(
                    id=language_id,
                    code=LanguageCode("abc"),  # 非数字は integer() バリデーションで失敗
                    name=LanguageName("Japanese")
                )
            
            # エラータイプを検証
            assert exc_info.value.error_type == "integer_format"

        def test_言語名に空文字を指定した場合requiredバリデーションエラーが発生すること(self) -> None:
            # 準備
            language_id = LanguageId(1)

            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                LanguageTypeValue(
                    id=language_id,
                    code=LanguageCode("1"),
                    name=LanguageName(""),  # 空文字は required() バリデーションで失敗
                )
            
            # エラータイプを検証
            assert exc_info.value.error_type == "required"

    class Test_set_from_entity:
        """set_from_entityメソッドのテスト"""

        def test_エンティティから正常に値を設定できること(self) -> None:
            # 準備
            language_id = LanguageId(1)
            language_type_value = LanguageTypeValue(
                id=language_id,
                code=LanguageCode("1"),
                name=LanguageName("Temp")
            )
            
            entity = LanguagesEntity(
                id=1,
                code="2",  # integer()バリデーションのため数字文字列
                name="English",
                is_active=True,
                sort_order=2
            )

            # 実行
            language_type_value.set_from_entity(entity)

            # 検証
            assert language_type_value.id == language_id  # IDは変更されない
            assert language_type_value.code == LanguageCode("2")
            assert language_type_value.name == LanguageName("English")
            assert language_type_value.is_active is True
            assert language_type_value.sort_order == SortOrder(2)

        def test_エンティティに空の言語コードが含まれている場合requiredバリデーションエラーが発生すること(self) -> None:
            # 準備
            language_id = LanguageId(1)
            language_type_value = LanguageTypeValue(
                id=language_id,
                code=LanguageCode("1"),
                name=LanguageName("Temp")
            )
            
            entity = LanguagesEntity(
                id=1,
                code="",  # 空文字は required() バリデーションで失敗
                name="English",
                is_active=True,
                sort_order=2
            )

            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                language_type_value.set_from_entity(entity)
            
            # エラータイプを検証
            assert exc_info.value.error_type == "required"

        def test_エンティティに非整数の言語コードが含まれている場合integerバリデーションエラーが発生すること(self) -> None:
            # 準備
            language_id = LanguageId(1)
            language_type_value = LanguageTypeValue(
                id=language_id,
                code=LanguageCode("1"),
                name=LanguageName("Temp")
            )
            
            entity = LanguagesEntity(
                id=1,
                code="abc",  # 非数字は integer() バリデーションで失敗
                name="English",
                is_active=True,
                sort_order=2
            )

            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                language_type_value.set_from_entity(entity)
            
            # エラータイプを検証
            assert exc_info.value.error_type == "integer_format"

        def test_エンティティに空の言語名が含まれている場合requiredバリデーションエラーが発生すること(self) -> None:
            # 準備
            language_id = LanguageId(1)
            language_type_value = LanguageTypeValue(
                id=language_id,
                code=LanguageCode("1"),
                name=LanguageName("Temp")
            )
            
            entity = LanguagesEntity(
                id=1,
                code="2",
                name="",  # 空文字は required() バリデーションで失敗
                is_active=True,
                sort_order=2
            )

            # 実行・検証
            with pytest.raises(ValueValidateException) as exc_info:
                language_type_value.set_from_entity(entity)
            
            # エラータイプを検証
            assert exc_info.value.error_type == "required"

    class Test_properties:
        """プロパティのテスト"""

        def test_各プロパティが正しい値を返すこと(self) -> None:
            # 準備
            language_id = LanguageId(1)
            language_code = LanguageCode("1")  # integer()バリデーションのため数字文字列
            language_name = LanguageName("Japanese")
            is_active = True
            sort_order = SortOrder(1)

            language_type_value = LanguageTypeValue(
                id=language_id,
                code=language_code,
                name=language_name,
                is_active=is_active,
                sort_order=sort_order
            )

            # 実行・検証
            assert language_type_value.id == language_id
            assert language_type_value.code == language_code
            assert language_type_value.name == language_name
            assert language_type_value.is_active == is_active
            assert language_type_value.sort_order == sort_order


if __name__ == "__main__":
    pytest.main([__file__])
