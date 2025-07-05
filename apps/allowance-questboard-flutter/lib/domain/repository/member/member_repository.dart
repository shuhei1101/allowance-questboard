import '../../model/family/family_id.dart';
import '../../model/member/member.dart';
import '../../model/member/value_object/member_id.dart';

/// [Member]のリポジトリインターフェース
abstract interface class MemberRepository {
  /// 指定した[MemberId]に対応する[Member]を取得する
  Future<Member?> find(MemberId memberId);

  /// 指定した[FamilyId]に対応する[Member]を取得する
  Future<List<Member>?> findMembers(FamilyId familyId);
}
