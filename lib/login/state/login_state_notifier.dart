// import 'package:allowance_questboard/application/auth/auth_provider.dart';
// import 'package:allowance_questboard/application/auth/get_family_id_use_case.dart';
// import 'package:allowance_questboard/application/auth/get_member_id_use_case.dart';
// import 'package:allowance_questboard/infrastracture/query_service/family_query_service.dart';
// import 'package:allowance_questboard/infrastracture/query_service/member_query_service.dart';
// import 'package:allowance_questboard/login/state/login_state.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:get_it/get_it.dart';

// /// 使用するサービス
// class LoginServices {
//   final FamilyQueryService familyQueryService = FamilyQueryService();
//   final MemberQueryService memberQueryService = MemberQueryService();

//   GetFamilyIdUseCase get getFamilyIdUseCase => GetFamilyIdUseCase(familyQueryService);
//   GetMemberIdUseCase get getMemberIdUseCase => GetMemberIdUseCase(memberQueryService);
// }

// /// ログイン画面の状態管理
// class LoginStateNotifier extends StateNotifier<LoginState> {
//   final AuthProvider _authProvider;
//   final LoginServices _services = LoginServices();

//   LoginStateNotifier(this._authProvider) : super(const LoginState());

//   /// ログインタイプを切り替える（家族/メンバー）
//   void toggleLoginType() {
//     state = state.copyWith(isFamilyLogin: !state.isFamilyLogin);
//   }

//   /// ログイン処理
//   Future<void> handleLogin(String userId) async {
//     state = state.copyWith(isLoading: true, errorMessage: null);

//     try {
//       if (state.isFamilyLogin) {
//         // 家族としてログイン
//         final familyId = await _services.getFamilyIdUseCase.execute(userId);
//         if (familyId != null) {
//           _authProvider.setUserInfo(userId: userId, familyId: familyId);
//         } else {
//           state = state.copyWith(
//             isLoading: false,
//             errorMessage: '家族情報が見つかりませんでした',
//           );
//           return;
//         }
//       } else {
//         // メンバーとしてログイン
//         final memberId = await _services.getMemberIdUseCase.execute(userId);
//         if (memberId != null) {
//           // メンバーの家族IDも取得
//           final familyId = await _services.memberQueryService.getFamilyIdByMemberId(memberId);
//           _authProvider.setUserInfo(
//             userId: userId,
//             memberId: memberId,
//             familyId: familyId, // メンバーでも家族IDを保持（ナビゲーション用）
//           );
//         } else {
//           state = state.copyWith(
//             isLoading: false,
//             errorMessage: 'メンバー情報が見つかりませんでした',
//           );
//           return;
//         }
//       }

//       state = state.copyWith(isLoading: false);
//     } catch (e) {
//       state = state.copyWith(
//         isLoading: false,
//         errorMessage: 'ログインに失敗しました: $e',
//       );
//     }
//   }

//   /// エラーをクリア
//   void clearError() {
//     state = state.copyWith(errorMessage: null);
//   }
// }
