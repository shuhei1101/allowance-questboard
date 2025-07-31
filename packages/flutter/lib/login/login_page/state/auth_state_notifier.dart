import 'package:allowance_questboard/login/login_page/api/login_api_response.dart';
import 'package:allowance_questboard/login/login_page/state/auth_state.dart';
import 'package:allowance_questboard/login/login_page/value_object/member_id_state.dart';
import 'package:allowance_questboard/login/login_page/value_object/parent_id_state.dart';
import 'package:allowance_questboard/login/login_page/value_object/user_id_state.dart';
import 'package:allowance_questboard/core/state/base_state_notifier.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final authStateNotifierProvider = StateNotifierProvider<AuthStateNotifier, AuthState>(
  (ref) => AuthStateNotifier(AuthState()),
);

/// 認証状態を管理するProvider
class AuthStateNotifier extends BaseStateNotifier<AuthState, LoginApiResponse> {

  AuthStateNotifier(super.state);

  @override
  void updateFromResponse(
    LoginApiResponse loginApiResponse,
  ) {
    final userId = loginApiResponse.item.userId;
    final parentId = loginApiResponse.item.parentId;
    final memberId = loginApiResponse.item.memberId;

    // 状態を更新
    state = AuthState(
      userId: UserIdState(userId),
      parentId: parentId != null ? ParentIdState(parentId) : null,
      memberId: memberId != null ? MemberIdState(memberId) : null,
    );
  }

  // 全ての状態を更新
  @override
  void updateState({
    UserIdState? userId,
    ParentIdState? parentId,
    MemberIdState? memberId,
  }) {
    state = AuthState(
      userId: userId ?? state.userId,
      parentId: parentId ?? state.parentId,
      memberId: memberId ?? state.memberId,
    );
  }
}
