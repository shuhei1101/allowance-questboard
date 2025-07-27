import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/login/api/v1/init/init_api_response.dart';

void main() {
  group('InitApiResponse', () {
    group('fromJson', () {
      test('JSONからオブジェクトを作成できること', () {
        // 準備
        final json = {
          'languages': {
            'list': [
              {
                'id': 1,
                'code': 'ja',
                'name': '日本語',
                'is_active': true,
                'sort_order': 1,
              },
              {
                'id': 2,
                'code': 'en',
                'name': 'English',
                'is_active': true,
                'sort_order': 2,
              },
            ],
          },
        };

        // 実行
        final result = InitApiResponse.fromJson(json);

        // 検証
        expect(result.languages.list.length, 2);
        expect(result.languages.list[0].id, 1);
        expect(result.languages.list[0].code, 'ja');
        expect(result.languages.list[0].name, '日本語');
        expect(result.languages.list[0].isActive, true);
        expect(result.languages.list[0].sortOrder, 1);
        expect(result.languages.list[1].id, 2);
        expect(result.languages.list[1].code, 'en');
        expect(result.languages.list[1].name, 'English');
        expect(result.languages.list[1].isActive, true);
        expect(result.languages.list[1].sortOrder, 2);
      });
    });
  });

  group('LanguagesDto', () {
    group('fromJson', () {
      test('JSONからオブジェクトを作成できること', () {
        // 準備
        final json = {
          'list': [
            {
              'id': 1,
              'code': 'ja',
              'name': '日本語',
              'is_active': true,
              'sort_order': 1,
            },
          ],
        };

        // 実行
        final result = LanguagesDto.fromJson(json);

        // 検証
        expect(result.list.length, 1);
        expect(result.list[0].id, 1);
      });
    });
  });

  group('LanguageDto', () {
    group('fromJson', () {
      test('JSONからオブジェクトを作成できること', () {
        // 準備
        final json = {
          'id': 1,
          'code': 'ja',
          'name': '日本語',
          'is_active': true,
          'sort_order': 1,
        };

        // 実行
        final result = LanguageDto.fromJson(json);

        // 検証
        expect(result.id, 1);
        expect(result.code, 'ja');
        expect(result.name, '日本語');
        expect(result.isActive, true);
        expect(result.sortOrder, 1);
      });
    });
  });
}
