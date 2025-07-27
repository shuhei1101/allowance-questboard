import 'package:allowance_questboard/core/domain/value_object/base_value_object.dart';

/// ドメインモデルのIDを表す基底クラス
/// APサーバ側のBaseIdと同じ構造を持つ
abstract class BaseId extends BaseValueObject<int> {
  BaseId(super.value);
  
  @override
  void validate() {
    validator.required();
    validator.integer();
    validator.minValue(1);
  }
  
  /// IDを整数として返す
  int toInt() => value;

  @override
  String toString() => '$runtimeType($value)';
}
