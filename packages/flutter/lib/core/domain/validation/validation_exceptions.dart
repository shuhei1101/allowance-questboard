import 'package:allowance_questboard/core/messages/locale_string.dart';

/// バリデーション例外のベースクラス
abstract class ValidationException implements Exception {
  final String errorType;
  final LocaleString message;
  
  const ValidationException(this.errorType, this.message);
  
  @override
  String toString() => message.toString();
}

/// 値オブジェクトのバリデーション例外
class ValueValidationException extends ValidationException {
  final LocaleString valueName;
  
  const ValueValidationException({
    required this.valueName,
    required String errorType,
    required LocaleString message,
  }) : super(errorType, message);
}

/// 関連バリデーション例外
class RelationValidationException extends ValidationException {
  const RelationValidationException({
    required String errorType,
    required LocaleString message,
  }) : super(errorType, message);
}
