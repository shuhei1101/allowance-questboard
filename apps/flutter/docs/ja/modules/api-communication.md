# 🌐 API通信

## API通信の概要

FlutterアプリケーションでのAPI通信は、リモートサーバーとの通信を行う重要な機能です。このアプリでは、JSON-RPC 2.0プロトコルを使用して、型安全で構造化されたAPI通信を実現しています。

## 設計原則

### 1. 責務
- HTTPリクエストの送信と受信
- JSON-RPC 2.0プロトコルの実装
- エラーハンドリングとリトライ機能
- 認証トークンの管理

### 2. 配置場所
- 共通API機能: `lib/shared/api/`
- 機能固有API: 各機能ディレクトリ内の`api/`

## 基本的なAPI通信構造

### ApiClient クラス
```dart
// lib/shared/api/api_client.dart
class ApiClient {
  ApiClient({
    required this.baseUrl,
    required this.client,
    this.timeout = const Duration(seconds: 30),
  });

  final String baseUrl;
  final http.Client client;
  final Duration timeout;

  Future<http.Response> post(
    String endpoint, {
    required Map<String, dynamic> body,
    Map<String, String>? headers,
  }) async {
    final url = Uri.parse('$baseUrl$endpoint');
    
    final defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    final mergedHeaders = {...defaultHeaders, ...?headers};
    
    try {
      final response = await client
          .post(
            url,
            headers: mergedHeaders,
            body: jsonEncode(body),
          )
          .timeout(timeout);
      
      return response;
    } on TimeoutException {
      throw ApiTimeoutException();
    } on SocketException {
      throw ApiNetworkException();
    } catch (e) {
      throw ApiException('Unexpected error: $e');
    }
  }

  Future<http.Response> get(
    String endpoint, {
    Map<String, String>? queryParameters,
    Map<String, String>? headers,
  }) async {
    final url = Uri.parse('$baseUrl$endpoint').replace(
      queryParameters: queryParameters,
    );
    
    final defaultHeaders = {
      'Accept': 'application/json',
    };
    
    final mergedHeaders = {...defaultHeaders, ...?headers};
    
    try {
      final response = await client
          .get(url, headers: mergedHeaders)
          .timeout(timeout);
      
      return response;
    } on TimeoutException {
      throw ApiTimeoutException();
    } on SocketException {
      throw ApiNetworkException();
    } catch (e) {
      throw ApiException('Unexpected error: $e');
    }
  }
}
```

### JSON-RPC ハンドリング
```dart
// lib/shared/api/rpc_handler.dart
class JsonRpcRequest {
  const JsonRpcRequest({
    required this.method,
    required this.params,
    required this.id,
  });

  final String method;
  final Map<String, dynamic> params;
  final int id;

  Map<String, dynamic> toJson() {
    return {
      'jsonrpc': '2.0',
      'method': method,
      'params': params,
      'id': id,
    };
  }
}

class JsonRpcResponse<T> {
  const JsonRpcResponse({
    required this.result,
    required this.error,
    required this.id,
  });

  final T? result;
  final JsonRpcError? error;
  final int id;

  bool get isSuccess => error == null;
  bool get isError => error != null;
}

class JsonRpcError {
  const JsonRpcError({
    required this.code,
    required this.message,
    this.data,
  });

  final int code;
  final String message;
  final dynamic data;

  factory JsonRpcError.fromJson(Map<String, dynamic> json) {
    return JsonRpcError(
      code: json['code'] as int,
      message: json['message'] as String,
      data: json['data'],
    );
  }
}

class JsonRpcHandler {
  int _nextId = 1;

  int get nextId => _nextId++;

  JsonRpcRequest createRequest(
    String method, {
    Map<String, dynamic>? params,
  }) {
    return JsonRpcRequest(
      method: method,
      params: params ?? {},
      id: nextId,
    );
  }

  JsonRpcResponse<T> parseResponse<T>(
    Map<String, dynamic> json,
    T Function(dynamic) resultParser,
  ) {
    final id = json['id'] as int;
    
    if (json.containsKey('error')) {
      final error = JsonRpcError.fromJson(json['error']);
      return JsonRpcResponse<T>(
        result: null,
        error: error,
        id: id,
      );
    }
    
    final result = resultParser(json['result']);
    return JsonRpcResponse<T>(
      result: result,
      error: null,
      id: id,
    );
  }
}
```

