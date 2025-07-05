/// ログイン画面の状態
class LoginState {
  const LoginState({
    this.isLoading = false,
    this.isFamilyLogin = true, // true: 家族ログイン, false: メンバーログイン
    this.errorMessage,
  });

  final bool isLoading;
  final bool isFamilyLogin;
  final String? errorMessage;

  LoginState copyWith({
    bool? isLoading,
    bool? isFamilyLogin,
    String? errorMessage,
  }) {
    return LoginState(
      isLoading: isLoading ?? this.isLoading,
      isFamilyLogin: isFamilyLogin ?? this.isFamilyLogin,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}