import 'member_id.dart';
import '../shared/money.dart';

/// 貯金履歴の1レコードを表すオブジェクト
class SavingRecode {
  SavingRecode(this.memberId, this.balance, this.difference, this.reason, this.recordedAt);
  MemberId memberId; // 対象メンバーID
  Money balance; // 現在の貯金残高
  Money difference; // 前回からの差分
  String reason; // 理由
  DateTime recordedAt; // 記録日時
}
