import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:allowance_questboard/core/security/auth_tokens.dart';

/// APIクライアントの基底クラス
/// 
/// 全てのAPIクライアントはこのクラスを継承して実装します。
/// HTTP通信の共通処理や認証ヘッダーの設定を担当します。
abstract class BaseApiClient {
  /// HTTPクライアント
  final http.Client _httpClient;
  
  /// APIのベースURL
  final String _baseUrl;
  
  /// 認証トークン
  AuthTokens? _authTokens;

  /// BaseApiClientのコンストラクタ
  /// 
  /// [baseUrl] APIのベースURL
  /// [httpClient] HTTPクライアント
  BaseApiClient(this._baseUrl, this._httpClient);

  /// 認証トークンを設定
  /// 
  /// [tokens] 認証トークン
  void setAuthTokens(AuthTokens tokens) {
    _authTokens = tokens;
  }

  /// 認証ヘッダーを取得
  /// 
  /// Returns: 認証ヘッダーのMap
  Map<String, String> _getAuthHeaders() {
    final headers = <String, String>{
      'Content-Type': 'application/json',
    };
    
    if (_authTokens != null) {
      headers['Authorization'] = 'Bearer ${_authTokens!.accessToken}';
    }
    
    return headers;
  }

  /// GETリクエストを送信
  /// 
  /// [path] リクエストパス
  /// [queryParameters] クエリパラメータ
  /// Returns: レスポンスのMap
  /// Throws: [HttpException] HTTPエラーが発生した場合
  Future<Map<String, dynamic>> get(
    String path, {
    Map<String, String>? queryParameters,
  }) async {
    final uri = Uri.parse('$_baseUrl$path');
    final uriWithQuery = queryParameters != null
        ? uri.replace(queryParameters: queryParameters)
        : uri;

    final response = await _httpClient.get(
      uriWithQuery,
      headers: _getAuthHeaders(),
    );

    return _handleResponse(response);
  }

  /// POSTリクエストを送信
  /// 
  /// [path] リクエストパス
  /// [body] リクエストボディ
  /// Returns: レスポンスのMap
  /// Throws: [HttpException] HTTPエラーが発生した場合
  Future<Map<String, dynamic>> post(
    String path, {
    Map<String, dynamic>? body,
  }) async {
    final uri = Uri.parse('$_baseUrl$path');
    final response = await _httpClient.post(
      uri,
      headers: _getAuthHeaders(),
      body: body != null ? jsonEncode(body) : null,
    );

    return _handleResponse(response);
  }

  /// PUTリクエストを送信
  /// 
  /// [path] リクエストパス
  /// [body] リクエストボディ
  /// Returns: レスポンスのMap
  /// Throws: [HttpException] HTTPエラーが発生した場合
  Future<Map<String, dynamic>> put(
    String path, {
    Map<String, dynamic>? body,
  }) async {
    final uri = Uri.parse('$_baseUrl$path');
    final response = await _httpClient.put(
      uri,
      headers: _getAuthHeaders(),
      body: body != null ? jsonEncode(body) : null,
    );

    return _handleResponse(response);
  }

  /// DELETEリクエストを送信
  /// 
  /// [path] リクエストパス
  /// Returns: レスポンスのMap
  /// Throws: [HttpException] HTTPエラーが発生した場合
  Future<Map<String, dynamic>> delete(String path) async {
    final uri = Uri.parse('$_baseUrl$path');
    final response = await _httpClient.delete(
      uri,
      headers: _getAuthHeaders(),
    );

    return _handleResponse(response);
  }

  /// HTTPレスポンスを処理
  /// 
  /// [response] HTTPレスポンス
  /// Returns: レスポンスのMap
  /// Throws: [HttpException] HTTPエラーが発生した場合
  Map<String, dynamic> _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.body.isEmpty) {
        return <String, dynamic>{};
      }
      return jsonDecode(response.body) as Map<String, dynamic>;
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
