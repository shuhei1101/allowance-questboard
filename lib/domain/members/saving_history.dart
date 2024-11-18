import 'member_id.dart';
import '../shared/money.dart';

class SavingHistory {
  MemberId memberId;
  Money balance;
  Money difference;
  String reason;
  DateTime recordedAt;
  SavingHistory(this.memberId, this.balance, this.difference, this.reason, this.recordedAt);
}
