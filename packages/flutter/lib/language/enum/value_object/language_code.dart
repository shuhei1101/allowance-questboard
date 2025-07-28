import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/value_object/base_state_object.dart' show BaseValueObject;

/// 言語コードの値オブジェクト
class LanguageCode extends BaseValueObject<String> {
  LanguageCode(super.value);
  
  @override
  void validate() {
    validator.required();
    validator.integer(); // 言語コードは数値文字列
  }
  
  @override
  LocaleString get valueName => const LocaleString(
    ja: "言語コード",
    en: "Language Code",
  );
}
