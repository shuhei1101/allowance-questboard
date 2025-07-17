import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/core/state/base_state_object.dart';

class QuestTitleState extends StateObject<String> {
  QuestTitleState(super.value);

  @override
  String? validate() {
    // クエスト名は空であってはいけない
    if (value().isEmpty) {
      return L10nProvider.I.questRequired;
    }
    // クエスト名は50文字以内でなければならない
    if (value.length > 50) {
      return L10nProvider.I.questInvalid;
    }
    return null;
  }
}
