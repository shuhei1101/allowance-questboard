import 'package:allowance_questboard/domain/model/family/family_id.dart';
import 'package:allowance_questboard/domain/model/member/value_object/member_id.dart';
import 'package:allowance_questboard/login/api/login_api.dart';
import 'package:allowance_questboard/login/state/login_page_state.dart';
import 'package:get_it/get_it.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class LoginPageStateNotifier extends StateNotifier<LoginPageState> {
  final LoginApi _loginApi = GetIt.I<LoginApi>();

  LoginPageStateNotifier(super.state);
  Future<MemberId> loginMember(String userId) async {
    try {
      final result = await _loginApi.loginMember(userId);
      final memberId = result.memberId;
      if (memberId == null) {
        throw Exception('Login failed');
      }
      return MemberId(memberId);
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }

  Future<FamilyId> loginFamily(String userId) async {
    try {
      final response = await _loginApi.loginFamily(userId);
      final familyId = response.familyId;
      if (familyId == null) {
        throw Exception('Login failed: No familyId returned');
      }
      return FamilyId(familyId);
    } catch (e) {
      throw Exception('Login failed: $e');
    }
  }
}
