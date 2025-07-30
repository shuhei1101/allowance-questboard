// import 'package:allowance_questboard/application/quest/update_family_quest_response.dart';
// import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
// import 'package:allowance_questboard/application/quest/family_quest_data.dart';
// import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
// import 'package:allowance_questboard/presentation/quest/screen/family_quests_screen.dart';
// import 'package:allowance_questboard/core/page/error_page.dart';
// import 'package:allowance_questboard/core/router/app_route.dart';
// import 'package:flutter/material.dart';
// import 'package:get_it/get_it.dart';
// import 'package:go_router/go_router.dart';

// class FamilyQuestsPage extends StatelessWidget {
//   /// 家族クエスト一覧画面
//   FamilyQuestsPage({required this.familyId}) : _service = GetIt.I<FamilyQuestApplicationService>();

//   /// 対象の家族ID
//   final String familyId;
//   final FamilyQuestApplicationService _service;

//   @override
//   Widget build(BuildContext context) {
//     return FutureBuilder<List<FamilyQuestData>>(
//         // 家族IDから家族クエスト一覧を取得
//         future: _service.getFamilyQuests(familyId),
//         builder: (context, snapshot) {
//           if (snapshot.connectionState == ConnectionState.waiting)
//             Center(child: CircularProgressIndicator());
//           if (snapshot.hasError || snapshot.data == null) return ErrorPage(error: snapshot.error);
//           final quests = snapshot.data;

//           // 家族クエスト一覧を取得できた場合、一覧画面を表示
//           return Scaffold(
//               appBar: AppBar(
//                 title: const Text('クエスト画面'),
//                 actions: [],
//               ),
//               body: Column(
//                 children: [
//                   Expanded(
//                     child: FamilyQuestsScreen(
//                         quests: quests!,
//                         onTap: (String questId) {
//                           FamilyQuestRoute(questId: questId).push(context);
//                         }),
//                   )
//                 ],
//               ));
//         });
//   }
// }

// // 動作確認用コード
// void main() {
//   GetIt.I.registerSingleton<FamilyQuestApplicationService>(MockFamilyQuestApplicationService());
//   final router = GoRouter(initialLocation: '/quests/123', routes: $appRoutes);
//   runApp(MaterialApp.router(
//     routerConfig: router,
//   ));
// }

// class MockFamilyQuestApplicationService implements FamilyQuestApplicationService {
//   @override
//   Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
//     return [
//       FamilyQuestData(
//         id: "123",
//         name: "Test Quest",
//         category: "テスト分類",
//         icon: Icon(Icons.abc),
//         isPublic: true,
//         questLevelDetails: {
//           1: QuestDetailData(
//               successCondition: "Complete all tasks",
//               failureCondition: "Fail to complete tasks",
//               targetCount: 5,
//               rewards: 2,
//               memberExp: 150,
//               questExp: 75),
//           2: QuestDetailData(
//               successCondition: "Complete all tasks",
//               failureCondition: "Fail to complete tasks",
//               targetCount: 5,
//               rewards: 2,
//               memberExp: 150,
//               questExp: 75),
//           3: QuestDetailData(
//               successCondition: "Complete all tasks",
//               failureCondition: "Fail to complete tasks",
//               targetCount: 5,
//               rewards: 2,
//               memberExp: 150,
//               questExp: 75),
//         },
//         participants: [],
//         isShared: false,
//       ),
//       FamilyQuestData(
//         id: "123",
//         name: "Test Quest",
//         category: "テスト分類",
//         icon: Icon(Icons.abc),
//         isPublic: true,
//         questLevelDetails: {
//           1: QuestDetailData(
//               successCondition: "Complete all tasks",
//               failureCondition: "Fail to complete tasks",
//               targetCount: 5,
//               rewards: 2,
//               memberExp: 150,
//               questExp: 75)
//         },
//         participants: [],
//         isShared: false,
//       ),
//     ];
//   }

//   @override
//   Future<FamilyQuestData?> getFamilyQuest(String questId) async {
//     return FamilyQuestData(
//       id: "123",
//       name: "Test Quest",
//       icon: Icon(Icons.person),
//       isPublic: true,
//       isShared: true,
//       category: 'テスト分類',
//       participants: [
//         ParticipantData(icon: Icon(Icons.person)),
//       ],
//       questLevelDetails: {
//         1: QuestDetailData(
//             successCondition: "successCondition1",
//             failureCondition: "failureCondition2",
//             targetCount: 1,
//             rewards: 1,
//             memberExp: 1,
//             questExp: 1),
//         2: QuestDetailData(
//             successCondition: "successCondition2",
//             failureCondition: "failureCondition2",
//             targetCount: 1,
//             rewards: 1,
//             memberExp: 1,
//             questExp: 1)
//       },
//     );
//   }

//   @override
//   Future<UpdateFamilyQuestResponse?> getEditFamilyQuestData(String questId) {
//     throw UnimplementedError();
//   }
// }
