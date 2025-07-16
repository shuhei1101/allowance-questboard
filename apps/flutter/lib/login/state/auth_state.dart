import 'package:freezed_annotation/freezed_annotation.dart';

part 'auth_state.freezed.dart';

@freezed
abstract class AuthState with _$AuthState {
  const factory AuthState({
    @Default(null) String? userId,
    @Default(null) int? parentId,
    @Default(null) int? memberId,
  }) = _AuthState;
}
