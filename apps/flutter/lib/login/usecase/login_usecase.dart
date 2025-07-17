import 'package:allowance_questboard/family/query_service/family_query_service.dart';
import 'package:allowance_questboard/login/api/login_api.dart';
import 'package:get_it/get_it.dart';

class LoginUsecase {
  final LoginApi _apiClient = GetIt.I<LoginApi>();

  Future<int?> execute(String userId) async {
    try {
      final loginResponse = await _apiClient.fetchFamilyId(userId);
      return familyId;
    } catch (e) {
      print('family IDの取得に失敗: $e');
      return null;
    }
  }
}
