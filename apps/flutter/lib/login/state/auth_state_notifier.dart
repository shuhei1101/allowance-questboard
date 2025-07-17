import 'package:allowance_questboard/login/state/auth_state.dart';
import 'package:get_it/get_it.dart';
import 'package:state_notifier/state_notifier.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

/// 認証状態を管理するProvider
class AuthStateNotifier extends StateNotifier<AuthState> {
  final GetFamilyIdUsecase getFamilyIdUsecase = GetIt.I<GetFamilyIdUsecase>();
  final GetMemberIdUsecase getMemberIdUsecase = GetIt.I<GetMemberIdUsecase>();

  AuthStateNotifier(super.state);

  Future<void> login(SupaSignInResponse response) async {
    final userId = Supabase.instance.client.auth.currentUser?.id;
    if (userId == null) {
      state = state.copyWith(errorMessage: 'ユーザーIDの取得に失敗しました');
      return;
    }

    final (familyId, memberId) = await (
      _getFamilyIdUsecase.execute(userId),
      _getMemberIdUsecase.execute(userId),
    ).wait;

    state = state.copyWith(
      userId: userId,
      familyId: familyId,
      memberId: memberId,
    );
  }

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
