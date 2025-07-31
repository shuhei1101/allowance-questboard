import 'package:flutter/material.dart' show Locale;
import 'package:allowance_questboard/init/state/user_session_state_notifier.dart';

/// Localeから言語タイプを更新するユースケースのコマンド
class UpdateLanguageFromLocaleUsecaseCommand {
  /// 更新元のLocale
  final Locale locale;
  
  /// ユーザーセッション状態管理クラス
  final UserSessionStateNotifier userSessionStateNotifier;

  /// コンストラクタ
  /// 
  /// [locale] 更新元のLocale
  /// [userSessionStateNotifier] ユーザーセッション状態管理クラス
  UpdateLanguageFromLocaleUsecaseCommand({
    required this.locale,
    required this.userSessionStateNotifier,
  });
}
