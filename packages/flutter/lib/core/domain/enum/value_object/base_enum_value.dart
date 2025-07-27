import 'package:allowance_questboard/core/domain/value_object/base_id.dart';

/// 列挙型の値を表す基底クラス
/// 
/// 全てのEnum値オブジェクトはこのクラスを継承して実装します。
abstract class BaseEnumValue<T extends BaseId> {
  /// 値オブジェクトのIDを返す
  T get id;

  /// BaseEnumValueのコンストラクタ
  const BaseEnumValue();

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is BaseEnumValue<T> && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() => '$runtimeType(id: $id)';
}
