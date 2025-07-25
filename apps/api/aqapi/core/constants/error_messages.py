from typing import Union

from aqapi.language.domain.value_object.language_code import LanguageCode


class ErrorMessages:
    def __init__(self, language: LanguageCode):
        self.language = language

    # 単項目バリデーション用メッセージ
    def required(self, value_name: str) -> str:
        return f"{value_name}は必須です"
    
    def max_length(self, value_name: str, max_length: int) -> str:
        return f"{value_name}は{max_length}文字以下で入力してください"
    
    def min_length(self, value_name: str, min_length: int) -> str:
        return f"{value_name}は{min_length}文字以上で入力してください"
    
    def alphanumeric(self, value_name: str) -> str:
        return f"{value_name}は半角英数字で入力してください"
    
    def email_format(self, value_name: str) -> str:
        return f"{value_name}の形式が正しくありません"
    
    def phone_format(self, value_name: str) -> str:
        return f"{value_name}の形式が正しくありません（例: 090-1234-5678）"
    
    def zip_code_format(self, value_name: str) -> str:
        return f"{value_name}の形式が正しくありません（例: 123-4567）"
    
    def url_format(self, value_name: str) -> str:
        return f"{value_name}の形式が正しくありません（例: https://example.com）"
    
    def date_format(self, value_name: str) -> str:
        return f"{value_name}の形式が正しくありません（例: 2023-12-31）"
    
    def numeric_format(self, value_name: str) -> str:
        return f"{value_name}は数値で入力してください"
    
    def integer_format(self, value_name: str) -> str:
        return f"{value_name}は整数で入力してください"
    
    def min_value(self, value_name: str, min_value: Union[int, float]) -> str:
        return f"{value_name}は{min_value}以上で入力してください"
    
    def max_value(self, value_name: str, max_value: Union[int, float]) -> str:
        return f"{value_name}は{max_value}以下で入力してください"
    
    def range_value(self, value_name: str, min_value: Union[int, float], max_value: Union[int, float]) -> str:
        return f"{value_name}は{min_value}から{max_value}の範囲で入力してください"
    
    def password_length(self, value_name: str) -> str:
        return f"{value_name}は8文字以上で入力してください"
    
    def password_contains_alpha(self, value_name: str) -> str:
        return f"{value_name}には英字を含めてください"
    
    def password_contains_digit(self, value_name: str) -> str:
        return f"{value_name}には数字を含めてください"
    
    def password_contains_symbol(self, value_name: str) -> str:
        return f"{value_name}には記号を含めてください"
    
    def contains_only(self, value_name: str, allowed_chars: str) -> str:
        return f"{value_name}には{allowed_chars}の文字のみ使用してください"
    
    # RelationValidator用メッセージ
    def confirmation_mismatch(self, field_name: str) -> str:
        return f"{field_name}と確認用{field_name}が一致しません"
    
    def date_range_invalid(self, start_field_name: str, end_field_name: str) -> str:
        return f"{start_field_name}は{end_field_name}より前の日付で入力してください"
    
    def datetime_range_invalid(self, start_field_name: str, end_field_name: str) -> str:
        return f"{start_field_name}は{end_field_name}より前の日時で入力してください"
    
    def greater_than_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return f"{value_field_name}は{compare_field_name}より大きい値で入力してください"
    
    def greater_than_or_equal_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return f"{value_field_name}は{compare_field_name}以上で入力してください"
    
    def less_than_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return f"{value_field_name}は{compare_field_name}より小さい値で入力してください"
    
    def less_than_or_equal_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return f"{value_field_name}は{compare_field_name}以下で入力してください"
    
    def not_equal_invalid(self, value_field_name: str, compare_field_name: str) -> str:
        return f"{value_field_name}と{compare_field_name}は異なる値で入力してください"
    
    def age_consistency_invalid(self, field_name: str) -> str:
        return f"{field_name}と生年月日が一致しません"
    
    def dependency_invalid(self, dependent_field_name: str, required_field_name: str) -> str:
        return f"{dependent_field_name}が設定されている場合、{required_field_name}も必須です"
    
    def mutual_exclusion_invalid(self, field1_name: str, field2_name: str) -> str:
        return f"{field1_name}と{field2_name}は同時に設定できません"
    
    def quantity_consistency_invalid(self, total_field_name: str, part_field_names: str) -> str:
        return f"{total_field_name}と{part_field_names}の合計が一致しません"

error_messages = ErrorMessages()
