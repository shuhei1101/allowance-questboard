import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/state/validation/validation_exceptions.dart';
import 'package:allowance_questboard/core/messages/error_messages.dart';

/// バリューオブジェクトの値を検証するためのバリデータクラス
/// 様々な検証ルールを提供し、検証失敗時には適切な例外を投げる
class ValueValidator<T> {
  /// 検証対象の値名（多言語対応）
  final LocaleString valueName;
  
  /// 検証対象の値
  final T value;
  
  /// エラーメッセージ生成クラス
  final ErrorMessages errorMessages = ErrorMessages();

  /// コンストラクタ
  ValueValidator({
    required this.valueName,
    required this.value,
  });

  /// 必須チェック - 値が存在するかどうかを確認
  void required([LocaleString? optionMessage]) {
    if (value == null || 
        (value is String && (value as String).trim().isEmpty)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "required",
        message: optionMessage ?? errorMessages.required(valueName),
      );
    }
  }
  
  /// 最小文字数チェック
  void minLength(int minLength, [LocaleString? optionMessage]) {
    if (value is String && (value as String).length < minLength) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "min_length",
        message: optionMessage ?? errorMessages.minLength(valueName, minLength),
      );
    }
  }
  
  /// 最大文字数チェック
  void maxLength(int maxLength, [LocaleString? optionMessage]) {
    if (value is String && (value as String).length > maxLength) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "max_length",
        message: optionMessage ?? errorMessages.maxLength(valueName, maxLength),
      );
    }
  }
  
  /// 文字数範囲チェック
  void lengthRange(int minLength, int maxLength, [LocaleString? optionMessage]) {
    if (value is String) {
      int length = (value as String).length;
      if (length < minLength || length > maxLength) {
        throw ValueValidationException(
          valueName: valueName,
          errorType: "length_range",
          message: optionMessage ?? errorMessages.lengthRange(valueName, minLength, maxLength),
        );
      }
    }
  }
  
  /// 正規表現パターンチェック
  void pattern(String pattern, [LocaleString? optionMessage]) {
    if (value is String && !RegExp(pattern).hasMatch(value as String)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "pattern",
        message: optionMessage ?? errorMessages.patternMismatch(valueName),
      );
    }
  }
  
  /// 数値形式チェック
  void numeric([LocaleString? optionMessage]) {
    if (value is String) {
      if (num.tryParse(value as String) == null) {
        throw ValueValidationException(
          valueName: valueName,
          errorType: "numeric",
          message: optionMessage ?? errorMessages.numericFormat(valueName),
        );
      }
    } else if (value is! num) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "numeric",
        message: optionMessage ?? errorMessages.numericFormat(valueName),
      );
    }
  }
  
  /// 整数形式チェック
  void integer([LocaleString? optionMessage]) {
    if (value is String) {
      if (int.tryParse(value as String) == null) {
        throw ValueValidationException(
          valueName: valueName,
          errorType: "integer_format",
          message: optionMessage ?? errorMessages.integerFormat(valueName),
        );
      }
    } else if (value is! int) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "integer_format",
        message: optionMessage ?? errorMessages.integerFormat(valueName),
      );
    }
  }
  
  /// 最小値チェック
  void minValue(num minValue, [LocaleString? optionMessage]) {
    num? numValue;
    if (value is num) {
      numValue = value as num;
    } else if (value is String) {
      numValue = num.tryParse(value as String);
    }
    
    if (numValue == null || numValue < minValue) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "min_value",
        message: optionMessage ?? errorMessages.minValue(valueName, minValue),
      );
    }
  }
  
  /// 最大値チェック
  void maxValue(num maxValue, [LocaleString? optionMessage]) {
    num? numValue;
    if (value is num) {
      numValue = value as num;
    } else if (value is String) {
      numValue = num.tryParse(value as String);
    }
    
    if (numValue == null || numValue > maxValue) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "max_value",
        message: optionMessage ?? errorMessages.maxValue(valueName, maxValue),
      );
    }
  }
  
  /// 数値範囲チェック
  void range(num minValue, num maxValue, [LocaleString? optionMessage]) {
    num? numValue;
    if (value is num) {
      numValue = value as num;
    } else if (value is String) {
      numValue = num.tryParse(value as String);
    }
    
    if (numValue == null || numValue < minValue || numValue > maxValue) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "range",
        message: optionMessage ?? errorMessages.range(valueName, minValue, maxValue),
      );
    }
  }
  
  /// 半角英数字チェック
  void alphanumeric([LocaleString? optionMessage]) {
    if (value is String && 
        !RegExp(r'^[a-zA-Z0-9]+$').hasMatch(value as String)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "alphanumeric",
        message: optionMessage ?? errorMessages.alphanumeric(valueName),
      );
    }
  }
  
  /// メールアドレス形式チェック
  void email([LocaleString? optionMessage]) {
    if (value is String &&
        !RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$').hasMatch(value as String)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "email_format",
        message: optionMessage ?? errorMessages.emailFormat(valueName),
      );
    }
  }
  
  /// 電話番号形式チェック（日本形式）
  void phone([LocaleString? optionMessage]) {
    if (value is String &&
        !RegExp(r'^0\d{1,4}-\d{1,4}-\d{4}$').hasMatch(value as String)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "phone_format",
        message: optionMessage ?? errorMessages.phoneFormat(valueName),
      );
    }
  }
  
  /// URL形式チェック
  void url([LocaleString? optionMessage]) {
    if (value is String &&
        !RegExp(r'^https?://[^\s/$.?#].[^\s]*$').hasMatch(value as String)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "url_format",
        message: optionMessage ?? errorMessages.urlFormat(valueName),
      );
    }
  }
  
  /// 日付形式チェック（YYYY-MM-DD）
  void dateFormat([LocaleString? optionMessage]) {
    if (value is String &&
        !RegExp(r'^\d{4}-\d{2}-\d{2}$').hasMatch(value as String)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "date_format",
        message: optionMessage ?? errorMessages.dateFormat(valueName),
      );
    }
  }
  
  /// 時刻形式チェック（HH:MM）
  void timeFormat([LocaleString? optionMessage]) {
    if (value is String &&
        !RegExp(r'^\d{2}:\d{2}$').hasMatch(value as String)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "time_format",
        message: optionMessage ?? errorMessages.timeFormat(valueName),
      );
    }
  }
  
  /// リスト内包含チェック
  void inList(List<T> allowedValues, [LocaleString? optionMessage]) {
    if (!allowedValues.contains(value)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: "not_in_list",
        message: optionMessage ?? errorMessages.notInList(valueName),
      );
    }
  }
  
  /// カスタム検証
  void custom(bool Function(T) validator, String errorType, LocaleString errorMessage) {
    if (!validator(value)) {
      throw ValueValidationException(
        valueName: valueName,
        errorType: errorType,
        message: errorMessage,
      );
    }
  }
}
