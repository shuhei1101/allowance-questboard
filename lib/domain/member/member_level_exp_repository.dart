import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_level_exp.dart';

abstract interface class MemberLevelExpRepository {
  Future<MemberLevelExp?> find(FamilyId id);
  Future save(MemberLevelExp? levelExp);
}
