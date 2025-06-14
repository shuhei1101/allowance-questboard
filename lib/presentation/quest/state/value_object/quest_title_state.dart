import 'package:allowance_questboard/domain/model/quest/value_object/quest_title.dart';

class QuestTitleState {
  final String value;
  final String? errorMessage;

  const QuestTitleState(this.value, this.errorMessage);

  factory QuestTitleState.fromInput(String value) {
    String? errorMessage = QuestTitle.validate(value) ? null : 'クエスト名は空ではいけません';
    return QuestTitleState(value, errorMessage);
  }

  bool get isValid => errorMessage == null;
}
