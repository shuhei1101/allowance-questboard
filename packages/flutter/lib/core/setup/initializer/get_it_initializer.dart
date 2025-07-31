import 'package:allowance_questboard/core/auth/token_storage.dart';
import 'package:allowance_questboard/init/api/v1/init_api.dart';
import 'package:allowance_questboard/login/login_page/api/login_api.dart';
import 'package:allowance_questboard/login/login_page/usecase/login_usecase.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

void initGetIt() {
  GetIt.I.registerLazySingleton<http.Client>(() => http.Client());
  GetIt.I.registerLazySingleton<InitApi>(() => InitApi());
  GetIt.I.registerLazySingleton<LoginUsecase>(() => LoginUsecase());
  GetIt.I.registerLazySingleton<TokenStorage>(() => TokenStorage());
  GetIt.I.registerLazySingleton<LoginApi>(() => LoginApi());
}
