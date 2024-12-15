import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_id.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:get_it/get_it.dart';

class MemberApplicationService {
  MemberApplicationService() : _memberRepository = GetIt.I<MemberRepository>();

  final MemberRepository _memberRepository;

  Future<MemberData?> getMember({required String memberId}) async {
    final member = await _memberRepository.find(MemberId(memberId));

    if (member == null) return null;

    return MemberData(member);
  }

  Future<List<MemberData?>?> getFamilyMembers(String familyId) async {
    final members = await _memberRepository.findMembersBy(FamilyId(familyId));

    if (members == null) return null;

    // 取得したメンバーをDTOに変換して返却する
    return members.map((member) => MemberData(member)).toList();
  }
}
