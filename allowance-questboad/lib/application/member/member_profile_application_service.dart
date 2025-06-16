import 'package:allowance_questboard/application/member/member_profile_data.dart';
import 'package:allowance_questboard/domain/model/member/member.dart';

/// [Member]のプロフィール情報に関するアプリケーションサービス
class MemberProfileApplicationService {
  MemberProfileApplicationService();

  // TODO: このサービスクラスでは以下情報をまとめたDTOを作成して返却する
  // メンバー、ランク、達成クエスト数(クエストドメイン)、報酬額、定額報酬設定、貯金

  /// 指定した[memberId]に対応するメンバーのプロフィール情報を取得する
  ///
  /// ### Parameters
  /// - String memberId: メンバーID
  /// ### Returns
  /// - Future<[MemberProfileData]>: メンバープロフィール情報
  Future<MemberProfileData> getMemberProfile(String memberId) async {
    return MemberProfileData();
  }
}
