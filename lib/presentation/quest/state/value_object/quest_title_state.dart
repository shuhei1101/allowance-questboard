import 'package:allowance_questboard/shared/state/state_object.dart';

class QuestTitleState extends StateObject<String> {
  QuestTitleState({required super.value});

  @override
  String? validate(String value) {
    // クエスト名は空であってはいけない
    if (value.isEmpty) {
      return "";
    }
    // クエスト名は50文字以内でなければならない
    if (value.length > 50) {
      return "クエスト名は50文字以内でなければなりません";
    }
    return null;
  }
}
