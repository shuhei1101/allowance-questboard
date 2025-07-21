import 'package:allowance_questboard/login/api/v1/login_api_response.dart';
import 'package:allowance_questboard/login/state/auth_state.dart';
import 'package:allowance_questboard/login/state/state_object/member_id_state.dart';
import 'package:allowance_questboard/login/state/state_object/parent_id_state.dart';
import 'package:allowance_questboard/login/state/state_object/user_id_state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final authStateNotifierProvider = StateNotifierProvider<AuthStateNotifier, AuthState>(
  (ref) => AuthStateNotifier(AuthState()),
);

/// 認証状態を管理するProvider
class AuthStateNotifier extends StateNotifier<AuthState> {

  AuthStateNotifier(super.state);

  void updateFromResponse(
    LoginApiResponse loginApiResponse,
  ) {
    // ユーザーIDを更新
    updateUserId(UserIdState(loginApiResponse.item.userId));
    
    // 親IDを更新
    if (loginApiResponse.item.parentId != null) {
      updateParentId(ParentIdState(loginApiResponse.item.parentId!));
    } else {
      updateParentId(null);
    }

    // メンバーIDを更新
    if (loginApiResponse.item.memberId != null) {
      updateMemberId(MemberIdState(loginApiResponse.item.memberId!));
    } else {
      updateMemberId(null);
    }
  }

  void updateUserId(UserIdState? userId) {
    state = state.copyWith(userId: userId);
  }

  void updateParentId(ParentIdState? parentId) {
    state = state.copyWith(parentId: parentId);
  }

  void updateMemberId(MemberIdState? memberId) {
    state = state.copyWith(memberId: memberId);
  }
}
