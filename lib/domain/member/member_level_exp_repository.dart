import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_exp.dart';
import 'package:allowance_questboard/domain/member/member_level.dart';

abstract interface class MemberLevelExpRepository {
  Future<Map<MemberLevel, MemberExp>?> find(FamilyId id);
  Future save(Map<MemberLevel, MemberExp>? map);
}
