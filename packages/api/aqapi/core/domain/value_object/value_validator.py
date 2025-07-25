import re
from typing import Any, TypeVar, Union, Optional
from datetime import datetime

from aqapi.core.constants.error_messages import error_messages

class ValueValidateException(Exception):
    """カスタム例外クラス"""
    def __init__(self, value_name: str, error_type: str, message: str):
        super().__init__(message)
        self.value_name = value_name
        self.error_type = error_type
        self.message = message

class ValueValidator:
    """値オブジェクトのバリデーションを提供するクラス"""

    def __init__(self, value_name: str, value: Any = None):
        self._value_name = value_name  # 値の名前
        self._value = value  # 値
    
    # 基本バリデーション
    def validate_required(self, option_message: Optional[str] = None) -> None:
        """必須チェック - 値が存在するかどうかを確認"""
        if self._value is None or (isinstance(self._value, str) and self._value.strip() == ""):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="required",
                message=error_messages.required(self._value_name) if option_message is None else option_message
            )
    
    def validate_max_length(self, max_length: int, option_message: Optional[str] = None) -> None:
        """最大文字数チェック"""
        if len(self._value) > max_length:
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="max_length",
                message=error_messages.max_length(self._value_name, max_length) if option_message is None else option_message
            )
    
    def validate_min_length(self, min_length: int, option_message: Optional[str] = None) -> None:
        """最小文字数チェック"""
        if len(self._value) < min_length:
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="min_length",
                message=error_messages.min_length(self._value_name, min_length) if option_message is None else option_message
            )
    
    def validate_alphanumeric(self, option_message: Optional[str] = None) -> None:
        """半角英数字チェック"""
        if not re.match(r'^[a-zA-Z0-9]+$', self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="alphanumeric",
                message=error_messages.alphanumeric(self._value_name) if option_message is None else option_message
            )
    
    # フォーマットバリデーション
    def validate_email(self, option_message: Optional[str] = None) -> None:
        """メールアドレス形式チェック"""
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="email_format",
                message=error_messages.email_format(self._value_name) if option_message is None else option_message
            )
    
    def validate_phone(self, option_message: Optional[str] = None) -> None:
        """電話番号形式チェック（日本形式: 090-1234-5678 など）"""
        phone_pattern = r'^0\d{1,4}-\d{1,4}-\d{4}$'
        if not re.match(phone_pattern, self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="phone_format",
                message=error_messages.phone_format(self._value_name) if option_message is None else option_message
            )
    
    def validate_zip_code(self, option_message: Optional[str] = None) -> None:
        """郵便番号形式チェック（日本形式: 123-4567）"""
        zip_pattern = r'^\d{3}-\d{4}$'
        if not re.match(zip_pattern, self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="zip_code_format",
                message=error_messages.zip_code_format(self._value_name) if option_message is None else option_message
            )
    
    def validate_url(self, option_message: Optional[str] = None) -> None:
        """URL形式チェック"""
        url_pattern = r'^https?://[^\s/$.?#].[^\s]*$'
        if not re.match(url_pattern, self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="url_format",
                message=error_messages.url_format(self._value_name) if option_message is None else option_message
            )
    
    def validate_date_format(self, option_message: Optional[str] = None) -> None:
        """日付形式チェック（YYYY-MM-DD）"""
        try:
            datetime.strptime(self._value, '%Y-%m-%d')
        except ValueError:
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="date_format",
                message=error_messages.date_format(self._value_name) if option_message is None else option_message
            )
    
    # 数値バリデーション
    def validate_numeric(self, option_message: Optional[str] = None) -> None:
        """数値チェック"""
        try:
            float(self._value)
        except (ValueError, TypeError):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="numeric_format",
                message=error_messages.numeric_format(self._value_name) if option_message is None else option_message
            )
    
    def validate_integer(self, option_message: Optional[str] = None) -> None:
        """整数チェック"""
        try:
            int(self._value)
        except (ValueError, TypeError):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="integer_format",
                message=error_messages.integer_format(self._value_name) if option_message is None else option_message
            )
    
    def validate_min_value(self, min_value: Union[int, float], option_message: Optional[str] = None) -> None:
        """最小値チェック"""
        if self._value < min_value:
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="min_value",
                message=error_messages.min_value(self._value_name, min_value) if option_message is None else option_message
            )
    
    def validate_max_value(self, max_value: Union[int, float], option_message: Optional[str] = None) -> None:
        """最大値チェック"""
        if self._value > max_value:
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="max_value",
                message=error_messages.max_value(self._value_name, max_value) if option_message is None else option_message
            )
    
    def validate_range(self, min_value: Union[int, float], max_value: Union[int, float], option_message: Optional[str] = None) -> None:
        """範囲チェック"""
        if not (min_value <= self._value <= max_value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="range_value",
                message=error_messages.range_value(self._value_name, min_value, max_value) if option_message is None else option_message
            )
    
    # 追加バリデーション
    def validate_password_strength(self, option_message: Optional[str] = None) -> None:
        """パスワード強度チェック（8文字以上、英数字記号を含む）"""
        if len(self._value) < 8:
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="password_length",
                message=error_messages.password_length(self._value_name) if option_message is None else option_message
            )
        if not re.search(r'[a-zA-Z]', self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="password_contains_alpha",
                message=error_messages.password_contains_alpha(self._value_name) if option_message is None else option_message
            )
        if not re.search(r'\d', self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="password_contains_digit",
                message=error_messages.password_contains_digit(self._value_name) if option_message is None else option_message
            )
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="password_contains_symbol",
                message=error_messages.password_contains_symbol(self._value_name) if option_message is None else option_message
            )
    
    def validate_contains_only(self, allowed_chars: str, option_message: Optional[str] = None) -> None:
        """許可された文字のみを含むかチェック"""
        pattern = f'^[{re.escape(allowed_chars)}]+$'
        if not re.match(pattern, self._value):
            raise ValueValidateException(
                value_name=self._value_name,
                error_type="contains_only",
                message=error_messages.contains_only(self._value_name, allowed_chars) if option_message is None else option_message
            )
  