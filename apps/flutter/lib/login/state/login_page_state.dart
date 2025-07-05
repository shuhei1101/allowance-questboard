import 'package:freezed_annotation/freezed_annotation.dart';

part 'login_page_state.freezed.dart';

@freezed
abstract class LoginPageState with _$LoginPageState {
  const factory LoginPageState({
    @Default('') String userName,
    @Default('') String password,
    @Default(false) bool isValid,
  }) = _LoginPageState;
}
