class JsonRpcRequest {
  final String method;
  final Map<String, dynamic> params;
  final int id;

  JsonRpcRequest({
    required this.method,
    required this.params,
    required this.id,
  });

  Map<String, dynamic> toJson() => {
        'jsonrpc': '2.0',
        'method': method,
        'params': params,
        'id': id,
      };
}

class JsonRpcResponse<T> {
  final T? result;
  final RpcError? error;
  final int id;

  JsonRpcResponse({this.result, this.error, required this.id});
}

class RpcError {
  final int code;
  final String message;

  RpcError({required this.code, required this.message});

  factory RpcError.fromJson(Map<String, dynamic> json) {
    return RpcError(
      code: json['code'],
      message: json['message'],
    );
  }
}

class JsonRpcHandler {
  int _idCounter = 1;

  JsonRpcRequest buildRequest(String method, Map<String, dynamic> params) {
    final id = _idCounter++;
    return JsonRpcRequest(method: method, params: params, id: id);
  }

  JsonRpcResponse<T> parseResponse<T>(
    Map<String, dynamic> json,
    T Function(Map<String, dynamic>) fromJson,
  ) {
    final id = json['id'];

    if (json.containsKey('error')) {
      return JsonRpcResponse(
        error: RpcError.fromJson(json['error']),
        result: null,
        id: id,
      );
    } else {
      return JsonRpcResponse(
        result: fromJson(json['result']),
        error: null,
        id: id,
      );
    }
  }
}

final handler = JsonRpcHandler();
final req = handler.buildRequest("createUser", {
  "email": "test@example.com",
  "birthday": "2025-01-01"
});

final response = await http.post(
  Uri.parse(apiUrl),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode(req.toJson()),
);

final parsed = handler.parseResponse<CreateUserResponse>(
  jsonDecode(response.body),
  CreateUserResponse.fromJson,
);

if (parsed.error != null) {
  throw Exception(parsed.error!.message);
}

print(parsed.result!.email);