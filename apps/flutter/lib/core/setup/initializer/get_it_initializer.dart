import 'package:allowance_questboard/core/security/token_storage.dart';
import 'package:allowance_questboard/login/api/login_api_client.dart';
import 'package:allowance_questboard/core/constants/api_endpoints.dart';
import 'package:allowance_questboard/login/usecase/login_usecase.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

void initGetIt() {
  GetIt.I.registerLazySingleton<LoginUsecase>(() => LoginUsecase());
  GetIt.I.registerLazySingleton<TokenStorage>(() => TokenStorage());
  GetIt.I.registerLazySingleton<LoginApiClient>(() => LoginApiClient(ApiEndpoints.baseUrl, http.Client()));
}
