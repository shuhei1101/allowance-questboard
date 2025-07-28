import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/language/enum/value_object/language_type_value.dart';
import 'package:allowance_questboard/language/enum/value_object/language_id.dart';
import 'package:allowance_questboard/language/enum/value_object/language_code.dart';
import 'package:allowance_questboard/language/enum/value_object/language_name.dart';
import 'package:allowance_questboard/login/api/v1/init/init_api_response.dart' show LanguageDto;
import 'package:allowance_questboard/shared/domain/value_object/sort_order.dart';

void main() {
  group('LanguageTypeValue', () {
    group('constructor', () {
      test('必須のIDを指定して初期化できること', () {
        // 準備
        final id = LanguageId(1);
        
        // 実行
        final languageTypeValue = LanguageTypeValue(id: id);
        
        // 検証
        expect(languageTypeValue.id, equals(id));
        expect(languageTypeValue.languageId, equals(id));
        expect(languageTypeValue.code.value, equals("0"));
        expect(languageTypeValue.name.value, equals("Unknown"));
        expect(languageTypeValue.isActive, equals(false));
        expect(languageTypeValue.sortOrder.value, equals(0));
      });

      test('全ての値を指定して初期化できること', () {
        // 準備
        final id = LanguageId(1);
        final code = LanguageCode("ja");
        final name = LanguageName("日本語");
        final sortOrder = SortOrder(1);
        
        // 実行
        final languageTypeValue = LanguageTypeValue(
          id: id,
          code: code,
          name: name,
          isActive: true,
          sortOrder: sortOrder,
        );
        
        // 検証
        expect(languageTypeValue.id, equals(id));
        expect(languageTypeValue.languageId, equals(id));
        expect(languageTypeValue.code, equals(code));
        expect(languageTypeValue.name, equals(name));
        expect(languageTypeValue.isActive, equals(true));
        expect(languageTypeValue.sortOrder, equals(sortOrder));
      });
    });

    group('setFromDto', () {
      test('DTOから値を設定できること', () {
        // 準備
        final id = LanguageId(1);
        final languageTypeValue = LanguageTypeValue(id: id);
        final dto = LanguageDto(
          id: 1,
          code: "en",
          name: "English",
          isActive: true,
          sortOrder: 2,
        );
        
        // 実行
        languageTypeValue.setFromDto(dto);
        
        // 検証
        expect(languageTypeValue.code.value, equals("en"));
        expect(languageTypeValue.name.value, equals("English"));
        expect(languageTypeValue.isActive, equals(true));
        expect(languageTypeValue.sortOrder.value, equals(2));
      });

      test('DTOから値を設定してもIDは変更されないこと', () {
        // 準備
        final id = LanguageId(5);
        final languageTypeValue = LanguageTypeValue(id: id);
        final dto = LanguageDto(
          id: 1,
          code: "en",
          name: "English",
          isActive: true,
          sortOrder: 2,
        );
        
        // 実行
        languageTypeValue.setFromDto(dto);
        
        // 検証
        expect(languageTypeValue.id, equals(id));
        expect(languageTypeValue.languageId, equals(id));
      });
    });
  });
}
