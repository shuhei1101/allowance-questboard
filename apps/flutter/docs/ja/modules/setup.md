# 🏗️ セットアップ・初期化

## セットアップシステムの概要

アプリケーションの初期化とセットアップは、アプリの起動時に必要な設定や依存関係を適切に初期化することで、安定したアプリケーションの実行を保証します。

## 設計原則

### 1. 責務
- アプリケーション起動時の初期化処理
- 外部サービスの設定と接続
- 依存関係の注入設定
- 設定値の読み込みと検証

### 2. 配置場所
- メインセットアップ: `lib/core/setup/`
- 初期化処理: `lib/core/setup/initializer/`

## メインセットアップ関数

### setup_app.dart
```dart
// lib/core/setup/setup_app.dart
Future<void> setupApp() async {
  // Widget の初期化
  WidgetsFlutterBinding.ensureInitialized();
  
  // 外部サービスの初期化
  await _initializeExternalServices();
  
  // 設定の初期化
  await _initializeConfigurations();
  
  // ロギングの初期化
  await _initializeLogging();
  
  // 依存関係の注入設定
  await _setupDependencyInjection();
  
  // その他の初期化処理
  await _finalizeSetup();
}

Future<void> _initializeExternalServices() async {
  // Firebase の初期化
  await FirebaseInitializer.initialize();
  
  // Supabase の初期化
  await SupabaseInitializer.initialize();
  
  // その他の外部サービス
  await NotificationInitializer.initialize();
}

Future<void> _initializeConfigurations() async {
  // 設定値の読み込み
  await ConfigurationInitializer.initialize();
  
  // テーマ設定の読み込み
  await ThemeInitializer.initialize();
  
  // 言語設定の読み込み
  await LocalizationInitializer.initialize();
}

Future<void> _initializeLogging() async {
  // ロガーの設定
  await LoggerInitializer.initialize();
  
  // エラー追跡の設定
  await ErrorTrackingInitializer.initialize();
}

Future<void> _setupDependencyInjection() async {
  // 依存関係の登録
  await DIInitializer.initialize();
}

Future<void> _finalizeSetup() async {
  // 最終的な設定確認
  await SetupValidator.validate();
  
  // 初期化完了ログ
  Logger.info('App setup completed successfully');
}
```

## Firebase 初期化

### FirebaseInitializer
```dart
// lib/core/setup/initializer/firebase_initializer.dart
class FirebaseInitializer {
  static bool _isInitialized = false;
  
  static Future<void> initialize() async {
    if (_isInitialized) return;
    
    try {
      // Firebase Core の初期化
      await Firebase.initializeApp(
        options: DefaultFirebaseOptions.currentPlatform,
      );
      
      // Firebase Auth の設定
      await _configureAuth();
      
      // Firestore の設定
      await _configureFirestore();
      
      // Firebase Analytics の設定
      await _configureAnalytics();
      
      _isInitialized = true;
      Logger.info('Firebase initialized successfully');
    } catch (e) {
      Logger.error('Firebase initialization failed: $e');
      rethrow;
    }
  }
  
  static Future<void> _configureAuth() async {
    // 認証状態の永続化設定
    await FirebaseAuth.instance.setPersistence(Persistence.LOCAL);
    
    // 認証プロバイダーの設定
    // (必要に応じて追加)
  }
  
  static Future<void> _configureFirestore() async {
    final firestore = FirebaseFirestore.instance;
    
    // オフライン永続化の有効化
    await firestore.enablePersistence();
    
    // 設定の調整
    firestore.settings = const Settings(
      persistenceEnabled: true,
      cacheSizeBytes: Settings.CACHE_SIZE_UNLIMITED,
    );
  }
  
  static Future<void> _configureAnalytics() async {
    final analytics = FirebaseAnalytics.instance;
    
    // 分析の有効化
    await analytics.setAnalyticsCollectionEnabled(true);
    
    // ユーザープロパティの設定
    await analytics.setUserProperty(
      name: 'app_version',
      value: await PackageInfo.fromPlatform().then((info) => info.version),
    );
  }
}
```

## Supabase 初期化

### SupabaseInitializer
```dart
// lib/core/setup/initializer/supabase_initializer.dart
class SupabaseInitializer {
  static bool _isInitialized = false;
  
  static Future<void> initialize() async {
    if (_isInitialized) return;
    
    try {
      await Supabase.initialize(
        url: const String.fromEnvironment(
          'SUPABASE_URL',
          defaultValue: 'https://your-project.supabase.co',
        ),
        anonKey: const String.fromEnvironment(
          'SUPABASE_ANON_KEY',
          defaultValue: 'your-anon-key',
        ),
        authOptions: const FlutterAuthClientOptions(
          authFlowType: AuthFlowType.pkce,
        ),
        realtimeClientOptions: const RealtimeClientOptions(
          logLevel: RealtimeLogLevel.info,
        ),
      );
      
      _isInitialized = true;
      Logger.info('Supabase initialized successfully');
    } catch (e) {
      Logger.error('Supabase initialization failed: $e');
      rethrow;
    }
  }
}
```

