import 'package:allowance_questboard/core/api/api_client.dart';
import 'package:get_it/get_it.dart';

abstract class AppApi {
  final ApiClient client = GetIt.I<ApiClient>();
}
