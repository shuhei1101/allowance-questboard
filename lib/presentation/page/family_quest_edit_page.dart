import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

class FamilyQuestEditPage extends StatelessWidget {
  FamilyQuestEditPage({required this.questId}) : _service = GetIt.I<FamilyQuestApplicationService>();

  final String questId;
  final FamilyQuestApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return Future;
  }
}

void main() {
  GetIt.I.registerSingleton<FamilyQuestApplicationService>(MockFamilyQuestApplicationService());
  final router = GoRouter(initialLocation: '/quest/123', routes: $appRoutes);
  runApp(MaterialApp.router(
    routerConfig: router,
  ));
}

class MockFamilyQuestApplicationService implements FamilyQuestApplicationService {
  @override
  Future<FamilyQuestData?> getFamilyQuest(String questId) async {
    return FamilyQuestData(
      id: "123",
      name: "Test Quest",
      icon: Icon(Icons.person),
      isPublic: true,
      isShared: true,
      category: 'テスト分類',
      participants: [
        ParticipantData(icon: Icon(Icons.person)),
      ],
      questLevelDetails: {
        1: QuestDetailData(successCondition: "successCondition1", failureCondition: "failureCondition2", targetCount: 1, rewards: 1, memberExp: 1, questExp: 1),
        2: QuestDetailData(successCondition: "successCondition2", failureCondition: "failureCondition2", targetCount: 1, rewards: 1, memberExp: 1, questExp: 1)
      },
    );
  }

  @override
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) {
    // TODO: implement getFamilyQuests
    throw UnimplementedError();
  }
}
