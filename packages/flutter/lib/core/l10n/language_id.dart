import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/state/base_id.dart' show BaseId;

/// 言語IDクラス
class LanguageId extends BaseId {
  LanguageId(super.value);

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is LanguageId &&
          runtimeType == other.runtimeType &&
          value == other.value;

  @override
  int get hashCode => value.hashCode;

  @override
  String toString() => 'LanguageId($value)';

  @override
  LocaleString get valueName => LocaleString(
    en: 'Language ID',
    ja: '言語ID',
  );
}
