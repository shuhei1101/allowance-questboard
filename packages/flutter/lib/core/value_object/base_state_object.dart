import 'package:allowance_questboard/core/validator/validation_exceptions.dart' show ValidationException;
import 'package:allowance_questboard/core/validator/value_validator.dart' show ValueValidator;
import 'package:allowance_questboard/core/messages/locale_string.dart' show LocaleString;

abstract class BaseValueObject<ValueType> {
  final ValueType value;
  late LocaleString? errorMessage;
  late final ValueValidator validator;

  BaseValueObject(this.value) {
    try {
      validator = ValueValidator(
        valueName: valueName,
        value: value,
      );
      validate();
      errorMessage = null;
    } on ValidationException catch (e) {
      errorMessage = e.message;
    }
  }

  /// 値オブジェクトの名前を取得（サブクラスで実装）
  LocaleString get valueName;

  /// 有効な値かどうかを示す
  bool get isValid => errorMessage == null;

  /// デバッグ用の文字列表現を返す
  /// ログ出力時に使用する
  String toDebugString() {
    return 'valueName: $valueName, value: $value, errorMessage: $errorMessage';
  }

  /// 値を検証する
  /// エラーがある場合は `ValidationException` をthrowする
  void validate();

  @override
  int get hashCode => value.hashCode;

  @override
  bool operator ==(Object other) {
    if (other is! BaseValueObject<ValueType>) return false;
    return value == other.value;
  }
}
