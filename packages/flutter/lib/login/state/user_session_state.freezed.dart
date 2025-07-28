// dart format width=80
// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user_session_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$UserSessionState {
  /// 現在の言語タイプ
  LanguageType? get currentLanguageType;

  /// Create a copy of UserSessionState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  $UserSessionStateCopyWith<UserSessionState> get copyWith =>
      _$UserSessionStateCopyWithImpl<UserSessionState>(
          this as UserSessionState, _$identity);

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is UserSessionState &&
            (identical(other.currentLanguageType, currentLanguageType) ||
                other.currentLanguageType == currentLanguageType));
  }

  @override
  int get hashCode => Object.hash(runtimeType, currentLanguageType);

  @override
  String toString() {
    return 'UserSessionState(currentLanguageType: $currentLanguageType)';
  }
}

/// @nodoc
abstract mixin class $UserSessionStateCopyWith<$Res> {
  factory $UserSessionStateCopyWith(
          UserSessionState value, $Res Function(UserSessionState) _then) =
      _$UserSessionStateCopyWithImpl;
  @useResult
  $Res call({LanguageType? currentLanguageType});
}

/// @nodoc
class _$UserSessionStateCopyWithImpl<$Res>
    implements $UserSessionStateCopyWith<$Res> {
  _$UserSessionStateCopyWithImpl(this._self, this._then);

  final UserSessionState _self;
  final $Res Function(UserSessionState) _then;

  /// Create a copy of UserSessionState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? currentLanguageType = freezed,
  }) {
    return _then(_self.copyWith(
      currentLanguageType: freezed == currentLanguageType
          ? _self.currentLanguageType
          : currentLanguageType // ignore: cast_nullable_to_non_nullable
              as LanguageType?,
    ));
  }
}

/// @nodoc

class _UserSessionState implements UserSessionState {
  const _UserSessionState({this.currentLanguageType = null});

  /// 現在の言語タイプ
  @override
  @JsonKey()
  final LanguageType? currentLanguageType;

  /// Create a copy of UserSessionState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  _$UserSessionStateCopyWith<_UserSessionState> get copyWith =>
      __$UserSessionStateCopyWithImpl<_UserSessionState>(this, _$identity);

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _UserSessionState &&
            (identical(other.currentLanguageType, currentLanguageType) ||
                other.currentLanguageType == currentLanguageType));
  }

  @override
  int get hashCode => Object.hash(runtimeType, currentLanguageType);

  @override
  String toString() {
    return 'UserSessionState(currentLanguageType: $currentLanguageType)';
  }
}

/// @nodoc
abstract mixin class _$UserSessionStateCopyWith<$Res>
    implements $UserSessionStateCopyWith<$Res> {
  factory _$UserSessionStateCopyWith(
          _UserSessionState value, $Res Function(_UserSessionState) _then) =
      __$UserSessionStateCopyWithImpl;
  @override
  @useResult
  $Res call({LanguageType? currentLanguageType});
}

/// @nodoc
class __$UserSessionStateCopyWithImpl<$Res>
    implements _$UserSessionStateCopyWith<$Res> {
  __$UserSessionStateCopyWithImpl(this._self, this._then);

  final _UserSessionState _self;
  final $Res Function(_UserSessionState) _then;

  /// Create a copy of UserSessionState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $Res call({
    Object? currentLanguageType = freezed,
  }) {
    return _then(_UserSessionState(
      currentLanguageType: freezed == currentLanguageType
          ? _self.currentLanguageType
          : currentLanguageType // ignore: cast_nullable_to_non_nullable
              as LanguageType?,
    ));
  }
}

// dart format on
