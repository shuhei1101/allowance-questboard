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
  ApiEndpoint get login => ApiEndpoint('/login');
  ApiEndpoint get family => ApiEndpoint('/family');
  ApiEndpoint get families => ApiEndpoint('/families');
  ApiEndpoint get member => ApiEndpoint('/member');
  ApiEndpoint get members => ApiEndpoint('/members');
  ApiEndpoint get quest => ApiEndpoint('/quest');
  ApiEndpoint get quests => ApiEndpoint('/quests');
}

final apiEndpoints = ApiEndpoints();
