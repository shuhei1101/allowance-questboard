from typing import Union
from aqapi.core.messages.locale_string import LocaleString

class ErrorMessages:

    # 単項目バリデーション用メッセージ
    def required(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は必須です",
            en=f"{value_name.en} is required"
        )
    
    def max_length(self, value_name: LocaleString, max_length: int) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は{max_length}文字以下で入力してください",
            en=f"{value_name.en} must be at most {max_length} characters long"
        )
    
    def min_length(self, value_name: LocaleString, min_length: int) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は{min_length}文字以上で入力してください",
            en=f"{value_name.en} must be at least {min_length} characters long"
        )
    
    def alphanumeric(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は半角英数字で入力してください",
            en=f"{value_name.en} must contain only alphanumeric characters"
        )
    
    def email_format(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}の形式が正しくありません",
            en=f"{value_name.en} format is invalid"
        )
    
    def phone_format(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}の形式が正しくありません（例: 090-1234-5678）",
            en=f"{value_name.en} format is invalid (e.g., 090-1234-5678)"
        )
    
    def zip_code_format(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}の形式が正しくありません（例: 123-4567）",
            en=f"{value_name.en} format is invalid (e.g., 123-4567)"
        )
    
    def url_format(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}の形式が正しくありません（例: https://example.com）",
            en=f"{value_name.en} format is invalid (e.g., https://example.com)"
        )
    
    def date_format(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}の形式が正しくありません（例: 2023-12-31）",
            en=f"{value_name.en} format is invalid (e.g., 2023-12-31)"
        )
    
    def numeric_format(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は数値で入力してください",
            en=f"{value_name.en} must be a number"
        )
    
    def integer_format(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は整数で入力してください",
            en=f"{value_name.en} must be an integer"
        )
    
    def positive_integer_format(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は正の整数で入力してください",
            en=f"{value_name.en} must be a positive integer"
        )
    
    def min_value(self, value_name: LocaleString, min_value: Union[int, float]) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は{min_value}以上で入力してください",
            en=f"{value_name.en} must be at least {min_value}"
        )
    
    def max_value(self, value_name: LocaleString, max_value: Union[int, float]) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は{max_value}以下で入力してください",
            en=f"{value_name.en} must be at most {max_value}"
        )
    
    def range_value(self, value_name: LocaleString, min_value: Union[int, float], max_value: Union[int, float]) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は{min_value}から{max_value}の範囲で入力してください",
            en=f"{value_name.en} must be between {min_value} and {max_value}"
        )
    
    def password_length(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}は8文字以上で入力してください",
            en=f"{value_name.en} must be at least 8 characters long"
        )
    
    def password_contains_alpha(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}には英字を含めてください",
            en=f"{value_name.en} must contain alphabetic characters"
        )
    
    def password_contains_digit(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}には数字を含めてください",
            en=f"{value_name.en} must contain numeric characters"
        )
    
    def password_contains_symbol(self, value_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}には記号を含めてください",
            en=f"{value_name.en} must contain symbol characters"
        )
    
    def contains_only(self, value_name: LocaleString, allowed_chars: str) -> LocaleString:
        return LocaleString(
            ja=f"{value_name.ja}には{allowed_chars}の文字のみ使用してください",
            en=f"{value_name.en} must contain only {allowed_chars} characters"
        )
    
    # RelationValidator用メッセージ
    def confirmation_mismatch(self, field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{field_name.ja}と確認用{field_name.ja}が一致しません",
            en=f"{field_name.en} and confirmation {field_name.en} do not match"
        )
    
    def date_range_invalid(self, start_field_name: LocaleString, end_field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{start_field_name.ja}は{end_field_name.ja}より前の日付で入力してください",
            en=f"{start_field_name.en} must be earlier than {end_field_name.en}"
        )
    
    def datetime_range_invalid(self, start_field_name: LocaleString, end_field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{start_field_name.ja}は{end_field_name.ja}より前の日時で入力してください",
            en=f"{start_field_name} must be earlier than {end_field_name}"
        )
    
    def greater_than_invalid(self, value_field_name: LocaleString, compare_field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_field_name.ja}は{compare_field_name.ja}より大きい値で入力してください",
            en=f"{value_field_name.en} must be greater than {compare_field_name.en}"
        )
    
    def greater_than_or_equal_invalid(self, value_field_name: LocaleString, compare_field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_field_name.ja}は{compare_field_name.ja}以上で入力してください",
            en=f"{value_field_name.en} must be greater than or equal to {compare_field_name.en}"
        )
    
    def less_than_invalid(self, value_field_name: LocaleString, compare_field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_field_name.ja}は{compare_field_name.ja}より小さい値で入力してください",
            en=f"{value_field_name.en} must be less than {compare_field_name.en}"
        )
    
    def less_than_or_equal_invalid(self, value_field_name: LocaleString, compare_field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_field_name.ja}は{compare_field_name.ja}以下で入力してください",
            en=f"{value_field_name.en} must be less than or equal to {compare_field_name.en}"
        )
    
    def not_equal_invalid(self, value_field_name: LocaleString, compare_field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{value_field_name.ja}と{compare_field_name.ja}は異なる値で入力してください",
            en=f"{value_field_name.en} and {compare_field_name.en} must be different values"
        )
    
    def age_consistency_invalid(self, field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{field_name.ja}と生年月日が一致しません",
            en=f"{field_name.en} and birth date are inconsistent"
        )
    
    def dependency_invalid(self, dependent_field_name: LocaleString, required_field_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{dependent_field_name.ja}が設定されている場合、{required_field_name.ja}も必須です",
            en=f"When {dependent_field_name.en} is set, {required_field_name.en} is also required"
        )
    
    def mutual_exclusion_invalid(self, field1_name: LocaleString, field2_name: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{field1_name.ja}と{field2_name.ja}は同時に設定できません",
            en=f"{field1_name.en} and {field2_name.en} cannot be set at the same time"
        )
    
    def quantity_consistency_invalid(self, total_field_name: LocaleString, part_field_names: LocaleString) -> LocaleString:
        return LocaleString(
            ja=f"{total_field_name.ja}と{part_field_names.ja}の合計が一致しません",
            en=f"{total_field_name.en} and the sum of {part_field_names.en} do not match"
        )

error_messages = ErrorMessages()
