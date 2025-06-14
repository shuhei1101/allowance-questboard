import 'package:allowance_questboard/domain/model/member/value_object/member_exp.dart';
import 'package:allowance_questboard/domain/model/member/member_level.dart';

/// メンバーレベルに対する経験値を定めたマップオブジェクト
class MemberLevelExp {
  MemberLevelExp(this.map);

  /// メンバーレベルと経験値のマップ
  final Map<MemberLevel, MemberExp> map;

  /// 指定した[MemberExp]から現在の[MemberLevel]を取得する
  ///
  /// ### Returns
  /// - [MemberLevel]: 現在のレベル
  MemberLevel getLevel(MemberExp exp) {
    return map.entries.firstWhere((entry) => entry.value.value > exp.value).key;
  }

  MemberLevel get level => map.keys.last;
}
