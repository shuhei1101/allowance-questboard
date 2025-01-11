import '../family/family_id.dart';
import 'member.dart';
import 'member_id.dart';

abstract interface class MemberRepository {
  Future<Member?> find(MemberId memberId);
  Future<List<Member>?> findMembers(FamilyId familyId);
}
