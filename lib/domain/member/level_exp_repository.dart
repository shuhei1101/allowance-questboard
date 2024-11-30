import 'package:allowance_questboard/domain/member/member_exp.dart';
import 'package:allowance_questboard/domain/member/member_level.dart';

abstract interface class MemberLevelExpRepository {
  Future save(Map<MemberLevel, MemberExp>? map);
}
