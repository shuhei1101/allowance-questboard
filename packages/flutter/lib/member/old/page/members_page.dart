// import 'package:allowance_questboard/core/page/error_page.dart';
// import 'package:flutter/material.dart';
// import 'package:get_it/get_it.dart';

// import '../../../application/member/member_application_service.dart';
// import '../../../application/member/member_data.dart';
// import '../screen/members_screen.dart';
// import '../../../core/router/app_route.dart';

// class MembersPage extends StatelessWidget {
//   /// 家族メンバー一覧画面
//   MembersPage({required this.familyId, super.key}) : _service = GetIt.I<MemberApplicationService>();

//   final MemberApplicationService _service;

//   /// 表示対象の家族ID
//   final String familyId;

//   @override
//   Widget build(BuildContext context) {
//     return FutureBuilder<List<MemberData>?>(
//         // 画面表示時に家族のメンバー情報を取得
//         future: _service.getFamilyMembers(familyId),
//         builder: (context, snapshot) {
//           if (snapshot.connectionState == ConnectionState.waiting)
//             Center(child: CircularProgressIndicator());
//           if (snapshot.hasError || snapshot.data == null) return ErrorPage(error: snapshot.error);
//           final members = snapshot.data;

//           // メンバー情報を取得できた場合、一覧画面を表示
//           return Scaffold(
//               appBar: AppBar(
//                 title: const Text('メンバ管理'),
//                 actions: [
//                   IconButton(onPressed: () {}, icon: Icon(Icons.add)),
//                   IconButton(onPressed: () {}, icon: Icon(Icons.settings)),
//                 ],
//               ),
//               body: Expanded(
//                 child: MembersScreen(
//                   members: members!,
//                   onTap: (memberId) {
//                     MemberRoute(familyId: familyId, memberId: memberId).push(context);
//                   },
//                 ),
//               ));
//         });
//   }
// }
