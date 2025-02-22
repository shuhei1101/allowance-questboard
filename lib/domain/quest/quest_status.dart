/// クエストの進行状況を表す列挙型
enum QuestStatus {
  notAccepted,
  inProgress,
  pendingApproval,
  completed,
}

extension QuestStatusExtension on QuestStatus {
  String get displayName {
    switch (this) {
      case QuestStatus.notAccepted:
        return "未受注";
      case QuestStatus.inProgress:
        return "進行中";
      case QuestStatus.pendingApproval:
        return "申請中";
      case QuestStatus.completed:
        return "達成済み";
    }
  }
}