### App API クラス
```dart
// lib/shared/api/app_api.dart
class AppApi {
  AppApi({
    required this.apiClient,
    required this.rpcHandler,
  });

  final ApiClient apiClient;
  final JsonRpcHandler rpcHandler;

  Future<JsonRpcResponse<T>> call<T>(
    String method, {
    Map<String, dynamic>? params,
    required T Function(dynamic) resultParser,
  }) async {
    final request = rpcHandler.createRequest(method, params: params);
    
    final response = await apiClient.post(
      '/rpc',
      body: request.toJson(),
    );
    
    if (response.statusCode != 200) {
      throw ApiException(
        'HTTP ${response.statusCode}: ${response.reasonPhrase}',
      );
    }
    
    final jsonResponse = jsonDecode(response.body) as Map<String, dynamic>;
    return rpcHandler.parseResponse(jsonResponse, resultParser);
  }
}
```

## 機能固有のAPI実装

### クエスト関連API
```dart
// lib/quest/api/quest_api.dart
class QuestApi {
  QuestApi(this.appApi);

  final AppApi appApi;

  Future<List<Quest>> getQuests({
    String? familyId,
    String? memberId,
    QuestStatus? status,
  }) async {
    final params = <String, dynamic>{};
    if (familyId != null) params['family_id'] = familyId;
    if (memberId != null) params['member_id'] = memberId;
    if (status != null) params['status'] = status.name;

    final response = await appApi.call<List<Quest>>(
      'quest.get_quests',
      params: params,
      resultParser: (data) {
        final questList = data as List;
        return questList.map((json) => Quest.fromJson(json)).toList();
      },
    );

    if (response.isError) {
      throw ApiException('Failed to get quests: ${response.error!.message}');
    }

    return response.result!;
  }

  Future<Quest> getQuestById(String questId) async {
    final response = await appApi.call<Quest>(
      'quest.get_quest_by_id',
      params: {'quest_id': questId},
      resultParser: (data) => Quest.fromJson(data),
    );

    if (response.isError) {
      throw ApiException('Failed to get quest: ${response.error!.message}');
    }

    return response.result!;
  }

  Future<Quest> createQuest(CreateQuestRequest request) async {
    final response = await appApi.call<Quest>(
      'quest.create_quest',
      params: request.toJson(),
      resultParser: (data) => Quest.fromJson(data),
    );

    if (response.isError) {
      throw ApiException('Failed to create quest: ${response.error!.message}');
    }

    return response.result!;
  }

  Future<Quest> updateQuest(String questId, UpdateQuestRequest request) async {
    final response = await appApi.call<Quest>(
      'quest.update_quest',
      params: {
        'quest_id': questId,
        ...request.toJson(),
      },
      resultParser: (data) => Quest.fromJson(data),
    );

    if (response.isError) {
      throw ApiException('Failed to update quest: ${response.error!.message}');
    }

    return response.result!;
  }

  Future<void> deleteQuest(String questId) async {
    final response = await appApi.call<void>(
      'quest.delete_quest',
      params: {'quest_id': questId},
      resultParser: (data) => null,
    );

    if (response.isError) {
      throw ApiException('Failed to delete quest: ${response.error!.message}');
    }
  }

  Future<Quest> completeQuest(String questId) async {
    final response = await appApi.call<Quest>(
      'quest.complete_quest',
      params: {'quest_id': questId},
      resultParser: (data) => Quest.fromJson(data),
    );

    if (response.isError) {
      throw ApiException('Failed to complete quest: ${response.error!.message}');
    }

    return response.result!;
  }
}
```

