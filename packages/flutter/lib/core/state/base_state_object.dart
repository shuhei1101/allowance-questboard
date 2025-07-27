import 'package:allowance_questboard/core/domain/validation/value_validator.dart' show ValueValidator;
import 'package:allowance_questboard/core/messages/locale_string.dart' show LocaleString;
import 'package:allowance_questboard/core/state/value_validation_mixin.dart';

abstract class BaseStateObject<ValueType> {
  final ValueType value;
  late LocaleString? errorMessage;
  late final ValueValidator validator;

  BaseStateObject(this.value) {
    try {
      validator = ValueValidator(valueName, value);
      validate();
      errorMessage = null;
    } on ValidationException catch (e) {
      errorMessage = e.errorMessage;
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
    if (other is! BaseStateObject<ValueType>) return false;
    return value == other.value;
  }
}