## 設定値の初期化

### ConfigurationInitializer
```dart
// lib/core/setup/initializer/configuration_initializer.dart
class ConfigurationInitializer {
  static Future<void> initialize() async {
    try {
      // 環境設定の読み込み
      await _loadEnvironmentConfig();
      
      // アプリ設定の読み込み
      await _loadAppConfig();
      
      // ユーザー設定の読み込み
      await _loadUserConfig();
      
      Logger.info('Configuration initialized successfully');
    } catch (e) {
      Logger.error('Configuration initialization failed: $e');
      rethrow;
    }
  }
  
  static Future<void> _loadEnvironmentConfig() async {
    const environment = String.fromEnvironment('ENVIRONMENT', defaultValue: 'development');
    
    final config = AppConfig(
      environment: environment,
      apiBaseUrl: const String.fromEnvironment('API_BASE_URL'),
      apiTimeout: const Duration(seconds: 30),
      logLevel: environment == 'production' ? LogLevel.warn : LogLevel.debug,
    );
    
    // 設定をグローバルに保存
    GetIt.instance.registerSingleton<AppConfig>(config);
  }
  
  static Future<void> _loadAppConfig() async {
    final packageInfo = await PackageInfo.fromPlatform();
    
    final appInfo = AppInfo(
      name: packageInfo.appName,
      version: packageInfo.version,
      buildNumber: packageInfo.buildNumber,
      packageName: packageInfo.packageName,
    );
    
    GetIt.instance.registerSingleton<AppInfo>(appInfo);
  }
  
  static Future<void> _loadUserConfig() async {
    final prefs = await SharedPreferences.getInstance();
    
    final userConfig = UserConfig(
      isDarkMode: prefs.getBool('isDarkMode') ?? false,
      language: prefs.getString('language') ?? 'ja',
      notificationsEnabled: prefs.getBool('notificationsEnabled') ?? true,
      firstLaunch: prefs.getBool('firstLaunch') ?? true,
    );
    
    GetIt.instance.registerSingleton<UserConfig>(userConfig);
  }
}
```

## ロギングシステムの初期化

### LoggerInitializer
```dart
// lib/core/setup/initializer/logger_initializer.dart
class LoggerInitializer {
  static Future<void> initialize() async {
    try {
      final config = GetIt.instance<AppConfig>();
      
      // ロガーの設定
      Logger.root.level = _convertLogLevel(config.logLevel);
      Logger.root.onRecord.listen((record) {
        _handleLogRecord(record);
      });
      
      // コンソール出力の設定
      if (config.environment != 'production') {
        Logger.root.onRecord.listen((record) {
          print('${record.level.name}: ${record.time}: ${record.message}');
          if (record.error != null) {
            print(record.error);
          }
          if (record.stackTrace != null) {
            print(record.stackTrace);
          }
        });
      }
      
      Logger.info('Logger initialized successfully');
    } catch (e) {
      print('Logger initialization failed: $e');
      rethrow;
    }
  }
  
  static Level _convertLogLevel(LogLevel logLevel) {
    switch (logLevel) {
      case LogLevel.debug:
        return Level.FINE;
      case LogLevel.info:
        return Level.INFO;
      case LogLevel.warn:
        return Level.WARNING;
      case LogLevel.error:
        return Level.SEVERE;
    }
  }
  
  static void _handleLogRecord(LogRecord record) {
    // ログレコードの処理
    // 必要に応じて外部サービスに送信
    
    if (record.level >= Level.SEVERE) {
      // エラーレベルの場合は追加処理
      _reportError(record);
    }
  }
  
  static void _reportError(LogRecord record) {
    // エラー報告サービスに送信
    // Firebase Crashlytics、Sentry など
  }
}
```

## 通知システムの初期化

