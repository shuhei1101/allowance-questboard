import 'package:allowance_questboard/application/member/member_profile_data.dart';

class MemberProfileApplicationService {
  // TODO: このサービスクラスでは以下情報をまとめたDTOを作成して返却する
  // メンバー、ランク、達成クエスト数(クエストドメイン)、報酬額、定額報酬設定、貯金
  Future<MemberProfileData> getMemberProfile(String memberId) async {
    return MemberProfileData();
  }
}
