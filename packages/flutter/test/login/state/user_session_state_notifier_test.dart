import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/init/state/user_session_state.dart';
import 'package:allowance_questboard/init/state/user_session_state_notifier.dart';
import 'package:allowance_questboard/init/api/v1/init_api_response.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';

void main() {
  group('UserSessionStateNotifier', () {
    late UserSessionStateNotifier notifier;

    setUp(() {
      notifier = UserSessionStateNotifier(const UserSessionState());
    });

    group('constructor', () {
      test('初期状態で初期化できること', () {
        // 検証
        expect(notifier.state.currentLanguageType, isNull);
      });
    });

    group('updateFromResponse', () {
      test('InitApiResponseから状態を更新できること', () {
        // 準備
        final response = InitApiResponse(
          languages: LanguagesDto(
            list: [
              LanguageDto(
                id: 1,
                code: "ja",
                name: "日本語",
                isActive: true,
                sortOrder: 1,
              ),
              LanguageDto(
                id: 2,
                code: "en",
                name: "English",
                isActive: true,
                sortOrder: 2,
              ),
            ],
          ),
        );

        // 実行
        notifier.updateFromResponse(response);

        // 検証
        expect(notifier.state.currentLanguageType, equals(LanguageType.japanese));
      });
    });

    group('updateState', () {
      test('言語タイプを更新できること', () {
        // 実行
        notifier.updateState(currentLanguageType: LanguageType.english);

        // 検証
        expect(notifier.state.currentLanguageType, equals(LanguageType.english));
      });

      test('nullを指定して既存の値を保持できること', () {
        // 準備
        notifier.updateState(currentLanguageType: LanguageType.japanese);

        // 実行
        notifier.updateState(currentLanguageType: null);

        // 検証
        expect(notifier.state.currentLanguageType, equals(LanguageType.japanese));
      });
    });

    group('updateCurrentLanguageType', () {
      test('言語タイプを直接更新できること', () {
        // 実行
        notifier.updateCurrentLanguageType(LanguageType.english);

        // 検証
        expect(notifier.state.currentLanguageType, equals(LanguageType.english));
      });
    });

    group('updateLanguage', () {
      test('updateLanguageメソッドで言語タイプを更新できること', () {
        // 実行
        notifier.updateLanguage(LanguageType.english);

        // 検証
        expect(notifier.state.currentLanguageType, equals(LanguageType.english));
      });

      test('updateLanguageとupdateCurrentLanguageTypeが同じ結果になること', () {
        // 準備
        final notifier1 = UserSessionStateNotifier(const UserSessionState());
        final notifier2 = UserSessionStateNotifier(const UserSessionState());

        // 実行
        notifier1.updateLanguage(LanguageType.japanese);
        notifier2.updateCurrentLanguageType(LanguageType.japanese);

        // 検証
        expect(notifier1.state.currentLanguageType, equals(notifier2.state.currentLanguageType));
      });
    });
  });
}
