import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiClient {
  final String baseUrl;
  final http.Client httpClient;

  ApiClient(this.baseUrl, this.httpClient);

  Future<http.Response> get(String path) async {
    final response = await httpClient.get(Uri.parse('$baseUrl$path'));
    _handleError(response);
    return response;
  }

  Future<http.Response> post(String path, Map<String, dynamic> body) async {
    final response = await httpClient.post(
      Uri.parse('$baseUrl$path'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    _handleError(response);
    return response;
  }

  Future<http.Response> put(String path, Map<String, dynamic> body) async {
    final response = await httpClient.put(
      Uri.parse('$baseUrl$path'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    _handleError(response);
    return response;
  }

  Future<http.Response> delete(String path) async {
    final response = await httpClient.delete(Uri.parse('$baseUrl$path'));
    _handleError(response);
    return response;
  }

  void _handleError(http.Response response) {
    if (response.statusCode >= 400) {
      throw Exception('HTTP Error ${response.statusCode}: ${response.body}');
    }
  }
}