### NotificationInitializer
```dart
// lib/core/setup/initializer/notification_initializer.dart
class NotificationInitializer {
  static Future<void> initialize() async {
    try {
      // Local Notifications の初期化
      await _initializeLocalNotifications();
      
      // Push Notifications の初期化
      await _initializePushNotifications();
      
      Logger.info('Notifications initialized successfully');
    } catch (e) {
      Logger.error('Notifications initialization failed: $e');
      rethrow;
    }
  }
  
  static Future<void> _initializeLocalNotifications() async {
    const initializationSettings = InitializationSettings(
      android: AndroidInitializationSettings('@mipmap/ic_launcher'),
      iOS: DarwinInitializationSettings(
        requestAlertPermission: true,
        requestBadgePermission: true,
        requestSoundPermission: true,
      ),
    );
    
    await FlutterLocalNotificationsPlugin().initialize(
      initializationSettings,
      onDidReceiveNotificationResponse: _onNotificationTap,
    );
  }
  
  static Future<void> _initializePushNotifications() async {
    final messaging = FirebaseMessaging.instance;
    
    // 権限の要求
    final settings = await messaging.requestPermission();
    
    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      // FCM トークンの取得
      final token = await messaging.getToken();
      Logger.info('FCM Token: $token');
      
      // トークンの更新を監視
      messaging.onTokenRefresh.listen((token) {
        Logger.info('FCM Token refreshed: $token');
        // サーバーにトークンを送信
      });
      
      // メッセージハンドラーの設定
      FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
      FirebaseMessaging.onMessageOpenedApp.listen(_handleBackgroundMessage);
    }
  }
  
  static void _onNotificationTap(NotificationResponse response) {
    // 通知タップ時の処理
    Logger.info('Notification tapped: ${response.payload}');
  }
  
  static void _handleForegroundMessage(RemoteMessage message) {
    // フォアグラウンドでメッセージを受信した場合
    Logger.info('Foreground message: ${message.messageId}');
  }
  
  static void _handleBackgroundMessage(RemoteMessage message) {
    // バックグラウンドからアプリが開かれた場合
    Logger.info('Background message opened app: ${message.messageId}');
  }
}
```

## 依存関係注入の設定

### DIInitializer
```dart
// lib/core/setup/initializer/di_initializer.dart
class DIInitializer {
  static Future<void> initialize() async {
    try {
      final getIt = GetIt.instance;
      
      // Core services
      _registerCoreServices(getIt);
      
      // API services
      _registerApiServices(getIt);
      
      // Repository services
      _registerRepositoryServices(getIt);
      
      // Use case services
      _registerUseCaseServices(getIt);
      
      Logger.info('Dependency injection initialized successfully');
    } catch (e) {
      Logger.error('Dependency injection initialization failed: $e');
      rethrow;
    }
  }
  
  static void _registerCoreServices(GetIt getIt) {
    // HTTP Client
    getIt.registerLazySingleton<http.Client>(() => http.Client());
    
    // JSON-RPC Handler
    getIt.registerLazySingleton<JsonRpcHandler>(() => JsonRpcHandler());
    
    // API Client
    getIt.registerLazySingleton<ApiClient>(() {
      final config = getIt<AppConfig>();
      return ApiClient(
        baseUrl: config.apiBaseUrl,
        client: getIt<http.Client>(),
        timeout: config.apiTimeout,
      );
    });
  }
  
  static void _registerApiServices(GetIt getIt) {
    // App API
    getIt.registerLazySingleton<AppApi>(() => AppApi(
      apiClient: getIt<ApiClient>(),
      rpcHandler: getIt<JsonRpcHandler>(),
    ));
    
    // Quest API
    getIt.registerLazySingleton<QuestApi>(() => QuestApi(getIt<AppApi>()));
    
    // Member API
    getIt.registerLazySingleton<MemberApi>(() => MemberApi(getIt<AppApi>()));
    
    // Family API
    getIt.registerLazySingleton<FamilyApi>(() => FamilyApi(getIt<AppApi>()));
  }
  
  static void _registerRepositoryServices(GetIt getIt) {
    // Quest Repository
    getIt.registerLazySingleton<QuestRepository>(
      () => ApiQuestRepository(getIt<QuestApi>()),
    );
    
    // Member Repository
    getIt.registerLazySingleton<MemberRepository>(
      () => ApiMemberRepository(getIt<MemberApi>()),
    );
    
    // Family Repository
    getIt.registerLazySingleton<FamilyRepository>(
      () => ApiFamilyRepository(getIt<FamilyApi>()),
    );
  }
  
  static void _registerUseCaseServices(GetIt getIt) {
    // Quest Use Cases
    getIt.registerLazySingleton<CreateQuestUseCase>(
      () => CreateQuestUseCase(
        questRepository: getIt<QuestRepository>(),
        memberRepository: getIt<MemberRepository>(),
      ),
    );
    
    getIt.registerLazySingleton<CompleteQuestUseCase>(
      () => CompleteQuestUseCase(
        questRepository: getIt<QuestRepository>(),
      ),
    );
    
    // Member Use Cases
    getIt.registerLazySingleton<CreateMemberUseCase>(
      () => CreateMemberUseCase(
        memberRepository: getIt<MemberRepository>(),
      ),
    );
  }
}
```

