import 'package:allowance_questboard/application/member/member_data.dart';
import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/member/member.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';
import 'package:allowance_questboard/domain/repository/member/member_repository.dart';
import 'package:get_it/get_it.dart';

/// [Member]のアプリケーションサービス
class MemberApplicationService {
  MemberApplicationService() : _memberRepository = GetIt.I<MemberRepository>();

  final MemberRepository _memberRepository;

  /// 指定した[memberId]に対応するメンバー情報を取得する \
  /// 存在しない場合はnullを返す
  ///
  /// ### Parameters
  /// - String memberId: メンバーID
  /// ### Returns
  /// - Future<[MemberData]?>: メンバー情報
  Future<MemberData?> getMember({required String memberId}) async {
    final member = await _memberRepository.find(MemberId(memberId));
    if (member == null) return null;
    return MemberData.fromDomain(member);
  }

  /// 指定した[familyId]に対応する家族の全メンバー情報を取得する
  /// 存在しない場合はnullを返す
  ///
  /// ### Parameters
  /// - String familyId: 家族ID
  /// ### Returns
  /// - Future<List<[MemberData]>?>: 家族のメンバー情報
  Future<List<MemberData>?> getFamilyMembers(String familyId) async {
    final members = await _memberRepository.findMembers(FamilyId(familyId));
    if (members == null) return null;
    return members.map((member) => MemberData.fromDomain(member)).toList();
  }
}
