import 'package:allowance_questboard/application/auth/auth_provider.dart';
import 'package:allowance_questboard/application/auth/get_family_id_use_case.dart';
import 'package:allowance_questboard/application/auth/get_member_id_use_case.dart';
import 'package:allowance_questboard/presentation/login/state/login_state.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

/// ログイン画面の状態を管理するStateNotifier
class LoginStateNotifier extends StateNotifier<LoginState> {
  LoginStateNotifier(
    this._authProvider,
    this._getFamilyIdUseCase,
    this._getMemberIdUseCase,
  ) : super(const LoginState());

  final AuthProvider _authProvider;
  final GetFamilyIdUseCase _getFamilyIdUseCase;
  final GetMemberIdUseCase _getMemberIdUseCase;

  /// ログインモードを切り替え（家族/メンバー）
  void toggleLoginMode() {
    state = state.copyWith(isFamilyMode: !state.isFamilyMode);
  }

  /// メールアドレスを設定
  void setEmail(String email) {
    state = state.copyWith(email: email);
  }

  /// パスワードを設定
  void setPassword(String password) {
    state = state.copyWith(password: password);
  }

  /// エラーメッセージをクリア
  void clearError() {
    state = state.copyWith(errorMessage: null);
  }

  /// ログイン処理
  Future<bool> login() async {
    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      // Supabaseでの認証
      final AuthResponse response = await Supabase.instance.client.auth.signInWithPassword(
        email: state.email,
        password: state.password,
      );

      if (response.user == null) {
        state = state.copyWith(
          isLoading: false,
          errorMessage: 'ログインに失敗しました',
        );
        return false;
      }

      final String userId = response.user!.id;
      
      // AuthProviderにユーザー情報を設定
      _authProvider.setUserInfo(userId);

      // ログインモードに応じてIDを取得
      if (state.isFamilyMode) {
        final familyIdResult = await _getFamilyIdUseCase.execute(userId);
        familyIdResult.fold(
          (error) {
            state = state.copyWith(
              isLoading: false,
              errorMessage: '家族情報の取得に失敗しました',
            );
            return;
          },
          (familyId) {
            _authProvider.setFamilyId(familyId);
          },
        );
      } else {
        final memberIdResult = await _getMemberIdUseCase.execute(userId);
        memberIdResult.fold(
          (error) {
            state = state.copyWith(
              isLoading: false,
              errorMessage: 'メンバー情報の取得に失敗しました',
            );
            return;
          },
          (memberId) {
            _authProvider.setMemberId(memberId);
          },
        );
      }

      state = state.copyWith(isLoading: false);
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: 'ログインエラー: ${e.toString()}',
      );
      return false;
    }
  }

  /// パスワードリセット
  Future<bool> resetPassword(String email) async {
    try {
      await Supabase.instance.client.auth.resetPasswordForEmail(email);
      return true;
    } catch (e) {
      state = state.copyWith(
        errorMessage: 'パスワードリセットに失敗しました: ${e.toString()}',
      );
      return false;
    }
  }
}