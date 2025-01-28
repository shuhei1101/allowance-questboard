// import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
// import 'package:allowance_questboard/application/quest/family_quest_data.dart';
// import 'package:allowance_questboard/presentation/router/app_route.dart';
// import 'package:flutter/material.dart';
// import 'package:get_it/get_it.dart';
// import 'package:go_router/go_router.dart';

// void main() {
//   GetIt.I.registerSingleton<FamilyQuestApplicationService>(MockFamilyQuestApplicationService());
//   runApp(TestFamilyQuestsPage());
// }

// class TestFamilyQuestsPage extends StatelessWidget {
//   final router = GoRouter(initialLocation: '/quests/4asdf243', routes: $appRoutes);

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp.router(
//       routerConfig: router,
//     );
//   }
// }

// class MockFamilyQuestApplicationService implements FamilyQuestApplicationService {
//   @override
//   Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
//     return [
//       FamilyQuestData(
//         id: "123",
//         name: "test",
//         icon: const Icon(Icons.person),
//         isPublic: true,
//         isShared: true,
//         participants: [
//           ParticipantData(icon: const Icon(Icons.person)),
//           ParticipantData(icon: const Icon(Icons.person)),
//         ],
//       ),
//     ];
//   }

//   @override
//   Future<FamilyQuestData?> getFamilyQuest(String questId) {
//     // TODO: implement getFamilyQuest
//     throw UnimplementedError();
//   }
// }
