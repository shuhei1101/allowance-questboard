import 'package:allowance_questboard/application/auth/auth_provider.dart';
import 'package:allowance_questboard/application/auth/get_family_id_use_case.dart';
import 'package:allowance_questboard/application/auth/get_member_id_use_case.dart';
import 'package:allowance_questboard/login/state/login_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

/// ログイン画面の状態管理
class LoginStateNotifier extends StateNotifier<LoginState> {
  final AuthProvider _authProvider;
  final GetFamilyIdUseCase _getFamilyIdUseCase;
  final GetMemberIdUseCase _getMemberIdUseCase;

  LoginStateNotifier(
    this._authProvider,
    this._getFamilyIdUseCase,
    this._getMemberIdUseCase,
  ) : super(const LoginState());

  /// ログインタイプを切り替える（家族/メンバー）
  void toggleLoginType() {
    state = state.copyWith(isFamilyLogin: !state.isFamilyLogin);
  }

  /// ログイン処理
  Future<void> handleLogin(String userId) async {
    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      if (state.isFamilyLogin) {
        // 家族としてログイン
        final familyId = await _getFamilyIdUseCase.execute(userId);
        if (familyId != null) {
          _authProvider.setUserInfo(userId: userId, familyId: familyId);
        } else {
          state = state.copyWith(
            isLoading: false,
            errorMessage: '家族情報が見つかりませんでした',
          );
          return;
        }
      } else {
        // メンバーとしてログイン
        final memberId = await _getMemberIdUseCase.execute(userId);
        if (memberId != null) {
          _authProvider.setUserInfo(userId: userId, memberId: memberId);
        } else {
          state = state.copyWith(
            isLoading: false,
            errorMessage: 'メンバー情報が見つかりませんでした',
          );
          return;
        }
      }

      state = state.copyWith(isLoading: false);
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: 'ログインに失敗しました: $e',
      );
    }
  }

  /// エラーをクリア
  void clearError() {
    state = state.copyWith(errorMessage: null);
  }
}