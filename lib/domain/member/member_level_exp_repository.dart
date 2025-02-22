import 'package:allowance_questboard/domain/family/family_id.dart';
import 'package:allowance_questboard/domain/member/member_level_exp.dart';

/// [MemberLevelExp]のリポジトリ
abstract interface class MemberLevelExpRepository {
  /// 指定した[FamilyId]に対応する[MemberLevelExp]を取得する
  Future<MemberLevelExp?> find(FamilyId id);

  /// 指定した[MemberLevelExp]を保存する
  Future save(MemberLevelExp? levelExp);
}
