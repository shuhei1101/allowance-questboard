import '../family/family_id.dart';
import 'member.dart';
import 'member_id.dart';

/// [Member]のリポジトリ
abstract interface class MemberRepository {
  /// 指定した[MemberId]に対応する[Member]を取得する
  Future<Member?> find(MemberId memberId);

  /// 指定した[FamilyId]に対応する[Member]を取得する
  Future<List<Member>?> findMembers(FamilyId familyId);
}
