import 'package:allowance_questboard/shared/util/generator.dart';

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
  JsonRpcRequest buildRequest(String method, Map<String, dynamic> params) {
    final id = idGenerate();
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
