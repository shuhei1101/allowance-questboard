import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/value_object/base_id.dart' show BaseId;

class ParentIdState extends BaseId {
  ParentIdState(super.value);

  @override
  LocaleString get valueName => LocaleString(
    ja: '親ID',
    en: 'Parent ID',
  );
}
