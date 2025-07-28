from aqapi.core.messages.locale_string import LocaleString


class ValidationException(Exception):
    def __init__(self, error_type: str, message: LocaleString):
        super().__init__(message.en)
        self.error_type = error_type
        self.message = message

class ValueValidateException(ValidationException):
    """値オブジェクトのバリデーションエラーを表すカスタム例外クラス"""
    def __init__(self, value_name: LocaleString, error_type: str, message: LocaleString):
        super().__init__(error_type, message)
        self.value_name = value_name

class RelationValidateException(ValidationException):
    """関連バリデーションエラーを表すカスタム例外クラス"""
    def __init__(self, error_type: str, message: LocaleString):
        super().__init__(error_type, message)
