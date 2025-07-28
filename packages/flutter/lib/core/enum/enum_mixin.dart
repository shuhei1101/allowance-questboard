import 'package:allowance_questboard/core/enum/enumuratable.dart' show Enumuratable;
import 'package:allowance_questboard/core/enum/value_object/enum_value_protocol.dart';
import 'package:allowance_questboard/core/enum/base_enum.dart';
import 'package:allowance_questboard/core/value_object/base_id.dart';

/// 翻訳テーブルなしのシンプルなDTOから更新可能なMixin
/// 
/// APIレスポンスのDTOからEnum値を更新する機能を提供します。
mixin EnumMixin<IdType extends BaseId> on BaseEnum<IdType> {
  /// DTOリストからEnum値を更新する（翻訳テーブルなし）
  /// 
  /// [dtoList] 更新に使用するDTOのリスト
  /// [enumValues] 更新対象のEnum値リスト
  static void updateFromDtoList<DtoType extends Enumuratable, EnumType extends BaseEnum>(
    List<DtoType> dtoList,
    List<EnumType> enumValues,
  ) {
    for (final dto in dtoList) {
      for (final enumValue in enumValues) {
        if (enumValue.value.id == dto.id) {
          // EnumValueProtocolを実装している値オブジェクトかチェック
          if (enumValue.value is EnumValueProtocol) {
            (enumValue.value as EnumValueProtocol).setFromDto(dto);
          }
          break;
        }
      }
    }
  }
}
