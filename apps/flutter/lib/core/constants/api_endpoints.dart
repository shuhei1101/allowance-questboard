import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiInfo {
  String get url => dotenv.env['API_BASE_URL'] ?? "";
}

final apiInfo = ApiInfo();

class ApiEndpoints {
  String get login => '${apiInfo.url}/login';
  String get family => '${apiInfo.url}/family';
  String get families => '${apiInfo.url}/families';
  String get member => '${apiInfo.url}/member';
  String get members => '${apiInfo.url}/members';
  String get quest => '${apiInfo.url}/quest';
  String get quests => '${apiInfo.url}/quests';
}

final apiEndpoints = ApiEndpoints();
