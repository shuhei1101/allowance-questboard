import 'package:allowance_questboard/core/state/base_state_object.dart';

class ParentIdState extends BaseStateObject<String> {
  ParentIdState(super.value);

  @override
  ErrorMessage? validate() {
    // 親IDは空であってはいけない
    if (value.isEmpty) {
      return ErrorMessage(L10nProvider.I.parentIdRequired);
    }
    return null;
  }
}
