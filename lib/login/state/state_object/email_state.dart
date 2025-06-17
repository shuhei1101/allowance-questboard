import 'package:allowance_questboard/shared/state/state_object.dart';
import 'package:allowance_questboard/util/validator.dart';

class EmailState extends StateObject<String> {
  EmailState({required super.value});

  @override
  String? validate(String value) {
    // メールアドレスは空であってはいけない
    if (value.isEmpty) {
      return "メールアドレスは必須です";
    }
    // メールアドレスの形式が正しいかを検証
    if (isMailAddress(value)) {
      return "メールアドレスの形式が正しくありません";
    }
    return null;
  }
}
