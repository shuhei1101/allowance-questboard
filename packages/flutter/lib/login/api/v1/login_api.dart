import 'package:allowance_questboard/core/api/base_api_client.dart';
import 'package:allowance_questboard/core/constants/api_endpoints.dart';
import 'package:allowance_questboard/login/api/v1/login_api_request.dart';
import 'package:allowance_questboard/login/api/v1/login_api_response.dart';

/// ログインAPIクライアント
class LoginApi extends BaseApiClient<LoginApiRequest, LoginApiResponse> {
  /// LoginApiのコンストラクタ
  LoginApi();

  /// エンドポイントを取得
  @override
  ApiEndpoint get endpoint => apiEndpoints.login;

  /// ログイン処理を実行
  /// 
  /// [request] ログインリクエスト
  /// Returns: ログインレスポンス
  @override
  Future<LoginApiResponse> execute(LoginApiRequest request) async {
    final response = await post(request);
    final responseData = handleResponse(response);
    
    return LoginApiResponse.fromJson(responseData as Map<String, dynamic>);
  }
}