## セットアップ検証

### SetupValidator
```dart
// lib/core/setup/setup_validator.dart
class SetupValidator {
  static Future<void> validate() async {
    try {
      // 依存関係の検証
      await _validateDependencies();
      
      // 設定値の検証
      await _validateConfigurations();
      
      // 外部サービスの接続検証
      await _validateExternalServices();
      
      Logger.info('Setup validation completed successfully');
    } catch (e) {
      Logger.error('Setup validation failed: $e');
      rethrow;
    }
  }
  
  static Future<void> _validateDependencies() async {
    final getIt = GetIt.instance;
    
    // 必須サービスの存在確認
    final requiredServices = [
      AppConfig,
      AppInfo,
      ApiClient,
      QuestRepository,
      MemberRepository,
    ];
    
    for (final serviceType in requiredServices) {
      if (!getIt.isRegistered(instance: serviceType)) {
        throw SetupException('Required service not registered: $serviceType');
      }
    }
  }
  
  static Future<void> _validateConfigurations() async {
    final config = GetIt.instance<AppConfig>();
    
    // API URL の検証
    if (config.apiBaseUrl.isEmpty) {
      throw SetupException('API base URL is not configured');
    }
    
    // 必須設定値の検証
    if (config.environment.isEmpty) {
      throw SetupException('Environment is not configured');
    }
  }
  
  static Future<void> _validateExternalServices() async {
    // Firebase の接続確認
    try {
      await FirebaseAuth.instance.currentUser;
    } catch (e) {
      Logger.warn('Firebase Auth validation failed: $e');
    }
    
    // API の接続確認
    try {
      final apiClient = GetIt.instance<ApiClient>();
      await apiClient.get('/health');
    } catch (e) {
      Logger.warn('API connection validation failed: $e');
    }
  }
}
```

## プロバイダーとの統合

### セットアップ用プロバイダー
```dart
// lib/core/setup/setup_providers.dart
final setupStateProvider = StateNotifierProvider<SetupStateNotifier, SetupState>((ref) {
  return SetupStateNotifier();
});

@freezed
class SetupState with _$SetupState {
  const factory SetupState({
    @Default(false) bool isInitialized,
    @Default(false) bool isLoading,
    @Default(null) String? errorMessage,
    @Default(0) double progress,
  }) = _SetupState;
}

class SetupStateNotifier extends StateNotifier<SetupState> {
  SetupStateNotifier() : super(const SetupState());

  Future<void> initialize() async {
    state = state.copyWith(isLoading: true, progress: 0);
    
    try {
      // 段階的な初期化とプログレス更新
      await _runInitializationSteps();
      
      state = state.copyWith(
        isInitialized: true,
        isLoading: false,
        progress: 1.0,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
      rethrow;
    }
  }
  
  Future<void> _runInitializationSteps() async {
    final steps = [
      ('外部サービス初期化', 0.2),
      ('設定読み込み', 0.4),
      ('ロギング設定', 0.6),
      ('依存関係注入', 0.8),
      ('検証処理', 1.0),
    ];
    
    for (final (description, progress) in steps) {
      Logger.info('Setup step: $description');
      state = state.copyWith(progress: progress);
      
      // 各ステップの処理
      await Future.delayed(const Duration(milliseconds: 500));
    }
  }
}
```

## エラーハンドリング

### カスタム例外
```dart
// lib/core/setup/setup_exceptions.dart
class SetupException implements Exception {
  const SetupException(this.message);
  
  final String message;
  
  @override
  String toString() => 'SetupException: $message';
}

class InitializationException extends SetupException {
  const InitializationException(String message) : super(message);
}

class ConfigurationException extends SetupException {
  const ConfigurationException(String message) : super(message);
}

class ValidationException extends SetupException {
  const ValidationException(String message) : super(message);
}
```

## ベストプラクティス

### 1. 段階的初期化
- 依存関係の順序を考慮した初期化
- エラー時の適切なロールバック
- プログレス表示によるユーザー体験向上

### 2. 設定管理
- 環境変数の活用
- 設定値の検証とデフォルト値
- セキュアな設定情報の管理

### 3. エラーハンドリング
- 初期化失敗時の適切な処理
- ユーザーフレンドリーなエラーメッセージ
- ログ記録による問題の追跡

### 4. パフォーマンス
- 遅延初期化の活用
- 不要な初期化処理の削減
- 並列処理による高速化