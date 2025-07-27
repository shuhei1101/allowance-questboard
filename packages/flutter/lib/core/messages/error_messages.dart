import 'package:allowance_questboard/core/messages/locale_string.dart';

/// エラーメッセージクラス
/// APサーバ側のErrorMessagesと同じ構造を持つ
class ErrorMessages {
  // 単項目バリデーション用メッセージ
  LocaleString required(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}は必須です",
      en: "${valueName.en} is required",
    );
  }

  LocaleString maxLength(LocaleString valueName, int maxLength) {
    return LocaleString(
      ja: "${valueName.ja}は${maxLength}文字以下で入力してください",
      en: "${valueName.en} must be at most $maxLength characters long",
    );
  }

  LocaleString minLength(LocaleString valueName, int minLength) {
    return LocaleString(
      ja: "${valueName.ja}は${minLength}文字以上で入力してください",
      en: "${valueName.en} must be at least $minLength characters long",
    );
  }

  LocaleString alphanumeric(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}は半角英数字で入力してください",
      en: "${valueName.en} must contain only alphanumeric characters",
    );
  }

  LocaleString emailFormat(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}の形式が正しくありません",
      en: "${valueName.en} format is invalid",
    );
  }

  LocaleString phoneFormat(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}の形式が正しくありません（例: 090-1234-5678）",
      en: "${valueName.en} format is invalid (e.g., 090-1234-5678)",
    );
  }

  LocaleString urlFormat(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}の形式が正しくありません（例: https://example.com）",
      en: "${valueName.en} format is invalid (e.g., https://example.com)",
    );
  }

  LocaleString numericFormat(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}は数値で入力してください",
      en: "${valueName.en} must be a number",
    );
  }

  LocaleString integerFormat(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}は整数で入力してください",
      en: "${valueName.en} must be an integer",
    );
  }

  LocaleString minValue(LocaleString valueName, num minValue) {
    return LocaleString(
      ja: "${valueName.ja}は${minValue}以上で入力してください",
      en: "${valueName.en} must be at least $minValue",
    );
  }

  LocaleString maxValue(LocaleString valueName, num maxValue) {
    return LocaleString(
      ja: "${valueName.ja}は${maxValue}以下で入力してください",
      en: "${valueName.en} must be at most $maxValue",
    );
  }

  LocaleString rangeValue(LocaleString valueName, num minValue, num maxValue) {
    return LocaleString(
      ja: "${valueName.ja}は${minValue}から${maxValue}の範囲で入力してください",
      en: "${valueName.en} must be between $minValue and $maxValue",
    );
  }

  LocaleString passwordLength(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}は8文字以上で入力してください",
      en: "${valueName.en} must be at least 8 characters long",
    );
  }

  LocaleString passwordContainsAlpha(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}には英字を含めてください",
      en: "${valueName.en} must contain alphabetic characters",
    );
  }

  LocaleString passwordContainsDigit(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}には数字を含めてください",
      en: "${valueName.en} must contain numeric characters",
    );
  }

  LocaleString passwordContainsSymbol(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}には記号を含めてください",
      en: "${valueName.en} must contain symbol characters",
    );
  }

  LocaleString containsOnly(LocaleString valueName, String allowedChars) {
    return LocaleString(
      ja: "${valueName.ja}には${allowedChars}の文字のみ使用してください",
      en: "${valueName.en} must contain only $allowedChars characters",
    );
  }

  // RelationValidator用メッセージ（将来の拡張用）
  LocaleString confirmationMismatch(LocaleString fieldName) {
    return LocaleString(
      ja: "${fieldName.ja}と確認用${fieldName.ja}が一致しません",
      en: "${fieldName.en} and confirmation ${fieldName.en} do not match",
    );
  }

  LocaleString dateRangeInvalid(LocaleString startFieldName, LocaleString endFieldName) {
    return LocaleString(
      ja: "${startFieldName.ja}は${endFieldName.ja}より前の日付で入力してください",
      en: "${startFieldName.en} must be earlier than ${endFieldName.en}",
    );
  }

  /// 数値範囲エラー
  LocaleString range(LocaleString valueName, num minValue, num maxValue) {
    return LocaleString(
      ja: "${valueName.ja}は${minValue}以上${maxValue}以下で入力してください",
      en: "${valueName.en} must be between $minValue and $maxValue",
    );
  }

  /// パターン不一致エラー
  LocaleString patternMismatch(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}の形式が正しくありません",
      en: "${valueName.en} format is invalid",
    );
  }

  /// 文字数範囲エラー
  LocaleString lengthRange(LocaleString valueName, int minLength, int maxLength) {
    return LocaleString(
      ja: "${valueName.ja}は${minLength}文字以上${maxLength}文字以下で入力してください",
      en: "${valueName.en} must be between $minLength and $maxLength characters",
    );
  }

  /// 日付形式エラー
  LocaleString dateFormat(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}は正しい日付形式(YYYY-MM-DD)で入力してください",
      en: "${valueName.en} must be in valid date format (YYYY-MM-DD)",
    );
  }

  /// 時刻形式エラー
  LocaleString timeFormat(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}は正しい時刻形式(HH:MM)で入力してください",
      en: "${valueName.en} must be in valid time format (HH:MM)",
    );
  }

  /// リスト内包含エラー
  LocaleString notInList(LocaleString valueName) {
    return LocaleString(
      ja: "${valueName.ja}は許可された値ではありません",
      en: "${valueName.en} is not in the allowed values",
    );
  }
}

/// グローバルインスタンス（APサーバ側のerror_messagesと同様）
final errorMessages = ErrorMessages();
