import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/domain/validation/value_validator.dart';

/// 値オブジェクトの基底クラス
/// APサーバ側のBaseValueObjectと同じ構造を持つ
abstract class BaseValueObject<ValueType> {
  final ValueType value;
  late final ValueValidator validator;
  
  BaseValueObject(this.value) {
    validator = ValueValidator(valueName, value);
    validate();
  }
  
  /// 値オブジェクトの値を検証する（サブクラスで実装）
  void validate();
  
  /// 値オブジェクトの名前を取得（サブクラスで実装）
  LocaleString get valueName;
  
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is BaseValueObject<ValueType> && other.value == value;
  }
  
  @override
  int get hashCode => value.hashCode;
  
  @override
  String toString() => '$runtimeType(value: $value)';
}
