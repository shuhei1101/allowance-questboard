import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/language/enum/language_type.dart';
import 'package:allowance_questboard/language/enum/value_object/language_id.dart';
import 'package:allowance_questboard/language/enum/value_object/language_type_value.dart';
import 'package:allowance_questboard/login/api/v1/init/init_api_response.dart' show LanguageDto;

void main() {
  group('LanguageType', () {
    group('values', () {
      test('定義された言語タイプが含まれていること', () {
        // 実行・検証
        expect(LanguageType.values.length, equals(2));
        expect(LanguageType.values.contains(LanguageType.japanese), equals(true));
        expect(LanguageType.values.contains(LanguageType.english), equals(true));
      });

      test('日本語の言語タイプが正しく定義されていること', () {
        // 実行
        final japanese = LanguageType.japanese;
        final japaneseValue = japanese.value as LanguageTypeValue;
        
        // 検証
        expect(japanese.value.id.value, equals(1));
        expect(japaneseValue.languageId.value, equals(1));
      });

      test('英語の言語タイプが正しく定義されていること', () {
        // 実行
        final english = LanguageType.english;
        final englishValue = english.value as LanguageTypeValue;
        
        // 検証
        expect(english.value.id.value, equals(2));
        expect(englishValue.languageId.value, equals(2));
      });
    });

    group('fromId', () {
      test('IDから正しい言語タイプを取得できること', () {
        // 準備
        final id = LanguageId(1);
        
        // 実行
        final result = LanguageType.fromId(id);
        
        // 検証
        expect(result, equals(LanguageType.japanese));
        expect(result.value.id, equals(id));
      });

      test('存在しないIDの場合はArgumentErrorが発生すること', () {
        // 準備
        final id = LanguageId(999);
        
        // 実行・検証
        expect(() => LanguageType.fromId(id), throwsArgumentError);
      });
    });

    group('updateFromLanguageDtoList', () {
      test('DTOリストから言語タイプの値を更新できること', () {
        // 準備
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
        
        // 実行
        LanguageType.updateFromLanguageDtoList(dtoList);
        
        // 検証
        final japaneseValue = LanguageType.japanese.value as LanguageTypeValue;
        final englishValue = LanguageType.english.value as LanguageTypeValue;
        
        expect(japaneseValue.code.value, equals("ja"));
        expect(japaneseValue.name.value, equals("日本語"));
        expect(japaneseValue.isActive, equals(true));
        expect(japaneseValue.sortOrder.value, equals(1));
        
        expect(englishValue.code.value, equals("en"));
        expect(englishValue.name.value, equals("English"));
        expect(englishValue.isActive, equals(true));
        expect(englishValue.sortOrder.value, equals(2));
      });

      test('空のDTOリストでも例外が発生しないこと', () {
        // 準備
        final dtoList = <LanguageDto>[];
        
        // 実行・検証
        expect(() => LanguageType.updateFromLanguageDtoList(dtoList), returnsNormally);
      });
    });

    group('toString', () {
      test('適切な文字列表現を返すこと', () {
        // 準備・実行
        final japaneseString = LanguageType.japanese.toString();
        final japaneseValue = LanguageType.japanese.value as LanguageTypeValue;
        
        // 検証
        expect(japaneseString, contains('LanguageType'));
        expect(japaneseString, contains(japaneseValue.name.value));
      });
    });
  });
}
