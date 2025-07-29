import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/value_object/base_state_object.dart' show BaseValueObject;

/// ソート順の値オブジェクト
class SortOrder extends BaseValueObject<int> {
  SortOrder(super.value);
  
  @override
  void validate() {
    validator.required();
    validator.integer();
    validator.minValue(0);
  }
  
  @override
  LocaleString get valueName => const LocaleString(
    ja: "ソート順",
    en: "Sort Order",
  );
}
