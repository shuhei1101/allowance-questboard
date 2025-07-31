import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:get_it/get_it.dart';
import 'package:allowance_questboard/init/api/v1/init_api.dart';
import 'package:allowance_questboard/init/api/v1/init_api_request.dart';
import 'package:allowance_questboard/init/api/v1/init_api_response.dart';

// テスト用のモッククライアント
class MockHttpClient extends http.BaseClient {
  final http.Response mockResponse;

  MockHttpClient(this.mockResponse);

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) async {
    return http.StreamedResponse(
      Stream.fromIterable([mockResponse.bodyBytes]),
      mockResponse.statusCode,
      headers: mockResponse.headers,
    );
  }
}

void main() {
  setUp(() {
    // 各テストの前にGetItをリセット
  });

  tearDown(() {
    GetIt.I.reset();
  });

  group('InitApi', () {
    group('endpoint', () {
      test('正しいエンドポイントを返すこと', () {
        // 準備
        final mockClient = MockHttpClient(http.Response('', 200));
        GetIt.I.registerSingleton<http.Client>(mockClient);
        final initApi = InitApi();

        // 実行・検証
        expect(initApi.endpoint.endpoint, '/api/v1/init');
      });
    });

    group('execute', () {
      test('正常にレスポンスを取得できること', () async {
        // 準備
        final responseBody = '''
        {
          "languages": {
            "list": [
              {
                "id": 1,
                "code": "ja",
                "name": "日本語",
                "is_active": true,
                "sort_order": 1
              },
              {
                "id": 2,
                "code": "en",
                "name": "English",
                "is_active": true,
                "sort_order": 2
              }
            ]
          }
        }
        ''';

        final mockClient = MockHttpClient(http.Response(responseBody, 200));
        GetIt.I.registerSingleton<http.Client>(mockClient);
        final initApi = InitApi();

        const request = InitApiRequest();

        // 実行
        final result = await initApi.execute(request);

        // 検証
        expect(result, isA<InitApiResponse>());
        expect(result.languages.list.length, 2);
        expect(result.languages.list[0].code, 'ja');
        expect(result.languages.list[0].name, '日本語');
        expect(result.languages.list[1].code, 'en');
        expect(result.languages.list[1].name, 'English');
      });

      test('HTTPエラーが発生した場合は例外をスローすること', () async {
        // 準備
        final mockClient = MockHttpClient(http.Response('Error', 500));
        GetIt.I.registerSingleton<http.Client>(mockClient);
        final initApi = InitApi();

        const request = InitApiRequest();

        // 実行・検証
        expect(() => initApi.execute(request), throwsException);
      });
    });
  });
}
