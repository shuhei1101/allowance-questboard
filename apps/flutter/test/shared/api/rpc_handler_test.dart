import 'package:allowance_questboard/core/api/rpc_handler.dart';
import 'package:test/test.dart';

void main() {
  group('JsonRpcRequest', () {
    group('toJson', () {
      test('正常にJsonに変換できること', () {
        final request = JsonRpcRequest(
          method: 'testMethod',
          params: {'key': 'value'},
          id: 1,
        );

        final json = request.toJson();

        expect(json['jsonrpc'], '2.0');
        expect(json['method'], 'testMethod');
        expect(json['params'], {'key': 'value'});
        expect(json['id'], 1);
      });
    });
  });
  group('JsonRpcHandler', () {
    group('parseResponse', () {
      test('正常にレスポンスをパースできること', () {
        final handler = JsonRpcHandler();
        final json = {
          'jsonrpc': '2.0',
          'result': {'key': 'value'},
          'id': 1,
        };

        final response = handler.parseResponse<Map<String, dynamic>>(
          json,
          (data) => data,
        );

        expect(response.result, {'key': 'value'});
        expect(response.error, isNull);
        expect(response.id, 1);
      });

      test('エラーが含まれる場合、エラーを返すこと', () {
        final handler = JsonRpcHandler();
        final json = {
          'jsonrpc': '2.0',
          'error': {'code': -32601, 'message': 'Method not found'},
          'id': 1,
        };

        final response = handler.parseResponse<Map<String, dynamic>>(
          json,
          (data) => data,
        );

        expect(response.result, isNull);
        expect(response.error?.code, -32601);
        expect(response.error?.message, 'Method not found');
        expect(response.id, 1);
      });
    });
  });
}
