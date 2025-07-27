import 'package:allowance_questboard/core/domain/enum/value_object/enum_value_protocol.dart';
import 'package:allowance_questboard/core/domain/enum/base_enum.dart';
import 'package:allowance_questboard/core/domain/value_object/base_id.dart';

/// 翻訳テーブルなしのシンプルなDTOから更新可能なMixin
/// 
/// APIレスポンスのDTOからEnum値を更新する機能を提供します。
mixin EnumMixin<T extends BaseId> on BaseEnum<T> {
  /// DTOリストからEnum値を更新する（翻訳テーブルなし）
  /// 
  /// [dtoList] 更新に使用するDTOのリスト
  /// [enumValues] 更新対象のEnum値リスト
  static void updateFromDtoList<E extends BaseEnum>(
    List<Map<String, dynamic>> dtoList,
    List<E> enumValues,
  ) {
    for (final dto in dtoList) {
      final dtoId = dto['id'] as int;
      
      for (final enumValue in enumValues) {
        if (enumValue.value.id.value == dtoId) {
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
