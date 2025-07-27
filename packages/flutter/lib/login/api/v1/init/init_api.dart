import 'package:allowance_questboard/core/api/base_api_client.dart';
import 'package:allowance_questboard/core/constants/api_endpoints.dart';
import 'package:allowance_questboard/login/api/v1/init/init_api_request.dart';
import 'package:allowance_questboard/login/api/v1/init/init_api_response.dart';

/// アプリ初期化APIクライアント
class InitApi extends BaseApiClient<InitApiRequest, InitApiResponse> {
  /// InitApiのコンストラクタ
  InitApi();

  /// エンドポイントを取得
  @override
  ApiEndpoint get endpoint => apiEndpoints.init;

  /// アプリ初期化処理を実行
  /// 
  /// [request] 初期化リクエスト
  /// Returns: 初期化レスポンス
  @override
  Future<InitApiResponse> execute(InitApiRequest request) async {
    final response = await get(request);
    final responseData = handleResponse(response);
    
    return InitApiResponse.fromJson(responseData as Map<String, dynamic>);
  }
}
