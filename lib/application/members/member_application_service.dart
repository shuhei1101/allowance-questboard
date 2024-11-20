import 'package:get_it/get_it.dart';

import '../../domain/families/family_id.dart';
import '../../domain/members/member_id.dart';
import '../../domain/members/member_repository.dart';
import 'exceptions/not_found_member.dart';
import 'exceptions/not_found_members.dart';
import 'member_data.dart';

class MemberApplicationService {
  MemberApplicationService() {
    _memberRepository = GetIt.I<MemberRepository>();
  }

  late MemberRepository _memberRepository;

  /// Raises :
  /// - [NotFoundMember]
  MemberData getMember(String memberId) {
    var member = _memberRepository.find(MemberId(memberId));
    try {
      return MemberData(member!);
    } on TypeError {
      throw NotFoundMember();
    }
  }

  /// Raises :
  /// - [NotFoundMembers]
  List<MemberData> getFamilyMembers(String familyId) {
    var members = _memberRepository.findMembersBy(FamilyId(familyId));
    try {
      return members!.map((member) => MemberData(member)).toList();
    } on TypeError {
      throw NotFoundMembers();
    }
  }
}
