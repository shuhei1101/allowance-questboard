import 'dart:convert';
import 'dart:io';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;
import 'package:allowance_questboard/core/constants/api_endpoints.dart';
import 'package:allowance_questboard/core/api/base_api_request.dart';
import 'package:allowance_questboard/core/api/base_api_response.dart';
import 'package:allowance_questboard/core/logger/app_logger.dart' show logger;

/// APIクライアントの基底クラス
/// 
/// 全てのAPIクライアントはこのクラスを継承して実装します。
/// HTTP通信の共通処理や認証ヘッダーの設定を担当します。
abstract class BaseApiClient<RequestType extends BaseApiRequest, ResponseType extends BaseApiResponse> {
  /// HTTPクライアント
  final http.Client _httpClient = GetIt.I<http.Client>();

  /// BaseApiClientのコンストラクタ
  /// 
  /// [httpClient] HTTPクライアント
  BaseApiClient();

  /// エンドポイントを取得する抽象メソッド
  /// 各具象クラスで実装すること
  ApiEndpoint get endpoint;

  /// URIを取得
  /// 
  /// Returns: エンドポイントのURI
  Uri get uri => Uri.parse(endpoint.url);

  /// APIリクエストを実行する抽象メソッド
  /// 各具象クラスで実装すること
  /// 
  /// [request] リクエストデータ
  /// Returns: レスポンスデータ
  Future<ResponseType> execute(RequestType request);

  /// GETリクエストを送信（継承先で使用可能）
  /// 
  /// [request] リクエストデータ
  /// Returns: HTTPレスポンス
  Future<http.Response> get(BaseApiRequest request) async {
    return await _httpClient.get(
      uri,
      headers: request.headers,
    );
  }

  /// POSTリクエストを送信（継承先で使用可能）
  /// 
  /// [request] リクエストデータ
  /// Returns: HTTPレスポンス
  Future<http.Response> post(BaseApiRequest request) async {
    // デバッグ用ログ
    logger.d('POST Request: $uri');
    logger.d('Headers: ${request.headers}');
    logger.d('Body: ${request.toJson()}');
    
    final response = await _httpClient.post(
      uri,
      headers: request.headers,
      body: request.toJson(),
    );
    
    logger.d('Response Status: ${response.statusCode}');
    logger.d('Response Body: ${response.body}');
    
    return response;
  }

  /// PUTリクエストを送信（継承先で使用可能）
  /// 
  /// [request] リクエストデータ
  /// Returns: HTTPレスポンス
  Future<http.Response> put(BaseApiRequest request) async {
    return await _httpClient.put(
      uri,
      headers: request.headers,
      body: request.toJson(),
    );
  }

  /// DELETEリクエストを送信（継承先で使用可能）
  /// 
  /// [request] リクエストデータ
  /// Returns: HTTPレスポンス
  Future<http.Response> delete(BaseApiRequest request) async {
    return await _httpClient.delete(
      uri,
      headers: request.headers,
    );
  }

  /// HTTPレスポンスを処理（継承先で使用可能）
  /// 
  /// [response] HTTPレスポンス
  /// Returns: レスポンスのMap
  /// Throws: [HttpException] HTTPエラーが発生した場合
  dynamic handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.body.isEmpty) {
        return <String, dynamic>{};
      }
      return jsonDecode(response.body);
    } else {
      throw HttpException(
        'HTTP Error: ${response.statusCode} - ${response.reasonPhrase}',
        uri: response.request?.url,
      );
    }
  }

  /// リソースを解放
  void dispose() {
    _httpClient.close();
  }
}