### 認証機能の統合
```dart
// lib/shared/api/auth_interceptor.dart
class AuthInterceptor {
  AuthInterceptor(this.ref);

  final Ref ref;

  Map<String, String> getAuthHeaders() {
    final authState = ref.read(authStateProvider).valueOrNull;
    if (authState?.token != null) {
      return {'Authorization': 'Bearer ${authState!.token}'};
    }
    return {};
  }

  void handleAuthError(JsonRpcError error) {
    if (error.code == -32001) { // 認証エラー
      ref.read(authStateProvider.notifier).logout();
    }
  }
}

// 認証付きAppApi
class AuthenticatedAppApi extends AppApi {
  AuthenticatedAppApi({
    required super.apiClient,
    required super.rpcHandler,
    required this.authInterceptor,
  });

  final AuthInterceptor authInterceptor;

  @override
  Future<JsonRpcResponse<T>> call<T>(
    String method, {
    Map<String, dynamic>? params,
    required T Function(dynamic) resultParser,
  }) async {
    final request = rpcHandler.createRequest(method, params: params);
    
    final response = await apiClient.post(
      '/rpc',
      body: request.toJson(),
      headers: authInterceptor.getAuthHeaders(),
    );
    
    if (response.statusCode != 200) {
      throw ApiException(
        'HTTP ${response.statusCode}: ${response.reasonPhrase}',
      );
    }
    
    final jsonResponse = jsonDecode(response.body) as Map<String, dynamic>;
    final rpcResponse = rpcHandler.parseResponse(jsonResponse, resultParser);
    
    if (rpcResponse.isError) {
      authInterceptor.handleAuthError(rpcResponse.error!);
    }
    
    return rpcResponse;
  }
}
```

## Riverpod との統合

### API Provider の定義
```dart
// lib/shared/api/api_providers.dart
final httpClientProvider = Provider<http.Client>((ref) {
  return http.Client();
});

final apiClientProvider = Provider<ApiClient>((ref) {
  final client = ref.read(httpClientProvider);
  const baseUrl = String.fromEnvironment('API_BASE_URL', defaultValue: 'https://api.example.com');
  
  return ApiClient(
    baseUrl: baseUrl,
    client: client,
  );
});

final rpcHandlerProvider = Provider<JsonRpcHandler>((ref) {
  return JsonRpcHandler();
});

final appApiProvider = Provider<AppApi>((ref) {
  final apiClient = ref.read(apiClientProvider);
  final rpcHandler = ref.read(rpcHandlerProvider);
  final authInterceptor = AuthInterceptor(ref);
  
  return AuthenticatedAppApi(
    apiClient: apiClient,
    rpcHandler: rpcHandler,
    authInterceptor: authInterceptor,
  );
});

// 機能別API Provider
final questApiProvider = Provider<QuestApi>((ref) {
  final appApi = ref.read(appApiProvider);
  return QuestApi(appApi);
});

final memberApiProvider = Provider<MemberApi>((ref) {
  final appApi = ref.read(appApiProvider);
  return MemberApi(appApi);
});
```

