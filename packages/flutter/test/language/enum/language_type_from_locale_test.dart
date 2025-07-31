import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';
import 'package:allowance_questboard/language/enum/value_object/language_id.dart';
import 'package:allowance_questboard/init/api/v1/init_api_response.dart' show LanguageDto;
import 'package:flutter/material.dart' show Locale;

void main() {
  group('LanguageType', () {
    // まず言語タイプを更新して、codeが設定されるようにする
    setUpAll(() {
      final dtoList = [
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
      ];
      LanguageType.updateFromLanguageDtoList(dtoList);
    });

    group('fromLocale', () {
      test('日本語のLocaleから日本語の言語タイプを取得できること', () {
        // 準備
        const locale = Locale('ja');
        
        // 実行
        final result = LanguageType.fromLocale(locale);
        
        // 検証
        expect(result, equals(LanguageType.japanese));
      });

      test('英語のLocaleから英語の言語タイプを取得できること', () {
        // 準備
        const locale = Locale('en');
        
        // 実行
        final result = LanguageType.fromLocale(locale);
        
        // 検証
        expect(result, equals(LanguageType.english));
      });

      test('未知のLocaleの場合は日本語をデフォルトで返すこと', () {
        // 準備
        const locale = Locale('fr'); // フランス語
        
        // 実行
        final result = LanguageType.fromLocale(locale);
        
        // 検証
        expect(result, equals(LanguageType.japanese));
      });
    });

    group('fromLanguageCode', () {
      test('日本語コードから日本語の言語タイプを取得できること', () {
        // 実行
        final result = LanguageType.fromLanguageCode('ja');
        
        // 検証
        expect(result, equals(LanguageType.japanese));
      });

      test('英語コードから英語の言語タイプを取得できること', () {
        // 実行
        final result = LanguageType.fromLanguageCode('en');
        
        // 検証
        expect(result, equals(LanguageType.english));
      });

      test('未知の言語コードの場合は日本語をデフォルトで返すこと', () {
        // 実行
        final result = LanguageType.fromLanguageCode('fr');
        
        // 検証
        expect(result, equals(LanguageType.japanese));
      });

      test('空文字の場合は日本語をデフォルトで返すこと', () {
        // 実行
        final result = LanguageType.fromLanguageCode('');
        
        // 検証
        expect(result, equals(LanguageType.japanese));
      });
    });

    group('existing functionality', () {
      test('fromIdが正常に動作すること', () {
        // 準備
        final id = LanguageId(1);
        
        // 実行
        final result = LanguageType.fromId(id);
        
        // 検証
        expect(result, equals(LanguageType.japanese));
      });

      test('updateFromLanguageDtoListが正常に動作すること', () {
        // 準備
        final dtoList = [
          LanguageDto(
            id: 1,
            code: "ja",
            name: "日本語更新",
            isActive: true,
            sortOrder: 1,
          ),
        ];
        
        // 実行
        LanguageType.updateFromLanguageDtoList(dtoList);
        
        // 検証 (正常に実行されればOK)
        expect(LanguageType.japanese, isNotNull);
      });
    });
  });
}
