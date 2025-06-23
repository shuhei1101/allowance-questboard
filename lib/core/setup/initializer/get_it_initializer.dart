import 'package:allowance_questboard/shared/api/api_client.dart';
import 'package:allowance_questboard/core/constants/api_endpoints.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

void initGetIt() {
  GetIt.I.registerLazySingleton<ApiClient>(
    () => ApiClient(ApiEndpoints.baseUrl, http.Client()),
  );
}
