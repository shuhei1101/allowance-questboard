import 'package:allowance_questboard/core/value_object/base_id.dart';
import 'package:allowance_questboard/core/enum/value_object/base_enum_value.dart';

/// 列挙型の基底クラス
/// 
/// 全てのEnumクラスはこのクラスを継承して実装します。
/// DartのenumではなくクラスベースのEnumシステムを提供します。
abstract class BaseEnum<IdType extends BaseId> {
  /// Enum値
  final BaseEnumValue<IdType> value;

  /// BaseEnumのコンストラクタ
  /// 
  /// [value] Enum値オブジェクト
  const BaseEnum(this.value);

  /// IDからEnum値を取得
  /// 
  /// [id] 検索するID
  /// [enumValues] 検索対象のEnum値リスト
  /// Returns: 該当するEnum値
  /// Throws: [ArgumentError] IDが見つからない場合
  static EnumType fromId<EnumType extends BaseEnum>(BaseId id, List<EnumType> enumValues) {
    for (final enumValue in enumValues) {
      if (enumValue.value.id == id) {
        return enumValue;
      }
    }
    throw ArgumentError('ID $id is not valid for ${EnumType.toString()}');
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is BaseEnum<IdType> && other.value == value;
  }

  @override
  int get hashCode => value.hashCode;

  @override
  String toString() => '$runtimeType(${value.toString()})';
}
