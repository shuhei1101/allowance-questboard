import 'package:allowance_questboard/core/state/error_message.dart';

abstract class BaseStateObject<ValueType> {
  final ValueType _value;
  late ErrorMessage? _errorMessage;

  BaseStateObject(ValueType value): _value = value {
    _errorMessage = validate();
  }

  ValueType get value => _value;
  bool get isValid => _errorMessage == null;
  ErrorMessage? get errorMessage => _errorMessage;

  /// 値を検証して、エラーメッセージを返す
  /// エラーがない場合は `null` を返す
  ErrorMessage? validate();

  @override
  int get hashCode => _value.hashCode;

  @override
  bool operator ==(Object other) {
    if (other is! BaseStateObject<ValueType>) return false;
    return _value == other._value;
  }
}
