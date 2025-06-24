import 'package:allowance_questboard/family/query_service/family_query_service.dart';
import 'package:allowance_questboard/member/query_service/member_query_service.dart';
import 'package:allowance_questboard/login/state/login_page_state.dart';
import 'package:get_it/get_it.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class LoginPageStateNotifier extends StateNotifier<LoginPageState> {
  final FamilyQueryService _familyQueryService = GetIt.I<FamilyQueryService>();
  final MemberQueryService _memberQueryService = GetIt.I<MemberQueryService>();

  LoginPageStateNotifier(super.state);

  Future<int?> getFamilyId(String userId) async {
    try {
      final familyId = await _familyQueryService.fetchFamilyId(userId);
      if (familyId == null) {
        print('Family IDはnullです');
      }
      return familyId;
    } catch (e) {
      print('family IDの取得に失敗: $e');
      return null;
    }
  }

  Future<int?> getMemberId(String userId) async {
    try {
      final memberId = await _memberQueryService.fetchMemberId(userId);
      if (memberId == null) {
        print('Member ID is null');
      }
      return memberId;
    } catch (e) {
      print('member IDの取得に失敗: $e');
      return null;
    }
  }
}
