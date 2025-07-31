import 'package:allowance_questboard/language/enum/language_type.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_session_state.freezed.dart';

/// ユーザーセッションの状態を管理するクラス
@freezed
abstract class UserSessionState with _$UserSessionState {
  const factory UserSessionState({
    /// 現在の言語タイプ
    @Default(null) LanguageType? currentLanguageType,
  }) = _UserSessionState;
}
