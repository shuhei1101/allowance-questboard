import 'package:allowance_questboard/login/login_page/value_object/member_id_state.dart';
import 'package:allowance_questboard/login/login_page/value_object/parent_id_state.dart';
import 'package:allowance_questboard/login/login_page/value_object/user_id_state.dart';
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
