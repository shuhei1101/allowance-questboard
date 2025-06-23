// Flutter app entry point

import 'package:allowance_questboard/application/auth/auth_provider.dart';
import 'package:allowance_questboard/config/supabase_config.dart';
import 'package:allowance_questboard/login/state/login_state_provider.dart';
import 'package:allowance_questboard/presentation/shared/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Supabaseの初期化（実際の値はconfig/supabase_config.dartで設定）
  await Supabase.initialize(
    url: SupabaseConfig.url,
    anonKey: SupabaseConfig.anonKey,
  );

  // DIコンテナの設定
  setupDependencies();

  runApp(const ProviderScope(child: MyApp()));
}

void setupDependencies() {
  // AuthProviderをシングルトンとして登録
  GetIt.I.registerSingleton<AuthProvider>(AuthProvider());
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 認証状態を監視してルートを決定
    final authState = ref.watch(authProvider);
    
    final router = GoRouter(
      initialLocation: authState.isAuthenticated ? '/quests/default' : '/login',
      routes: $appRoutes,
    );

    return MaterialApp.router(
      title: 'Allowance Questboard',
      routerConfig: router,
    );
  }
}
