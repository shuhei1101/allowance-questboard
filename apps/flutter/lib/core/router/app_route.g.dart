// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_route.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [
      $loginRoute,
      $familyHomeRoute,
      $membersRoute,
      $memberRoute,
      $familyQuestsRoute,
      $familyQuestRoute,
      $editFamilyQuestRoute,
    ];

RouteBase get $loginRoute => GoRouteData.$route(
      path: '/login',
      factory: _$LoginRoute._fromState,
    );

mixin _$LoginRoute on GoRouteData {
  static LoginRoute _fromState(GoRouterState state) => LoginRoute();

  @override
  String get location => GoRouteData.$location(
        '/login',
      );

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $familyHomeRoute => GoRouteData.$route(
      path: '/family',
      factory: _$FamilyHomeRoute._fromState,
    );

mixin _$FamilyHomeRoute on GoRouteData {
  static FamilyHomeRoute _fromState(GoRouterState state) => FamilyHomeRoute();

  @override
  String get location => GoRouteData.$location(
        '/family',
      );

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $membersRoute => GoRouteData.$route(
      path: '/members/:familyId',
      factory: _$MembersRoute._fromState,
    );

mixin _$MembersRoute on GoRouteData {
  static MembersRoute _fromState(GoRouterState state) => MembersRoute(
        familyId: state.pathParameters['familyId']!,
      );

  MembersRoute get _self => this as MembersRoute;

  @override
  String get location => GoRouteData.$location(
        '/members/${Uri.encodeComponent(_self.familyId)}',
      );

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $memberRoute => GoRouteData.$route(
      path: '/members/:familyId/member/:memberId',
      factory: _$MemberRoute._fromState,
    );

mixin _$MemberRoute on GoRouteData {
  static MemberRoute _fromState(GoRouterState state) => MemberRoute(
        familyId: state.pathParameters['familyId']!,
        memberId: state.pathParameters['memberId']!,
      );

  MemberRoute get _self => this as MemberRoute;

  @override
  String get location => GoRouteData.$location(
        '/members/${Uri.encodeComponent(_self.familyId)}/member/${Uri.encodeComponent(_self.memberId)}',
      );

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $familyQuestsRoute => GoRouteData.$route(
      path: '/quests/:familyId',
      factory: _$FamilyQuestsRoute._fromState,
    );

mixin _$FamilyQuestsRoute on GoRouteData {
  static FamilyQuestsRoute _fromState(GoRouterState state) => FamilyQuestsRoute(
        familyId: state.pathParameters['familyId']!,
      );

  FamilyQuestsRoute get _self => this as FamilyQuestsRoute;

  @override
  String get location => GoRouteData.$location(
        '/quests/${Uri.encodeComponent(_self.familyId)}',
      );

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $familyQuestRoute => GoRouteData.$route(
      path: '/quest/:questId',
      factory: _$FamilyQuestRoute._fromState,
    );

mixin _$FamilyQuestRoute on GoRouteData {
  static FamilyQuestRoute _fromState(GoRouterState state) => FamilyQuestRoute(
        questId: state.pathParameters['questId']!,
      );

  FamilyQuestRoute get _self => this as FamilyQuestRoute;

  @override
  String get location => GoRouteData.$location(
        '/quest/${Uri.encodeComponent(_self.questId)}',
      );

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}

RouteBase get $editFamilyQuestRoute => GoRouteData.$route(
      path: '/quest/:questId/edit',
      factory: _$EditFamilyQuestRoute._fromState,
    );

mixin _$EditFamilyQuestRoute on GoRouteData {
  static EditFamilyQuestRoute _fromState(GoRouterState state) =>
      EditFamilyQuestRoute(
        questId: state.pathParameters['questId']!,
      );

  EditFamilyQuestRoute get _self => this as EditFamilyQuestRoute;

  @override
  String get location => GoRouteData.$location(
        '/quest/${Uri.encodeComponent(_self.questId)}/edit',
      );

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}
