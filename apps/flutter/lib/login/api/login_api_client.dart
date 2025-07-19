import 'package:allowance_questboard/core/api/base_api_client.dart';
import 'package:allowance_questboard/core/api/base_api_request.dart';
import 'package:allowance_questboard/core/api/base_api_response.dart';
import 'package:allowance_questboard/core/constants/api_endpoints.dart';

/// ログインAPIクライアント
class LoginApiClient extends BaseApiClient {
  /// LoginApiClientのコンストラクタ
  /// 
  /// [baseUrl] APIのベースURL
  /// [httpClient] HTTPクライアント
  LoginApiClient(super.baseUrl, super.httpClient);

  /// ログイン処理を実行
  /// 
  /// [request] ログインリクエスト
  /// Returns: ログインレスポンス
  Future<LoginApiResponse> login({
    required LoginApiRequest request,
  }) async {
    // 認証トークンが含まれている場合は設定
    if (request.tokens != null) {
      setAuthTokens(request.tokens!);
    }
    
    final response = await post(
      ApiEndpoints.login,
      body: request.toJson(),
    );
    
    return LoginApiResponse.fromJson(response);
  }
}

/// ログインAPIリクエスト
/// 
/// ログイン時に送信するリクエストデータを表現します。
class LoginApiRequest extends BaseApiRequest {
  /// ユーザーID
  final String userId;

  /// LoginApiRequestのコンストラクタ
  /// 
  /// [userId] ユーザーID
  /// [tokens] 認証トークン（オプション）
  const LoginApiRequest({
    required this.userId,
    super.tokens,
  });

  /// オブジェクトをJSONに変換
  /// 
  /// Returns: JSON形式のMap
  @override
  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
    };
  }

  /// オブジェクトの文字列表現
  @override
  String toString() {
    return 'LoginApiRequest(userId: $userId, tokens: $tokens)';
  }

  /// オブジェクトの比較
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is LoginApiRequest && 
           other.userId == userId &&
           other.tokens == tokens;
  }

  @override
  int get hashCode => userId.hashCode ^ tokens.hashCode;
}

/// ログインAPIレスポンス
/// 
/// ログイン処理の結果データを表現します。
class LoginApiResponse extends BaseApiResponse {
  /// ユーザーID
  final String userId;
  
  /// 親ID
  final int? parentId;
  
  /// メンバーID
  final int? memberId;

  /// LoginApiResponseのコンストラクタ
  /// 
  /// [userId] ユーザーID
  /// [parentId] 親ID
  /// [memberId] メンバーID
  const LoginApiResponse({
    required this.userId,
    this.parentId,
    this.memberId,
  });

  /// JSONからオブジェクトを作成
  /// 
  /// [json] JSON形式のMap
  /// Returns: LoginApiResponseオブジェクト
  @override
  factory LoginApiResponse.fromJson(Map<String, dynamic> json) {
    return LoginApiResponse(
      userId: json['user_id'] as String,
      parentId: json['parent_id'] as int?,
      memberId: json['member_id'] as int?,
    );
  }
}