### 非同期データフェッチ
```dart
// lib/quest/state/quest_providers.dart
final questListProvider = FutureProvider<List<Quest>>((ref) async {
  final questApi = ref.read(questApiProvider);
  final currentFamily = ref.read(currentFamilyProvider).valueOrNull;
  
  if (currentFamily == null) {
    return [];
  }
  
  return questApi.getQuests(familyId: currentFamily.id);
});

final questProvider = FutureProvider.family<Quest, String>((ref, questId) async {
  final questApi = ref.read(questApiProvider);
  return questApi.getQuestById(questId);
});

// 状態管理と組み合わせた使用
final questListNotifierProvider = StateNotifierProvider<QuestListNotifier, AsyncValue<List<Quest>>>((ref) {
  final questApi = ref.read(questApiProvider);
  return QuestListNotifier(questApi);
});

class QuestListNotifier extends StateNotifier<AsyncValue<List<Quest>>> {
  QuestListNotifier(this.questApi) : super(const AsyncValue.loading());

  final QuestApi questApi;

  Future<void> loadQuests() async {
    state = const AsyncValue.loading();
    
    try {
      final quests = await questApi.getQuests();
      state = AsyncValue.data(quests);
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  Future<void> createQuest(CreateQuestRequest request) async {
    try {
      final newQuest = await questApi.createQuest(request);
      
      state = state.whenData((quests) => [...quests, newQuest]);
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  Future<void> updateQuest(String questId, UpdateQuestRequest request) async {
    try {
      final updatedQuest = await questApi.updateQuest(questId, request);
      
      state = state.whenData((quests) => quests.map((quest) {
        return quest.id == questId ? updatedQuest : quest;
      }).toList());
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  Future<void> deleteQuest(String questId) async {
    try {
      await questApi.deleteQuest(questId);
      
      state = state.whenData((quests) => 
        quests.where((quest) => quest.id != questId).toList()
      );
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }
}
```

## エラーハンドリング

### カスタム例外クラス
```dart
// lib/shared/api/api_exceptions.dart
abstract class ApiException implements Exception {
  const ApiException(this.message);
  
  final String message;
  
  @override
  String toString() => 'ApiException: $message';
}

class ApiNetworkException extends ApiException {
  const ApiNetworkException() : super('Network error occurred');
}

class ApiTimeoutException extends ApiException {
  const ApiTimeoutException() : super('Request timeout');
}

class ApiServerException extends ApiException {
  const ApiServerException(String message) : super(message);
}

class ApiAuthenticationException extends ApiException {
  const ApiAuthenticationException() : super('Authentication failed');
}

class ApiValidationException extends ApiException {
  const ApiValidationException(String message) : super(message);
}
```

### リトライ機能
```dart
// lib/shared/api/retry_client.dart
class RetryClient extends http.BaseClient {
  RetryClient({
    required this.client,
    this.maxRetries = 3,
    this.retryDelay = const Duration(seconds: 1),
  });

  final http.Client client;
  final int maxRetries;
  final Duration retryDelay;

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) async {
    var attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        final response = await client.send(request);
        
        if (response.statusCode >= 500) {
          attempt++;
          if (attempt < maxRetries) {
            await Future.delayed(retryDelay * attempt);
            continue;
          }
        }
        
        return response;
      } catch (e) {
        attempt++;
        if (attempt >= maxRetries) {
          rethrow;
        }
        await Future.delayed(retryDelay * attempt);
      }
    }
    
    throw Exception('Max retries exceeded');
  }
}
```

## キャッシュ機能

### メモリキャッシュ
```dart
// lib/shared/api/cache_manager.dart
class ApiCacheManager {
  static final _instance = ApiCacheManager._internal();
  factory ApiCacheManager() => _instance;
  ApiCacheManager._internal();

  final Map<String, CacheEntry> _cache = {};

  void put(String key, dynamic data, {Duration? ttl}) {
    _cache[key] = CacheEntry(
      data: data,
      timestamp: DateTime.now(),
      ttl: ttl ?? const Duration(minutes: 5),
    );
  }

  T? get<T>(String key) {
    final entry = _cache[key];
    if (entry == null) return null;

    if (DateTime.now().isAfter(entry.timestamp.add(entry.ttl))) {
      _cache.remove(key);
      return null;
    }

    return entry.data as T?;
  }

  void invalidate(String key) {
    _cache.remove(key);
  }

  void invalidatePattern(String pattern) {
    final regex = RegExp(pattern);
    _cache.removeWhere((key, value) => regex.hasMatch(key));
  }

  void clear() {
    _cache.clear();
  }
}

class CacheEntry {
  const CacheEntry({
    required this.data,
    required this.timestamp,
    required this.ttl,
  });

  final dynamic data;
  final DateTime timestamp;
  final Duration ttl;
}
```

