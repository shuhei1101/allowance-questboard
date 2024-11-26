import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../page/member_page.dart';
import '../page/members_page.dart';
part 'app_route.g.dart';

const members = "members";
const member = "member";

@TypedGoRoute<MembersRoute>(path: '/$members/:familyId')
class MembersRoute extends GoRouteData {
  MembersRoute({required this.familyId});

  final String familyId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return MembersPage(familyId: familyId);
  }
}

@TypedGoRoute<MemberRoute>(path: '/$members/:familyId/$member/:memberId')
class MemberRoute extends GoRouteData {
  MemberRoute({required this.familyId, required this.memberId});

  final String familyId;
  final String memberId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return MemberPage(familyId: familyId, memberId: memberId);
  }
}
