import 'package:allowance_questboard/application/member/exception/not_found_member.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_id.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:get_it/get_it.dart';

import 'exception/not_found_members.dart';
import 'member_data.dart';

class MemberApplicationService {
  MemberApplicationService() : _memberRepository = GetIt.I<MemberRepository>();

  final MemberRepository _memberRepository;

  Future<MemberData?> getMember({required String memberId}) async {
    final member = await _memberRepository.find(MemberId(memberId));

    if (member == null) throw NotFoundMember();

    return MemberData(member);
  }

  Future<List<MemberData>?> getFamilyMembers(String familyId) async {
    final members = await _memberRepository.findMembersBy(FamilyId(familyId));

    if (members == null) throw NotFoundMembers();

    // 取得したメンバーをDTOに変換して返却する
    return members.map((member) => MemberData(member)).toList();
  }
}
