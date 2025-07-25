import 'package:allowance_questboard/core/state/error_message.dart';
import 'package:allowance_questboard/core/state/value_validation_mixin.dart';

abstract class BaseStateObject<ValueType> with ValueValidationMixin {
  final ValueType value;
  late ErrorMessage? errorMessage;

  BaseStateObject(this.value) {
    try {
      validate();
      errorMessage = null;
    } on ValidationException catch (e) {
      errorMessage = e.errorMessage;
    }
  }

  /// 有効な値かどうかを示す
  bool get isValid => errorMessage == null;

  /// デバッグ用の文字列表現を返す
  /// ログ出力時に使用する
  String toDebugString() {
    return 'value: $value, errorMessage: $errorMessage';
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
