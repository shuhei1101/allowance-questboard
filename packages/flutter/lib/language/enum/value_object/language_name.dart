import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/value_object/base_state_object.dart' show BaseValueObject;

/// 言語名の値オブジェクト
class LanguageName extends BaseValueObject<String> {
  LanguageName(super.value);
  
  @override
  void validate() {
    validator.required();
    validator.minLength(1);
    validator.maxLength(100);
  }
  
  @override
  LocaleString get valueName => const LocaleString(
    ja: "言語名",
    en: "Language Name",
  );
}
