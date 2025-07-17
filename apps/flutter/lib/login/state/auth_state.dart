import 'package:freezed_annotation/freezed_annotation.dart';

part 'auth_state.freezed.dart';

@freezed
abstract class AuthState with _$AuthState {
  const factory AuthState({
    @Default(null) UserIdState? userId,
    @Default(null) ParentIdState? parentId,
    @Default(null) MemberIdState? memberId,
  }) = _AuthState;
}
