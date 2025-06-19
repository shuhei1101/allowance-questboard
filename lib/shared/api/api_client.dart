import 'dart:convert';
import 'package:allowance_questboard/shared/api/rpc_handler.dart';
import 'package:http/http.dart' as http;

class ApiClient {
  final String baseUrl;
  final http.Client httpClient;

  ApiClient(this.baseUrl, this.httpClient);

  /// [url]: APIエンドポイント (例: "/functions/v1/login")
  /// [method]: JSON-RPCのメソッド名 (例: "loginFamily")
  /// [params]: メソッドのパラメータ (Map形式)
  /// [fromJson]: レスポンスのresult部分を変換する関数
  Future<JsonRpcResponse<T>> request<T>({
    required String url,
    required String method,
    required Map<String, dynamic> params,
    required T Function(Map<String, dynamic>) fromJson,
  }) async {
    final handler = JsonRpcHandler();
    final request = handler.buildRequest(method, params);

    final response = await httpClient.post(
      Uri.parse('$baseUrl$url'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(request.toJson()),
    );

    _handleError(response);

    final Map<String, dynamic> json = jsonDecode(response.body);
    return JsonRpcHandler().parseResponse<T>(json, fromJson);
  }

  void _handleError(http.Response response) {
    if (response.statusCode >= 400) {
      throw Exception('HTTP Error ${response.statusCode}: ${response.body}');
    }
  }
}
