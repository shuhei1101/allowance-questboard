import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart' show Locale;
import 'package:allowance_questboard/login/usecase/update_language_from_locale/update_language_from_locale_usecase.dart';
import 'package:allowance_questboard/login/usecase/update_language_from_locale/update_language_from_locale_usecase_command.dart';
import 'package:allowance_questboard/login/usecase/update_language_from_locale/update_language_from_locale_usecase_result.dart';
import 'package:allowance_questboard/login/state/user_session_state_notifier.dart';
import 'package:allowance_questboard/login/state/user_session_state.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';

void main() {
  group('UpdateLanguageFromLocaleUsecase', () {
    late UpdateLanguageFromLocaleUsecase usecase;
    late UserSessionStateNotifier stateNotifier;

    setUp(() {
      usecase = UpdateLanguageFromLocaleUsecase();
      stateNotifier = UserSessionStateNotifier(const UserSessionState());
    });

    group('execute', () {
      test('日本語Localeから正しく言語タイプを更新できること', () async {
        // 準備
        const locale = Locale('ja', 'JP');
        final cmd = UpdateLanguageFromLocaleUsecaseCommand(
          locale: locale,
          userSessionStateNotifier: stateNotifier,
        );

        // 実行
        final result = await usecase.execute(cmd);

        // 検証
        expect(result.isSuccess, equals(true));
        expect(result.updatedLanguageType, equals(LanguageType.japanese));
        expect(result.errorMessage, isNull);
        expect(stateNotifier.state.currentLanguageType, equals(LanguageType.japanese));
      });

      test('英語Localeから正しく言語タイプを更新できること', () async {
        // 準備
        const locale = Locale('en', 'US');
        final cmd = UpdateLanguageFromLocaleUsecaseCommand(
          locale: locale,
          userSessionStateNotifier: stateNotifier,
        );

        // 実行
        final result = await usecase.execute(cmd);

        // 検証
        expect(result.isSuccess, equals(true));
        expect(result.updatedLanguageType, equals(LanguageType.english));
        expect(result.errorMessage, isNull);
        expect(stateNotifier.state.currentLanguageType, equals(LanguageType.english));
      });

      test('未対応言語の場合はデフォルトで日本語に設定されること', () async {
        // 準備
        const locale = Locale('fr', 'FR'); // フランス語（未対応）
        final cmd = UpdateLanguageFromLocaleUsecaseCommand(
          locale: locale,
          userSessionStateNotifier: stateNotifier,
        );

        // 実行
        final result = await usecase.execute(cmd);

        // 検証
        expect(result.isSuccess, equals(true));
        expect(result.updatedLanguageType, equals(LanguageType.japanese)); // デフォルト
        expect(result.errorMessage, isNull);
        expect(stateNotifier.state.currentLanguageType, equals(LanguageType.japanese));
      });
    });
  });

  group('UpdateLanguageFromLocaleUsecaseCommand', () {
    test('正しく初期化できること', () {
      // 準備
      const locale = Locale('ja', 'JP');
      final stateNotifier = UserSessionStateNotifier(const UserSessionState());
      
      // 実行
      final cmd = UpdateLanguageFromLocaleUsecaseCommand(
        locale: locale,
        userSessionStateNotifier: stateNotifier,
      );

      // 検証
      expect(cmd.locale, equals(locale));
      expect(cmd.userSessionStateNotifier, equals(stateNotifier));
    });
  });

  group('UpdateLanguageFromLocaleUsecaseResult', () {
    test('成功結果を正しく作成できること', () {
      // 実行
      final result = UpdateLanguageFromLocaleUsecaseResult(
        isSuccess: true,
        updatedLanguageType: LanguageType.japanese,
        errorMessage: null,
      );

      // 検証
      expect(result.isSuccess, equals(true));
      expect(result.updatedLanguageType, equals(LanguageType.japanese));
      expect(result.errorMessage, isNull);
    });

    test('失敗結果を正しく作成できること', () {
      // 実行
      final result = UpdateLanguageFromLocaleUsecaseResult(
        isSuccess: false,
        updatedLanguageType: null,
        errorMessage: 'エラーが発生しました',
      );

      // 検証
      expect(result.isSuccess, equals(false));
      expect(result.updatedLanguageType, isNull);
      expect(result.errorMessage, equals('エラーが発生しました'));
    });
  });
}
