import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_id.dart';
import 'package:allowance_questboard/domain/member/member_repository.dart';
import 'package:get_it/get_it.dart';

<<<<<<< HEAD
import '../../domain/family/family_id.dart';
import '../../domain/member/member.dart';
import '../../domain/member/member_id.dart';
import '../../domain/member/member_repository.dart';
import 'exception/not_found_members.dart';
import 'member_data.dart';

=======
>>>>>>> cbb11df369a1070d7b2f89a39dc40331400b7abe
class MemberApplicationService {
  MemberApplicationService() : _memberRepository = GetIt.I<MemberRepository>();

  final MemberRepository _memberRepository;

<<<<<<< HEAD
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
=======
  Future<MemberData?> getMember({required String memberId}) async {
    final member = await _memberRepository.find(MemberId(memberId));

    if (member == null) return null;

    return MemberData(member);
  }

  Future<List<MemberData>?> getFamilyMembers(String familyId) async {
    final members = await _memberRepository.findMembers(FamilyId(familyId));

    if (members == null) return null;

>>>>>>> cbb11df369a1070d7b2f89a39dc40331400b7abe
    return members.map((member) => MemberData(member)).toList();
  }
}
