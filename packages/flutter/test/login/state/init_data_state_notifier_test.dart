import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/login/state/init_data_state.dart';
import 'package:allowance_questboard/login/state/init_data_state_notifier.dart';
import 'package:allowance_questboard/login/api/v1/init/init_api_response.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';

void main() {
  group('InitDataStateNotifier', () {
    late InitDataStateNotifier notifier;

    setUp(() {
      notifier = InitDataStateNotifier(const InitDataState());
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
  });
}
