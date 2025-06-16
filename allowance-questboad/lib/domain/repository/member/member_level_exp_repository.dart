import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_level_exp.dart';

/// [MemberLevelExp]のリポジトリインターフェース
abstract interface class MemberLevelExpRepository {
  /// 指定した[FamilyId]に対応する[MemberLevelExp]を取得する
  Future<MemberLevelExp?> find(FamilyId id);

  /// 指定した[MemberLevelExp]を保存する
  Future save(MemberLevelExp? levelExp);
}
