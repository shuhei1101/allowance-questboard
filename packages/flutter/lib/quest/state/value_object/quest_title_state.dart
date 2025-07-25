import 'package:allowance_questboard/core/l10n/l10n_provider.dart';
import 'package:allowance_questboard/core/state/base_state_object.dart';

class QuestTitleState extends BaseStateObject<String> {
  QuestTitleState(super.value);

  @override
  void validate() {
    // クエスト名は空であってはいけない
    validateRequired(value, l10n.I.required);
    // クエスト名は50文字以内でなければならない
    validateMaxLength(value, 50, l10n.I.maxLength(50));
  }
}
