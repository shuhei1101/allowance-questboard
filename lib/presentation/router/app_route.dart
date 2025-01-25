import 'package:allowance_questboard/presentation/page/family_quest_editing_page.dart';
import 'package:allowance_questboard/presentation/page/family_quests_page.dart';
import 'package:allowance_questboard/presentation/page/family_quest_page.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../page/member_page.dart';
import '../page/members_page.dart';
part 'app_route.g.dart';

// flutter pub run build_runner build

@TypedGoRoute<MembersRoute>(path: '/members/:familyId')
class MembersRoute extends GoRouteData {
  MembersRoute({required this.familyId});

  final String familyId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return MembersPage(familyId: familyId);
  }
}

@TypedGoRoute<MemberRoute>(path: '/members/:familyId/member/:memberId')
class MemberRoute extends GoRouteData {
  MemberRoute({required this.familyId, required this.memberId});

  final String familyId;
  final String memberId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return MemberPage(familyId: familyId, memberId: memberId);
  }
}

@TypedGoRoute<FamilyQuestsRoute>(path: '/quests/:familyId')
class FamilyQuestsRoute extends GoRouteData {
  FamilyQuestsRoute({required this.familyId});

  final String familyId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return FamilyQuestsPage(familyId: familyId);
  }
}

@TypedGoRoute<FamilyQuestRoute>(path: '/quest/:questId')
class FamilyQuestRoute extends GoRouteData {
  FamilyQuestRoute({required this.questId});

  final String questId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return FamilyQuestPage(questId: questId);
  }
}

@TypedGoRoute<FamilyQuestEditingRoute>(path: '/quest/:questId/edit')
class FamilyQuestEditingRoute extends GoRouteData {
  FamilyQuestEditingRoute({required this.questId});

  final String questId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return FamilyQuestEditingPage(questId: questId);
  }
}
