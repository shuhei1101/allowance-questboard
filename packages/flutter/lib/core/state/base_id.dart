import 'package:allowance_questboard/core/state/base_state_object.dart' show BaseStateObject;

/// ドメインモデルのIDを表す基底クラス
/// APサーバ側のBaseIdと同じ構造を持つ
abstract class BaseId extends BaseStateObject<int> {
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
