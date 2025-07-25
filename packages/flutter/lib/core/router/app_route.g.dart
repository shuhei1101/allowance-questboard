// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_route.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [
      $loginRoute,
      $familyHomeRoute,
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
