// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_route.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [
      $membersRoute,
      $memberRoute,
      $familyQuestsRoute,
      $questRoute,
    ];

RouteBase get $membersRoute => GoRouteData.$route(
      path: '/members/:familyId',
      factory: $MembersRouteExtension._fromState,
    );

extension $MembersRouteExtension on MembersRoute {
  static MembersRoute _fromState(GoRouterState state) => MembersRoute(
        familyId: state.pathParameters['familyId']!,
      );

  String get location => GoRouteData.$location(
        '/members/${Uri.encodeComponent(familyId)}',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) => context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $memberRoute => GoRouteData.$route(
      path: '/members/:familyId/member/:memberId',
      factory: $MemberRouteExtension._fromState,
    );

extension $MemberRouteExtension on MemberRoute {
  static MemberRoute _fromState(GoRouterState state) => MemberRoute(
        familyId: state.pathParameters['familyId']!,
        memberId: state.pathParameters['memberId']!,
      );

  String get location => GoRouteData.$location(
        '/members/${Uri.encodeComponent(familyId)}/member/${Uri.encodeComponent(memberId)}',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) => context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $familyQuestsRoute => GoRouteData.$route(
      path: '/quests/:familyId',
      factory: $FamilyQuestsRouteExtension._fromState,
    );

extension $FamilyQuestsRouteExtension on FamilyQuestsRoute {
  static FamilyQuestsRoute _fromState(GoRouterState state) => FamilyQuestsRoute(
        familyId: state.pathParameters['familyId']!,
      );

  String get location => GoRouteData.$location(
        '/quests/${Uri.encodeComponent(familyId)}',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) => context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $questRoute => GoRouteData.$route(
      path: '/quest/:questId',
      factory: $QuestRouteExtension._fromState,
    );

extension $QuestRouteExtension on FamilyQuestRoute {
  static FamilyQuestRoute _fromState(GoRouterState state) => FamilyQuestRoute(
        questId: state.pathParameters['questId']!,
      );

  String get location => GoRouteData.$location(
        '/quest/${Uri.encodeComponent(questId)}',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  void pushReplacement(BuildContext context) => context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}
