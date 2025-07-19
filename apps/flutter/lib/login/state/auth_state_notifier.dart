import 'package:allowance_questboard/core/constants/api_endpoints.dart';
import 'package:allowance_questboard/login/api/login_api_client.dart';
import 'package:allowance_questboard/login/state/auth_state.dart';
import 'package:allowance_questboard/login/state/state_object/member_id_state.dart';
import 'package:allowance_questboard/login/state/state_object/parent_id_state.dart';
import 'package:allowance_questboard/login/state/state_object/user_id_state.dart';
import 'package:state_notifier/state_notifier.dart';

/// 認証状態を管理するProvider
class AuthStateNotifier extends StateNotifier<AuthState> {

  AuthStateNotifier(super.state);

  void updateFromResponse(
    LoginApiResponse loginApiResponse,
  ) {
    // ユーザーIDを更新
    updateUserId(UserIdState(loginApiResponse.userId));
    
    // 親IDを更新
    if (loginApiResponse.parentId != null) {
      updateParentId(ParentIdState(loginApiResponse.parentId!));
    } else {
      updateParentId(null);
    }

    // メンバーIDを更新
    if (loginApiResponse.memberId != null) {
      updateMemberId(MemberIdState(loginApiResponse.memberId!));
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
