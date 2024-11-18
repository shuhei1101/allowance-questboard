import 'package:get_it/get_it.dart';

import '../../domain/families/family_id.dart';
import '../../domain/members/member_repository.dart';
import 'member_data.dart';

class MemberApplicationService {
  MemberApplicationService() {
    _memberRepository = GetIt.I<MemberRepository>();
  }

  late MemberRepository _memberRepository;

  List<MemberData> getMembersBy(String familyId) {
    var members = _memberRepository.findMembersBy(FamilyId(familyId));
    return members.map((member) => MemberData(member)).toList();
  }
}
