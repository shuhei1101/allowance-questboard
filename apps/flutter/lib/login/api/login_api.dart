// userId→memberId
// userId→familyIdを取得するリクエストを投げる

import 'package:allowance_questboard/login/api/login_response.dart';
import 'package:allowance_questboard/core/api/app_api.dart';

class LoginApi extends AppApi {
  Future<LoginResponse> login(String userId) async {
    final response = await client.request<LoginResponse>(
      url: '/login',
      method: 'loginMember',
      params: {"userId": userId},
      fromJson: (json) => LoginResponse.fromJson(json),
    );

    if (response.error != null) {
      throw Exception('Login failed: ${response.error!.message}');
    } else if (response.result == null) {
      throw Exception('Login failed: No result returned');
    } else {
      return response.result!;
    }
  }
}
