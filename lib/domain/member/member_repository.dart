import '../family/family_id.dart';
import 'member.dart';
import 'member_id.dart';

abstract interface class MemberRepository {
  Member? find(MemberId memberId);
  List<Member>? findMembersBy(FamilyId familyId);
}
