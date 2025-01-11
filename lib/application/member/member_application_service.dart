import 'package:get_it/get_it.dart';

import '../../domain/family/family_id.dart';
import '../../domain/member/member.dart';
import '../../domain/member/member_id.dart';
import '../../domain/member/member_repository.dart';
import 'exception/not_found_members.dart';
import 'member_data.dart';

class MemberApplicationService {
  MemberApplicationService() {
    _memberRepository = GetIt.I<MemberRepository>();
  }

  late MemberRepository _memberRepository;

  Future<MemberData?> getMember(String memberId) async {
    late Member? member;

    try {
      member = _memberRepository.find(MemberId(memberId));
    } on ArgumentError catch (e) {
      throw ArgumentError(e);
    }

    return member != null ? MemberData(member) : null;
  }

  Future<List<MemberData>?> getFamilyMembers(String familyId) async {
    var members = _memberRepository.findMembersBy(FamilyId(familyId));

    if (members == null) throw NotFoundFamily();

    // 取得したメンバーをDTOに変換して返却する
    return members.map((member) => MemberData(member)).toList();
  }
}
