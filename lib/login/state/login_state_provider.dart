import 'package:allowance_questboard/application/auth/auth_provider.dart';
import 'package:allowance_questboard/application/auth/get_family_id_use_case.dart';
import 'package:allowance_questboard/application/auth/get_member_id_use_case.dart';
import 'package:allowance_questboard/infrastracture/query_service/family_query_service.dart';
import 'package:allowance_questboard/infrastracture/query_service/member_query_service.dart';
import 'package:allowance_questboard/login/state/login_state.dart';
import 'package:allowance_questboard/login/state/login_state_notifier.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

/// AuthProviderのプロバイダー
final authProvider = ChangeNotifierProvider<AuthProvider>((ref) {
  return GetIt.I<AuthProvider>();
});

/// ログイン状態のプロバイダー
final loginStateProvider = StateNotifierProvider<LoginStateNotifier, LoginState>((ref) {
  final authProvider = GetIt.I<AuthProvider>();
  final getFamilyIdUseCase = GetFamilyIdUseCase(FamilyQueryService());
  final getMemberIdUseCase = GetMemberIdUseCase(MemberQueryService());
  
  return LoginStateNotifier(
    authProvider,
    getFamilyIdUseCase,
    getMemberIdUseCase,
  );
});