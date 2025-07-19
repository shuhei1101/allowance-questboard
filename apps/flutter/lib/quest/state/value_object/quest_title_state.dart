import 'package:allowance_questboard/core/setup/l10n_provider.dart';
import 'package:allowance_questboard/core/state/base_state_object.dart';

class QuestTitleState extends BaseStateObject<String> {
  QuestTitleState(super.value);

  @override
  void validate() {
    // クエスト名は空であってはいけない
    validateRequired(value, L10nProvider.I.required);
    // クエスト名は50文字以内でなければならない
    validateMaxLength(value, 50, L10nProvider.I.maxLength(50));
  }
}
