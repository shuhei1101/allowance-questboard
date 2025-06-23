// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_route.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [
  $loginRoute,
  $membersRoute,
  $memberRoute,
  $familyQuestsRoute,
  $familyQuestRoute,
  $editFamilyQuestRoute,
];

RouteBase get $loginRoute => GoRouteData.$route(
      path: '/login',
      factory: (GoRouterState state) => const LoginRoute(),
    );

RouteBase get $membersRoute => GoRouteData.$route(
      path: '/members/:familyId',
      factory: (GoRouterState state) => MembersRoute(
        familyId: state.pathParameters['familyId']!,
      ),
    );

RouteBase get $memberRoute => GoRouteData.$route(
      path: '/members/:familyId/member/:memberId',
      factory: (GoRouterState state) => MemberRoute(
        familyId: state.pathParameters['familyId']!,
        memberId: state.pathParameters['memberId']!,
      ),
    );

RouteBase get $familyQuestsRoute => GoRouteData.$route(
      path: '/quests/:familyId',
      factory: (GoRouterState state) => FamilyQuestsRoute(
        familyId: state.pathParameters['familyId']!,
      ),
    );

RouteBase get $familyQuestRoute => GoRouteData.$route(
      path: '/quest/:questId',
      factory: (GoRouterState state) => FamilyQuestRoute(
        questId: state.pathParameters['questId']!,
      ),
    );

RouteBase get $editFamilyQuestRoute => GoRouteData.$route(
      path: '/quest/:questId/edit',
      factory: (GoRouterState state) => EditFamilyQuestRoute(
        questId: state.pathParameters['questId']!,
      ),
    );

extension $LoginRouteExtension on LoginRoute {
  static LoginRoute _fromState(GoRouterState state) => const LoginRoute();

  String get location => GoRouteData.$location(
        '/login',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T extends Object?>(BuildContext context) =>
      context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

extension $MembersRouteExtension on MembersRoute {
  static MembersRoute _fromState(GoRouterState state) => MembersRoute(
        familyId: state.pathParameters['familyId']!,
      );

  String get location => GoRouteData.$location(
        '/members/${Uri.encodeComponent(familyId)}',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T extends Object?>(BuildContext context) =>
      context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

extension $MemberRouteExtension on MemberRoute {
  static MemberRoute _fromState(GoRouterState state) => MemberRoute(
        familyId: state.pathParameters['familyId']!,
        memberId: state.pathParameters['memberId']!,
      );

  String get location => GoRouteData.$location(
        '/members/${Uri.encodeComponent(familyId)}/member/${Uri.encodeComponent(memberId)}',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T extends Object?>(BuildContext context) =>
      context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

extension $FamilyQuestsRouteExtension on FamilyQuestsRoute {
  static FamilyQuestsRoute _fromState(GoRouterState state) => FamilyQuestsRoute(
        familyId: state.pathParameters['familyId']!,
      );

  String get location => GoRouteData.$location(
        '/quests/${Uri.encodeComponent(familyId)}',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T extends Object?>(BuildContext context) =>
      context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

extension $FamilyQuestRouteExtension on FamilyQuestRoute {
  static FamilyQuestRoute _fromState(GoRouterState state) => FamilyQuestRoute(
        questId: state.pathParameters['questId']!,
      );

  String get location => GoRouteData.$location(
        '/quest/${Uri.encodeComponent(questId)}',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T extends Object?>(BuildContext context) =>
      context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}

extension $EditFamilyQuestRouteExtension on EditFamilyQuestRoute {
  static EditFamilyQuestRoute _fromState(GoRouterState state) => EditFamilyQuestRoute(
        questId: state.pathParameters['questId']!,
      );

  String get location => GoRouteData.$location(
        '/quest/${Uri.encodeComponent(questId)}/edit',
      );

  void go(BuildContext context) => context.go(location);

  Future<T?> push<T extends Object?>(BuildContext context) =>
      context.push<T>(location);

  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  void replace(BuildContext context) => context.replace(location);
}