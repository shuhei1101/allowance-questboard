import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:go_router/go_router.dart';
import 'package:allowance_questboard/presentation/shared/theme/app_themes.dart';
import 'package:allowance_questboard/presentation/shared/router/app_route.dart';
import 'package:allowance_questboard/presentation/login/state/login_state_provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Supabase初期化
  await Supabase.initialize(
    url: 'YOUR_SUPABASE_URL', // TODO: 実際のSupabaseプロジェクトのURLに置き換え
    anonKey: 'YOUR_SUPABASE_ANON_KEY', // TODO: 実際のSupabaseプロジェクトのanon keyに置き換え
  );
  
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    
    // GoRouterの設定
    final router = GoRouter(
      routes: $appRoutes,
      initialLocation: authState.isAuthenticated ? 
        (authState.isFamilyUser ? '/quests/${authState.familyId!.value}' : '/members/${authState.memberId!.value}') : 
        '/login',
      redirect: (context, state) {
        final isAuthenticated = authState.isAuthenticated;
        final isLoggingIn = state.location == '/login';

        // 認証されていない場合はログイン画面にリダイレクト
        if (!isAuthenticated && !isLoggingIn) {
          return '/login';
        }

        // 認証済みでログイン画面にいる場合は適切な画面にリダイレクト
        if (isAuthenticated && isLoggingIn) {
          if (authState.isFamilyUser) {
            return '/quests/${authState.familyId!.value}';
          } else if (authState.isMemberUser) {
            return '/members/${authState.memberId!.value}';
          }
        }

        return null;
      },
    );

    return MaterialApp.router(
      title: 'おこづかいクエストボード',
      theme: AppThemes.commonTheme,
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
  }
}
