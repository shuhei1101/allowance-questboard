import 'package:allowance_questboard/login/state/auth_state.dart';
import 'package:state_notifier/state_notifier.dart';

/// 認証状態を管理するProvider
class AuthStateNotifier extends StateNotifier<AuthState> {
  final GetFamilyIdUsecase getFamilyIdUsecase = GetIt.I<GetFamilyIdUsecase>();
  final GetMemberIdUsecase getMemberIdUsecase = GetIt.I<GetMemberIdUsecase>();

  AuthStateNotifier(super.state);

  void login(String? userId) {
    await getFamilyIdUsecase.execute(userId);
    await getMemberIdUsecase.execute(userId);
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
