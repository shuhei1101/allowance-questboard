import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/value_object/base_id.dart' show BaseId;

class MemberIdState extends BaseId {
  MemberIdState(super.value);

  @override
  LocaleString get valueName => LocaleString(
    ja: 'メンバーID',
    en: 'Member ID',
  );
}
