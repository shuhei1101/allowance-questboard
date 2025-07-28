import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/login/state/init_data_state.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';

void main() {
  group('InitDataState', () {
    group('constructor', () {
      test('デフォルト値で初期化できること', () {
        // 実行
        const initDataState = InitDataState();
        
        // 検証
        expect(initDataState.currentLanguageType, isNull);
      });

      test('言語タイプを指定して初期化できること', () {
        // 準備
        final languageType = LanguageType.japanese;
        
        // 実行
        final initDataState = InitDataState(
          currentLanguageType: languageType,
        );
        
        // 検証
        expect(initDataState.currentLanguageType, equals(languageType));
      });
    });

    group('copyWith', () {
      test('言語タイプを更新できること', () {
        // 準備
        final originalState = InitDataState(
          currentLanguageType: LanguageType.english,
        );
        
        // 実行
        final updatedState = originalState.copyWith(
          currentLanguageType: LanguageType.japanese,
        );
        
        // 検証
        expect(updatedState.currentLanguageType, equals(LanguageType.japanese));
      });

      test('nullを指定して言語タイプをクリアできること', () {
        // 準備
        final originalState = InitDataState(
          currentLanguageType: LanguageType.japanese,
        );
        
        // 実行
        final updatedState = originalState.copyWith(
          currentLanguageType: null,
        );
        
        // 検証
        expect(updatedState.currentLanguageType, isNull);
      });
    });

    group('equality', () {
      test('同じ値を持つインスタンスは等価であること', () {
        // 準備
        final state1 = InitDataState(
          currentLanguageType: LanguageType.japanese,
        );
        final state2 = InitDataState(
          currentLanguageType: LanguageType.japanese,
        );
        
        // 検証
        expect(state1, equals(state2));
        expect(state1.hashCode, equals(state2.hashCode));
      });

      test('異なる値を持つインスタンスは等価でないこと', () {
        // 準備
        final state1 = InitDataState(
          currentLanguageType: LanguageType.japanese,
        );
        final state2 = InitDataState(
          currentLanguageType: LanguageType.english,
        );
        
        // 検証
        expect(state1, isNot(equals(state2)));
      });
    });
  });
}
