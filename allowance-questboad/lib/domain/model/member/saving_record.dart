import 'value_object/member_id.dart';
import '../shared/money.dart';

/// 貯金履歴の1レコードを表すオブジェクト
class SavingRecode {
  SavingRecode(this.memberId, this.balance, this.difference, this.reason, this.recordedAt);

  /// 対象メンバーID
  MemberId memberId;

  /// 現在の貯金残高
  Money balance;

  /// 前回貯金額との差分
  Money difference;

  /// 貯金をした理由
  ///
  /// 例: クエスト報酬、定期貯金、手動貯金
  String reason;

  /// 貯金をした日時
  DateTime recordedAt;
}
