import 'package:allowance_questboard/core/state/error_message.dart';

/// バリデーションエラー例外
class ValidationException implements Exception {
  final ErrorMessage errorMessage;
  
  ValidationException(String message) : errorMessage = ErrorMessage(message);
}

/// バリデーション機能を提供するmixin
/// BaseStateObjectと組み合わせて使用し、様々な入力検証を行う
mixin ValidationMixin {
  /// 必須入力チェック
  /// 
  /// :param dynamic value: チェック対象の値
  /// :param String message: エラー時に表示するメッセージ
  /// :throws ValidationException: バリデーションエラーが発生した場合
  void validateRequired(dynamic value, String message) {
    if (value == null) throw ValidationException(message);
    
    if (value is String && value.trim().isEmpty) {
      throw ValidationException(message);
    }
  }

  /// 文字数制限チェック（最小文字数）
  /// 
  /// :param String? value: チェック対象の文字列
  /// :param int minLength: 最小文字数
  /// :param String message: エラー時に表示するメッセージ
  /// :throws ValidationException: バリデーションエラーが発生した場合
  void validateMinLength(String? value, int minLength, String message) {
    if (value == null || value.length < minLength) {
      throw ValidationException(message);
    }
  }

  /// 文字数制限チェック（最大文字数）
  /// 
  /// :param String? value: チェック対象の文字列
  /// :param int maxLength: 最大文字数
  /// :param String message: エラー時に表示するメッセージ
  /// :throws ValidationException: バリデーションエラーが発生した場合
  void validateMaxLength(String? value, int maxLength, String message) {
    if (value != null && value.length > maxLength) {
      throw ValidationException(message);
    }
  }

  /// 正の整数チェック
  /// 
  /// :param dynamic value: チェック対象の値
  /// :param String message: エラー時に表示するメッセージ
  /// :throws ValidationException: バリデーションエラーが発生した場合
  void validatePositiveInteger(dynamic value, String message) {
    if (value == null) throw ValidationException(message);
    
    int? intValue;
    if (value is int) {
      intValue = value;
    } else if (value is String) {
      intValue = int.tryParse(value);
    }
    
    if (intValue == null || intValue <= 0) {
      throw ValidationException(message);
    }
  }

  /// 数値範囲チェック
  /// 
  /// :param dynamic value: チェック対象の値
  /// :param num min: 最小値（含む）
  /// :param num max: 最大値（含む）
  /// :param String message: エラー時に表示するメッセージ
  /// :throws ValidationException: バリデーションエラーが発生した場合
  void validateNumberRange(dynamic value, num min, num max, String message) {
    if (value == null) throw ValidationException(message);
    
    num? numValue;
    if (value is num) {
      numValue = value;
    } else if (value is String) {
      numValue = num.tryParse(value);
    }
    
    if (numValue == null || numValue < min || numValue > max) {
      throw ValidationException(message);
    }
  }
}
