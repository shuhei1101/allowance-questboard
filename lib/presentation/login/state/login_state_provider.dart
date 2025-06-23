import 'package:allowance_questboard/application/auth/auth_provider.dart';
import 'package:allowance_questboard/application/auth/get_family_id_use_case.dart';
import 'package:allowance_questboard/application/auth/get_member_id_use_case.dart';
import 'package:allowance_questboard/application/family/family_query_service.dart';
import 'package:allowance_questboard/application/member/member_query_service.dart';
import 'package:allowance_questboard/presentation/login/state/login_state.dart';
import 'package:allowance_questboard/presentation/login/state/login_state_notifier.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// AuthProviderのプロバイダー
final authProvider = ChangeNotifierProvider<AuthProvider>((ref) {
  return AuthProvider();
});

/// FamilyQueryServiceのプロバイダー
final familyQueryServiceProvider = Provider<FamilyQueryService>((ref) {
  return FamilyQueryService();
});

/// MemberQueryServiceのプロバイダー
final memberQueryServiceProvider = Provider<MemberQueryService>((ref) {
  return MemberQueryService();
});

/// GetFamilyIdUseCaseのプロバイダー
final getFamilyIdUseCaseProvider = Provider<GetFamilyIdUseCase>((ref) {
  return GetFamilyIdUseCase(ref.read(familyQueryServiceProvider));
});

/// GetMemberIdUseCaseのプロバイダー
final getMemberIdUseCaseProvider = Provider<GetMemberIdUseCase>((ref) {
  return GetMemberIdUseCase(ref.read(memberQueryServiceProvider));
});

/// ログイン状態のプロバイダー
final loginStateProvider = StateNotifierProvider<LoginStateNotifier, LoginState>((ref) {
  return LoginStateNotifier(
    ref.read(authProvider.notifier),
    ref.read(getFamilyIdUseCaseProvider),
    ref.read(getMemberIdUseCaseProvider),
  );
});