import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiInfo {
  String get url => dotenv.env['API_BASE_URL'] ?? "";
}

final apiInfo = ApiInfo();

class ApiEndpoint {
  final String endpoint;
  final String baseUrl = apiInfo.url;
  
  ApiEndpoint(this.endpoint);
  
  String get url => '$baseUrl$endpoint';
}

class ApiEndpoints {
  ApiEndpoint get login => ApiEndpoint('/api/v1/login');
  ApiEndpoint get family => ApiEndpoint('/api/v1/family');
  ApiEndpoint get families => ApiEndpoint('/api/v1/families');
  ApiEndpoint get member => ApiEndpoint('/api/v1/member');
  ApiEndpoint get members => ApiEndpoint('/api/v1/members');
  ApiEndpoint get quest => ApiEndpoint('/api/v1/quest');
  ApiEndpoint get quests => ApiEndpoint('/api/v1/quests');
}

final apiEndpoints = ApiEndpoints();
