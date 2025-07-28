import 'package:allowance_questboard/core/messages/locale_string.dart';
import 'package:allowance_questboard/core/state/base_id.dart';

/// 言語IDの値オブジェクト
/// APサーバ側のLanguageIdと同じ構造を持つ
class LanguageId extends BaseId {
  LanguageId(super.value);
  
  @override
  LocaleString get valueName => const LocaleString(
    ja: "言語ID",
    en: "Language ID",
  );
}
