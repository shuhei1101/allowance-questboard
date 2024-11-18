import '../families/family_id.dart';
import 'member.dart';

abstract interface class MemberRepository {
  List<Member> findMembersBy(FamilyId familyId);
}
