import 'package:allowance_questboard/infrastracture/query_service/family_query_service.dart';
import 'package:allowance_questboard/infrastracture/query_service/member_query_service.dart';
import 'package:allowance_questboard/login/usecase/get_family_id_usecase.dart';
import 'package:allowance_questboard/login/usecase/get_member_id_usecase.dart';
import 'package:allowance_questboard/shared/api/api_client.dart';
import 'package:allowance_questboard/core/constants/api_endpoints.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

void initGetIt() {
  GetIt.I.registerLazySingleton<ApiClient>(
    () => ApiClient(ApiEndpoints.baseUrl, http.Client()),
  );
  GetIt.I.registerLazySingleton<FamilyQueryService>(
    () => FamilyQueryService(),
  );
  GetIt.I.registerLazySingleton<MemberQueryService>(
    () => MemberQueryService(),
  );
  GetIt.I.registerLazySingleton<GetFamilyIdUsecase>(
    () => GetFamilyIdUsecase(),
  );
  GetIt.I.registerLazySingleton<GetMemberIdUsecase>(
    () => GetMemberIdUsecase(),
  );
}
