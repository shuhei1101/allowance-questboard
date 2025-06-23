import 'package:allowance_questboard/shared/api/api_client.dart';
import 'package:allowance_questboard/shared/constants/api_endpoints.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

class GetItInitializer {
  void initialize() {
    GetIt.I.registerLazySingleton<ApiClient>(
      () => ApiClient(ApiEndpoints.baseUrl, http.Client()),
    );
  }
}
