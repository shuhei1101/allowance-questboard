// userId→memberId
// userId→familyIdを取得するリクエストを投げる

import 'package:allowance_questboard/login/api/login_family_result.dart';
import 'package:allowance_questboard/login/api/login_member_result.dart';
import 'package:allowance_questboard/shared/api/app_api.dart';

class LoginApi extends AppApi {
  Future<LoginMemberResult> loginMember(String userId) async {
    final response = await client.request<LoginMemberResult>(
      url: '/login',
      method: 'loginMember',
      params: {"userId": userId},
      fromJson: (json) => LoginMemberResult.fromJson(json),
    );

    if (response.error != null) {
      throw Exception('Login failed: ${response.error!.message}');
    } else if (response.result == null) {
      throw Exception('Login failed: No result returned');
    } else {
      return response.result!;
    }
  }

  Future<LoginFamilyResult> loginFamily(String userId) async {
    final response = await client.request<LoginFamilyResult>(
      url: '/login',
      method: 'loginFamily',
      params: {"userId": userId},
      fromJson: (json) => LoginFamilyResult.fromJson(json),
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
