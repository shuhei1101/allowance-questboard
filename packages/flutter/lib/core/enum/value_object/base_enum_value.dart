import 'package:allowance_questboard/core/value_object/base_id.dart';

/// 列挙型の値を表す基底クラス
/// 
/// 全てのEnum値オブジェクトはこのクラスを継承して実装します。
abstract class BaseEnumValue<IdType extends BaseId> {
  /// 値オブジェクトのIDを返す
  IdType get id;

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is BaseEnumValue<IdType> && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() => '$runtimeType(id: $id)';
}
