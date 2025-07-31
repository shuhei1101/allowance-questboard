import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/init/api/v1/init_api_request.dart';

void main() {
  group('InitApiRequest', () {
    group('toJson', () {
      test('nullを返すこと', () {
        // 準備
        const request = InitApiRequest();

        // 実行
        final result = request.toJson();

        // 検証
        expect(result, isNull);
      });
    });

    group('headers', () {
      test('適切なヘッダーを返すこと', () {
        // 準備
        const request = InitApiRequest();

        // 実行
        final result = request.headers;

        // 検証
        expect(result['Content-Type'], 'application/json');
        expect(result.containsKey('Authorization'), false);
      });
    });
  });
}
