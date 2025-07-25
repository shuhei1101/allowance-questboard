from typing import Union

from aqapi.language.domain.language_type import LanguageType


class ErrorMessages:

    def __init__(self):
        """初期化時に日本語をデフォルトとして設定"""
        self.language_type = LanguageType.JAPANESE

    def set_language_type(self, language_type: LanguageType) -> None:
        """言語IDを設定"""
        self.language_type = language_type

    def _get_message(self, ja: str, en: str) -> str:
        """言語タイプに基づいてメッセージを取得"""
        if self.language_type == LanguageType.ENGLISH:
            return en
        return ja  # デフォルト: 日本語

    # 単項目バリデーション用メッセージ
    def required(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}は必須です",
            en=f"{value_name} is required"
        )
    
    def max_length(self, value_name: str, max_length: int) -> str:
        return self._get_message(
            ja=f"{value_name}は{max_length}文字以下で入力してください",
            en=f"{value_name} must be at most {max_length} characters long"
        )
    
    def min_length(self, value_name: str, min_length: int) -> str:
        return self._get_message(
            ja=f"{value_name}は{min_length}文字以上で入力してください",
            en=f"{value_name} must be at least {min_length} characters long"
        )
    
    def alphanumeric(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}は半角英数字で入力してください",
            en=f"{value_name} must contain only alphanumeric characters"
        )
    
    def email_format(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}の形式が正しくありません",
            en=f"{value_name} format is invalid"
        )
    
    def phone_format(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}の形式が正しくありません（例: 090-1234-5678）",
            en=f"{value_name} format is invalid (e.g., 090-1234-5678)"
        )
    
    def zip_code_format(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}の形式が正しくありません（例: 123-4567）",
            en=f"{value_name} format is invalid (e.g., 123-4567)"
        )
    
    def url_format(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}の形式が正しくありません（例: https://example.com）",
            en=f"{value_name} format is invalid (e.g., https://example.com)"
        )
    
    def date_format(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}の形式が正しくありません（例: 2023-12-31）",
            en=f"{value_name} format is invalid (e.g., 2023-12-31)"
        )
    
    def numeric_format(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}は数値で入力してください",
            en=f"{value_name} must be a number"
        )
    
    def integer_format(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}は整数で入力してください",
            en=f"{value_name} must be an integer"
        )
    
    def min_value(self, value_name: str, min_value: Union[int, float]) -> str:
        return self._get_message(
            ja=f"{value_name}は{min_value}以上で入力してください",
            en=f"{value_name} must be at least {min_value}"
        )
    
    def max_value(self, value_name: str, max_value: Union[int, float]) -> str:
        return self._get_message(
            ja=f"{value_name}は{max_value}以下で入力してください",
            en=f"{value_name} must be at most {max_value}"
        )
    
    def range_value(self, value_name: str, min_value: Union[int, float], max_value: Union[int, float]) -> str:
        return self._get_message(
            ja=f"{value_name}は{min_value}から{max_value}の範囲で入力してください",
            en=f"{value_name} must be between {min_value} and {max_value}"
        )
    
    def password_length(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}は8文字以上で入力してください",
            en=f"{value_name} must be at least 8 characters long"
        )
    
    def password_contains_alpha(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}には英字を含めてください",
            en=f"{value_name} must contain alphabetic characters"
        )
    
    def password_contains_digit(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}には数字を含めてください",
            en=f"{value_name} must contain numeric characters"
        )
    
    def password_contains_symbol(self, value_name: str) -> str:
        return self._get_message(
            ja=f"{value_name}には記号を含めてください",
            en=f"{value_name} must contain symbol characters"
        )
    
    def contains_only(self, value_name: str, allowed_chars: str) -> str:
        return self._get_message(
            ja=f"{value_name}には{allowed_chars}の文字のみ使用してください",
            en=f"{value_name} must contain only {allowed_chars} characters"
        )
    
    # RelationValidator用メッセージ
    def confirmation_mismatch(self, field_name: str) -> str:
        return self._get_message(
            ja=f"{field_name}と確認用{field_name}が一致しません",
            en=f"{field_name} and confirmation {field_name} do not match"
        )
    
    def date_range_invalid(self, start_field_name: str, end_field_name: str) -> str:
        return self._get_message(
            ja=f"{start_field_name}は{end_field_name}より前の日付で入力してください",
            en=f"{start_field_name} must be earlier than {end_field_name}"
        )
    
    def datetime_range_invalid(self, start_field_name: str, end_field_name: str) -> str:
        return self._get_message(
            ja=f"{start_field_name}は{end_field_name}より前の日時で入力してください",
            en=f"{start_field_name} must be earlier than {end_field_name}"
        )
    
    def greater_than_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return self._get_message(
            ja=f"{value_field_name}は{compare_field_name}より大きい値で入力してください",
            en=f"{value_field_name} must be greater than {compare_field_name}"
        )
    
    def greater_than_or_equal_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return self._get_message(
            ja=f"{value_field_name}は{compare_field_name}以上で入力してください",
            en=f"{value_field_name} must be greater than or equal to {compare_field_name}"
        )
    
    def less_than_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return self._get_message(
            ja=f"{value_field_name}は{compare_field_name}より小さい値で入力してください",
            en=f"{value_field_name} must be less than {compare_field_name}"
        )
    
    def less_than_or_equal_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return self._get_message(
            ja=f"{value_field_name}は{compare_field_name}以下で入力してください",
            en=f"{value_field_name} must be less than or equal to {compare_field_name}"
        )
    
    def not_equal_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return self._get_message(
            ja=f"{value_field_name}と{compare_field_name}は異なる値で入力してください",
            en=f"{value_field_name} and {compare_field_name} must be different values"
        )
    
    def age_consistency_invalid(self, field_name: str) -> str:
        return self._get_message(
            ja=f"{field_name}と生年月日が一致しません",
            en=f"{field_name} and birth date are inconsistent"
        )
    
    def dependency_invalid(self, dependent_field_name: str, required_field_name: str) -> str:
        return self._get_message(
            ja=f"{dependent_field_name}が設定されている場合、{required_field_name}も必須です",
            en=f"When {dependent_field_name} is set, {required_field_name} is also required"
        )
    
    def mutual_exclusion_invalid(self, field1_name: str, field2_name: str) -> str:
        return self._get_message(
            ja=f"{field1_name}と{field2_name}は同時に設定できません",
            en=f"{field1_name} and {field2_name} cannot be set at the same time"
        )
    
    def quantity_consistency_invalid(self, total_field_name: str, part_field_names: str) -> str:
        return self._get_message(
            ja=f"{total_field_name}と{part_field_names}の合計が一致しません",
            en=f"{total_field_name} and the sum of {part_field_names} do not match"
        )

error_messages = ErrorMessages()
