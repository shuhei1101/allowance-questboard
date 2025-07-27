from aqapi.language.domain.language_type import LanguageType
from aqapi.core.messages.locale_string import LocaleString


class MessageTranslator:
    """メッセージ翻訳クラス"""

    def translate(self, message: LocaleString, language_type: LanguageType) -> str:
        """メッセージを指定された言語に翻訳"""
        if language_type == LanguageType.ENGLISH:
            return message.en
        return message.ja  # デフォルトは日本語
