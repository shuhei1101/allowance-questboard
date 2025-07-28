import 'package:allowance_questboard/core/enum/value_object/enum_value_protocol.dart' show EnumValueProtocol;
import 'package:allowance_questboard/core/enum/value_object/base_enum_value.dart';
import 'package:allowance_questboard/language/enum/value_object/language_id.dart';
import 'package:allowance_questboard/language/enum/value_object/language_code.dart';
import 'package:allowance_questboard/language/enum/value_object/language_name.dart';
import 'package:allowance_questboard/login/api/v1/init/init_api_response.dart' show LanguageDto;
import 'package:allowance_questboard/shared/domain/value_object/sort_order.dart';

/// 言語タイプの値オブジェクト集約
class LanguageTypeValue extends BaseEnumValue<LanguageId> implements EnumValueProtocol<LanguageDto> {
  final LanguageId languageId;
  LanguageCode code;
  LanguageName name;
  bool isActive;
  SortOrder sortOrder;
  
  LanguageTypeValue({
    required LanguageId id,
    LanguageCode? code,
    LanguageName? name,
    this.isActive = false,
    SortOrder? sortOrder,
  }) : languageId = id,
       code = code ?? LanguageCode("0"),
       name = name ?? LanguageName("Unknown"),
       sortOrder = sortOrder ?? SortOrder(0);
  
  @override
  LanguageId get id => languageId;
  
  @override
  void setFromDto(LanguageDto dto) {
    code = LanguageCode(dto.code);
    name = LanguageName(dto.name);
    isActive = dto.isActive;
    sortOrder = SortOrder(dto.sortOrder);
  }
}
