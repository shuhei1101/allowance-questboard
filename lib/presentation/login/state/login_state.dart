import 'package:freezed_annotation/freezed_annotation.dart';

part 'login_state.freezed.dart';

/// ログイン画面の状態
@freezed
class LoginState with _$LoginState {
  const factory LoginState({
    @Default(false) bool isLoading,
    @Default(true) bool isFamilyMode, // true: 家族モード, false: メンバーモード
    @Default('') String email,
    @Default('') String password,
    String? errorMessage,
  }) = _LoginState;
}