class QuestTitle {
  final String value;
  QuestTitle._(this.value);

  factory QuestTitle(String input) {
    if (!validate(input)) {
      throw ArgumentError("$inputは空ではいけません");
    }
    return QuestTitle._(input);
  }

  static bool validate(String input) {
    return input.isNotEmpty;
  }
}
