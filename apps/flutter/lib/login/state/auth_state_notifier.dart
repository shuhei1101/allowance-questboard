import 'package:allowance_questboard/login/state/auth_state.dart';
import 'package:state_notifier/state_notifier.dart';

/// 認証状態を管理するProvider
class AuthStateNotifier extends StateNotifier<AuthState> {
  AuthStateNotifier(super.state);

  void updateUserId(String? userId) {
    state = state.copyWith(userId: userId);
  }

  void updateFamilyId(int? familyId) {
    state = state.copyWith(familyId: familyId);
  }

  void updateMemberId(int? memberId) {
    state = state.copyWith(memberId: memberId);
  }
}
