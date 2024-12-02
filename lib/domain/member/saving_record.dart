import 'member_id.dart';
import '../shared/money.dart';

class SavingRecode {
  MemberId memberId;
  Money balance;
  Money difference;
  String reason;
  DateTime recordedAt;
  SavingRecode(this.memberId, this.balance, this.difference, this.reason, this.recordedAt);
}
