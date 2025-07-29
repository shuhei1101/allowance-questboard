import 'package:allowance_questboard/login/api/v1/init/init_api_response.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';
import 'package:allowance_questboard/core/state/base_state_notifier.dart';
import 'package:allowance_questboard/login/state/user_session_state.dart' show UserSessionState;
import 'package:hooks_riverpod/hooks_riverpod.dart';

final userSessionStateNotifierProvider = StateNotifierProvider<UserSessionStateNotifier, UserSessionState>(
  (ref) => UserSessionStateNotifier(const UserSessionState()),
);

class UserSessionStateNotifier extends BaseStateNotifier<UserSessionState, InitApiResponse> {

  UserSessionStateNotifier(super.state);

  @override
  void updateFromResponse(
    InitApiResponse initApiResponse,
  ) {
    // DTOリストから言語タイプの値を更新
    LanguageType.updateFromLanguageDtoList(initApiResponse.languages.list);
    
    // デフォルトで日本語を設定（実際のアプリではユーザーの設定に基づく）
    final currentLanguageType = LanguageType.japanese;

    // 状態を更新
    state = UserSessionState(
      currentLanguageType: currentLanguageType,
    );
  }

  // 状態を更新
  @override
  void updateState({
    LanguageType? currentLanguageType,
  }) {
    state = UserSessionState(
      currentLanguageType: currentLanguageType ?? state.currentLanguageType,
    );
  }
  
  /// 現在の言語タイプを更新
  void updateCurrentLanguageType(LanguageType languageType) {
    updateState(currentLanguageType: languageType);
  }

  /// 言語を更新（単体メソッド）
  /// 
  /// [languageType] 更新する言語タイプ
  void updateLanguage(LanguageType languageType) {
    updateCurrentLanguageType(languageType);
  }
}
