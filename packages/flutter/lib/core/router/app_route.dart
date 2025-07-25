import 'package:allowance_questboard/family/home/page/family_home_page.dart';
import 'package:allowance_questboard/login/page/login_page/login_page.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

part 'app_route.g.dart';

/// ログイン画面へのルーティング
@TypedGoRoute<LoginRoute>(path: '/login')
class LoginRoute extends GoRouteData with _$LoginRoute {
  @override
  Widget build(BuildContext context, GoRouterState state) {
    return LoginPage();
  }
}

/// 家族ホーム画面へのルーティング
@TypedGoRoute<FamilyHomeRoute>(path: '/family')
class FamilyHomeRoute extends GoRouteData with _$FamilyHomeRoute {
  @override
  Widget build(BuildContext context, GoRouterState state) {
    return FamilyHomePage();
  }
}

/// 家族メンバー一覧画面へのルーティング
// @TypedGoRoute<MembersRoute>(path: '/members/:familyId')
// class MembersRoute extends GoRouteData with _$MembersRoute {
//   MembersRoute({required this.familyId});

//   final String familyId;

//   @override
//   Widget build(BuildContext context, GoRouterState state) {
//     return MembersPage(familyId: familyId);
//   }
// }

/// 家族メンバー詳細画面へのルーティング
// @TypedGoRoute<MemberRoute>(path: '/members/:familyId/member/:memberId')
// class MemberRoute extends GoRouteData with _$MemberRoute {
//   MemberRoute({required this.familyId, required this.memberId});

//   final String familyId;
//   final String memberId;

//   @override
//   Widget build(BuildContext context, GoRouterState state) {
//     return MemberPage(familyId: familyId, memberId: memberId);
//   }
// }

// /// 家族クエスト一覧画面へのルーティング
// @TypedGoRoute<FamilyQuestsRoute>(path: '/quests/:familyId')
// class FamilyQuestsRoute extends GoRouteData with _$FamilyQuestsRoute {
//   FamilyQuestsRoute({required this.familyId});

//   final String familyId;

//   @override
//   Widget build(BuildContext context, GoRouterState state) {
//     return FamilyQuestsPage(familyId: familyId);
//   }
// }

// /// 家族クエスト詳細画面へのルーティング
// @TypedGoRoute<FamilyQuestRoute>(path: '/quest/:questId')
// class FamilyQuestRoute extends GoRouteData with _$FamilyQuestRoute {
//   FamilyQuestRoute({required this.questId});

//   final String questId;

//   @override
//   Widget build(BuildContext context, GoRouterState state) {
//     return FamilyQuestPage(questId: questId);
//   }
// }

// /// 家族クエスト編集画面へのルーティング
// @TypedGoRoute<EditFamilyQuestRoute>(path: '/quest/:questId/edit')
// class EditFamilyQuestRoute extends GoRouteData with _$EditFamilyQuestRoute {
//   EditFamilyQuestRoute({required this.questId});

//   final String questId;

//   @override
//   Widget build(BuildContext context, GoRouterState state) {
//     return EditFamilyQuestPage(questId: questId);
//   }
// }
