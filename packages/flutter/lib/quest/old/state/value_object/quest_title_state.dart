import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/value_object/base_state_object.dart';

class QuestTitleState extends BaseValueObject<String> {
  QuestTitleState(super.value);

  @override
  void validate() {
    // クエスト名は空であってはいけない
    validator.required();
    // クエスト名は50文字以内でなければならない
    validator.maxLength(50);
  }

  @override
  LocaleString get valueName => LocaleString(
    en: 'Quest Title',
    ja: 'クエスト名',
  );
}
