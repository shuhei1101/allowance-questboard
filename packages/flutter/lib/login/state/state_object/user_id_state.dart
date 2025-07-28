import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/value_object/base_state_object.dart';

class UserIdState  extends BaseValueObject<String>{
  UserIdState(super.value);

  @override
  void validate() {
    // 必須
    validator.required();
  }

  @override
  LocaleString get valueName => LocaleString(
    ja: 'ユーザーID',
    en: 'User ID',
  );

}
