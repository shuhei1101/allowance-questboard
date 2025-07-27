import 'package:allowance_questboard/core/domain/enum/value_object/base_enum_value.dart';
import 'package:allowance_questboard/language/domain/value_object/language_id.dart';
import 'package:allowance_questboard/language/domain/value_object/language_code.dart';
import 'package:allowance_questboard/language/domain/value_object/language_name.dart';
import 'package:allowance_questboard/shared/domain/value_object/sort_order.dart';

/// 言語タイプの値オブジェクト集約
/// APサーバ側のLanguageTypeValueと同じ構造を持つ
class LanguageTypeValue extends BaseEnumValue<LanguageId> {
  final LanguageId languageId;
  final LanguageCode code;
  final LanguageName name;
  final bool isActive;
  final SortOrder sortOrder;
  
  LanguageTypeValue({
    required LanguageId id,
    LanguageCode? code,
    LanguageName? name,
    bool isActive = false,
    SortOrder? sortOrder,
  }) : languageId = id,
       code = code ?? LanguageCode("0"),
       name = name ?? LanguageName("Unknown"),
       isActive = isActive,
       sortOrder = sortOrder ?? SortOrder(0);
  
  @override
  LanguageId get id => languageId;
}
