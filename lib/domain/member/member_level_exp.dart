import 'package:allowance_questboard/domain/member/member_exp.dart';
import 'package:allowance_questboard/domain/member/member_level.dart';

class MemberLevelExp {
  MemberLevelExp(this._map);
  final Map<MemberLevel, MemberExp> _map;
}
