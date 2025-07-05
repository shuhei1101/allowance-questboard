// dart format width=80
// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'login_page_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$LoginPageState {
  String get userName;
  String get password;
  bool get isValid;

  /// Create a copy of LoginPageState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  $LoginPageStateCopyWith<LoginPageState> get copyWith =>
      _$LoginPageStateCopyWithImpl<LoginPageState>(
          this as LoginPageState, _$identity);

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is LoginPageState &&
            (identical(other.userName, userName) ||
                other.userName == userName) &&
            (identical(other.password, password) ||
                other.password == password) &&
            (identical(other.isValid, isValid) || other.isValid == isValid));
  }

  @override
  int get hashCode => Object.hash(runtimeType, userName, password, isValid);

  @override
  String toString() {
    return 'LoginPageState(userName: $userName, password: $password, isValid: $isValid)';
  }
}

/// @nodoc
abstract mixin class $LoginPageStateCopyWith<$Res> {
  factory $LoginPageStateCopyWith(
          LoginPageState value, $Res Function(LoginPageState) _then) =
      _$LoginPageStateCopyWithImpl;
  @useResult
  $Res call({String userName, String password, bool isValid});
}

/// @nodoc
class _$LoginPageStateCopyWithImpl<$Res>
    implements $LoginPageStateCopyWith<$Res> {
  _$LoginPageStateCopyWithImpl(this._self, this._then);

  final LoginPageState _self;
  final $Res Function(LoginPageState) _then;

  /// Create a copy of LoginPageState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? userName = null,
    Object? password = null,
    Object? isValid = null,
  }) {
    return _then(_self.copyWith(
      userName: null == userName
          ? _self.userName
          : userName // ignore: cast_nullable_to_non_nullable
              as String,
      password: null == password
          ? _self.password
          : password // ignore: cast_nullable_to_non_nullable
              as String,
      isValid: null == isValid
          ? _self.isValid
          : isValid // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc

class _LoginPageState implements LoginPageState {
  const _LoginPageState(
      {this.userName = '', this.password = '', this.isValid = false});

  @override
  @JsonKey()
  final String userName;
  @override
  @JsonKey()
  final String password;
  @override
  @JsonKey()
  final bool isValid;

  /// Create a copy of LoginPageState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  _$LoginPageStateCopyWith<_LoginPageState> get copyWith =>
      __$LoginPageStateCopyWithImpl<_LoginPageState>(this, _$identity);

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _LoginPageState &&
            (identical(other.userName, userName) ||
                other.userName == userName) &&
            (identical(other.password, password) ||
                other.password == password) &&
            (identical(other.isValid, isValid) || other.isValid == isValid));
  }

  @override
  int get hashCode => Object.hash(runtimeType, userName, password, isValid);

  @override
  String toString() {
    return 'LoginPageState(userName: $userName, password: $password, isValid: $isValid)';
  }
}

/// @nodoc
abstract mixin class _$LoginPageStateCopyWith<$Res>
    implements $LoginPageStateCopyWith<$Res> {
  factory _$LoginPageStateCopyWith(
          _LoginPageState value, $Res Function(_LoginPageState) _then) =
      __$LoginPageStateCopyWithImpl;
  @override
  @useResult
  $Res call({String userName, String password, bool isValid});
}

/// @nodoc
class __$LoginPageStateCopyWithImpl<$Res>
    implements _$LoginPageStateCopyWith<$Res> {
  __$LoginPageStateCopyWithImpl(this._self, this._then);

  final _LoginPageState _self;
  final $Res Function(_LoginPageState) _then;

  /// Create a copy of LoginPageState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $Res call({
    Object? userName = null,
    Object? password = null,
    Object? isValid = null,
  }) {
    return _then(_LoginPageState(
      userName: null == userName
          ? _self.userName
          : userName // ignore: cast_nullable_to_non_nullable
              as String,
      password: null == password
          ? _self.password
          : password // ignore: cast_nullable_to_non_nullable
              as String,
      isValid: null == isValid
          ? _self.isValid
          : isValid // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

// dart format on
