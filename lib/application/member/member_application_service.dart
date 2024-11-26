import 'package:get_it/get_it.dart';

import '../../domain/family/family_id.dart';
import '../../domain/member/member.dart';
import '../../domain/member/member_id.dart';
import '../../domain/member/member_repository.dart';
import 'exception/not_found_member.dart';
import 'exception/not_found_members.dart';
import 'member_data.dart';

class MemberApplicationService {
  MemberApplicationService() {
    _memberRepository = GetIt.I<MemberRepository>();
  }

  late MemberRepository _memberRepository;

  MemberData? getMember(String memberId) {
    late Member? member;

    try {
      member = _memberRepository.find(MemberId(memberId));
    } on ArgumentError catch (e) {
      throw ArgumentError(e);
    }

    return member != null ? MemberData(member) : null;

    if (member == null) {
      return null;
    }

    return MemberData(member);
  }

  List<MemberData>? getFamilyMembers(String familyId) {
    var members = _memberRepository.findMembersBy(FamilyId(familyId));
    try {
      return members!.map((member) => MemberData(member)).toList();
    } on TypeError {
      throw NotFoundMembers();
    }
  }
}