### キャッシュ付きAPI呼び出し
```dart
// lib/shared/api/cached_api_client.dart
class CachedApiClient extends ApiClient {
  CachedApiClient({
    required super.baseUrl,
    required super.client,
    super.timeout,
  });

  final _cache = ApiCacheManager();

  @override
  Future<http.Response> get(
    String endpoint, {
    Map<String, String>? queryParameters,
    Map<String, String>? headers,
    bool useCache = true,
    Duration? cacheTtl,
  }) async {
    final cacheKey = _buildCacheKey(endpoint, queryParameters);
    
    if (useCache) {
      final cached = _cache.get<http.Response>(cacheKey);
      if (cached != null) {
        return cached;
      }
    }
    
    final response = await super.get(
      endpoint,
      queryParameters: queryParameters,
      headers: headers,
    );
    
    if (useCache && response.statusCode == 200) {
      _cache.put(cacheKey, response, ttl: cacheTtl);
    }
    
    return response;
  }

  String _buildCacheKey(String endpoint, Map<String, String>? params) {
    if (params == null || params.isEmpty) {
      return endpoint;
    }
    
    final sortedParams = params.entries.toList()
      ..sort((a, b) => a.key.compareTo(b.key));
    
    final queryString = sortedParams
        .map((entry) => '${entry.key}=${entry.value}')
        .join('&');
    
    return '$endpoint?$queryString';
  }
}
```

## テストとモック

### MockApiClient
```dart
// test/mocks/mock_api_client.dart
class MockApiClient extends Mock implements ApiClient {}

class MockQuestApi extends Mock implements QuestApi {}

void main() {
  group('QuestApi', () {
    late MockApiClient mockApiClient;
    late QuestApi questApi;

    setUp(() {
      mockApiClient = MockApiClient();
      questApi = QuestApi(AppApi(
        apiClient: mockApiClient,
        rpcHandler: JsonRpcHandler(),
      ));
    });

    test('should get quests successfully', () async {
      // Arrange
      final mockResponse = http.Response(
        jsonEncode({
          'jsonrpc': '2.0',
          'result': [
            {'id': '1', 'title': 'Test Quest'},
          ],
          'id': 1,
        }),
        200,
      );
      
      when(mockApiClient.post(any, body: anyNamed('body')))
          .thenAnswer((_) async => mockResponse);

      // Act
      final result = await questApi.getQuests();

      // Assert
      expect(result, hasLength(1));
      expect(result.first.title, 'Test Quest');
    });

    test('should handle API error', () async {
      // Arrange
      final mockResponse = http.Response(
        jsonEncode({
          'jsonrpc': '2.0',
          'error': {'code': -1, 'message': 'Test error'},
          'id': 1,
        }),
        200,
      );
      
      when(mockApiClient.post(any, body: anyNamed('body')))
          .thenAnswer((_) async => mockResponse);

      // Act & Assert
      expect(
        () => questApi.getQuests(),
        throwsA(isA<ApiException>()),
      );
    });
  });
}
```

## ベストプラクティス

### 1. 型安全性の確保
- レスポンス型の明確な定義
- JSON シリアライゼーションの自動化
- null safety の活用

### 2. エラーハンドリング
- 適切な例外の定義と処理
- ユーザーフレンドリーなエラーメッセージ
- リトライとフェイルオーバー

### 3. パフォーマンス最適化
- 適切なキャッシュ戦略
- 不要なリクエストの削減
- 並列処理の活用

### 4. セキュリティ
- 認証トークンの適切な管理
- HTTPS の使用
- 機密情報の暗号化