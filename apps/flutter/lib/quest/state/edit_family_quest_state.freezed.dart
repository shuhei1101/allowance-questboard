// dart format width=80
// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'edit_family_quest_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$EditFamilyQuestState {
  QuestTitleState? get questTitleState;
  bool get isValid;

  /// Create a copy of EditFamilyQuestState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  $EditFamilyQuestStateCopyWith<EditFamilyQuestState> get copyWith =>
      _$EditFamilyQuestStateCopyWithImpl<EditFamilyQuestState>(
          this as EditFamilyQuestState, _$identity);

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is EditFamilyQuestState &&
            const DeepCollectionEquality()
                .equals(other.questTitleState, questTitleState) &&
            (identical(other.isValid, isValid) || other.isValid == isValid));
  }

  @override
  int get hashCode => Object.hash(runtimeType,
      const DeepCollectionEquality().hash(questTitleState), isValid);

  @override
  String toString() {
    return 'EditFamilyQuestState(questTitleState: $questTitleState, isValid: $isValid)';
  }
}

/// @nodoc
abstract mixin class $EditFamilyQuestStateCopyWith<$Res> {
  factory $EditFamilyQuestStateCopyWith(EditFamilyQuestState value,
          $Res Function(EditFamilyQuestState) _then) =
      _$EditFamilyQuestStateCopyWithImpl;
  @useResult
  $Res call({QuestTitleState? questTitleState, bool isValid});
}

/// @nodoc
class _$EditFamilyQuestStateCopyWithImpl<$Res>
    implements $EditFamilyQuestStateCopyWith<$Res> {
  _$EditFamilyQuestStateCopyWithImpl(this._self, this._then);

  final EditFamilyQuestState _self;
  final $Res Function(EditFamilyQuestState) _then;

  /// Create a copy of EditFamilyQuestState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? questTitleState = freezed,
    Object? isValid = null,
  }) {
    return _then(_self.copyWith(
      questTitleState: freezed == questTitleState
          ? _self.questTitleState
          : questTitleState // ignore: cast_nullable_to_non_nullable
              as QuestTitleState?,
      isValid: null == isValid
          ? _self.isValid
          : isValid // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc

class _EditFamilyQuestState implements EditFamilyQuestState {
  const _EditFamilyQuestState({this.questTitleState, this.isValid = false});

  @override
  final QuestTitleState? questTitleState;
  @override
  @JsonKey()
  final bool isValid;

  /// Create a copy of EditFamilyQuestState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  _$EditFamilyQuestStateCopyWith<_EditFamilyQuestState> get copyWith =>
      __$EditFamilyQuestStateCopyWithImpl<_EditFamilyQuestState>(
          this, _$identity);

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _EditFamilyQuestState &&
            const DeepCollectionEquality()
                .equals(other.questTitleState, questTitleState) &&
            (identical(other.isValid, isValid) || other.isValid == isValid));
  }

  @override
  int get hashCode => Object.hash(runtimeType,
      const DeepCollectionEquality().hash(questTitleState), isValid);

  @override
  String toString() {
    return 'EditFamilyQuestState(questTitleState: $questTitleState, isValid: $isValid)';
  }
}

/// @nodoc
abstract mixin class _$EditFamilyQuestStateCopyWith<$Res>
    implements $EditFamilyQuestStateCopyWith<$Res> {
  factory _$EditFamilyQuestStateCopyWith(_EditFamilyQuestState value,
          $Res Function(_EditFamilyQuestState) _then) =
      __$EditFamilyQuestStateCopyWithImpl;
  @override
  @useResult
  $Res call({QuestTitleState? questTitleState, bool isValid});
}

/// @nodoc
class __$EditFamilyQuestStateCopyWithImpl<$Res>
    implements _$EditFamilyQuestStateCopyWith<$Res> {
  __$EditFamilyQuestStateCopyWithImpl(this._self, this._then);

  final _EditFamilyQuestState _self;
  final $Res Function(_EditFamilyQuestState) _then;

  /// Create a copy of EditFamilyQuestState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $Res call({
    Object? questTitleState = freezed,
    Object? isValid = null,
  }) {
    return _then(_EditFamilyQuestState(
      questTitleState: freezed == questTitleState
          ? _self.questTitleState
          : questTitleState // ignore: cast_nullable_to_non_nullable
              as QuestTitleState?,
      isValid: null == isValid
          ? _self.isValid
          : isValid // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

// dart format on
