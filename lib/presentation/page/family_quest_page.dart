import 'package:allowance_questboard/application/quest/edit_family_quest_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/presentation/screen/quest_detail_screen.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

class FamilyQuestPage extends StatelessWidget {
  FamilyQuestPage({required this.questId}) : _service = GetIt.I<FamilyQuestApplicationService>();

  final String questId;
  final FamilyQuestApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<FamilyQuestData?>(
      future: _service.getFamilyQuest(questId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting)
          Center(
            child: CircularProgressIndicator(),
          );
        if (snapshot.hasError || snapshot.data == null) return ErrorPage(error: snapshot.error);
        final familyQuest = snapshot.data!;
        return Scaffold(
          appBar: AppBar(
            title: Text(familyQuest.name),
          ),
          body: Column(
            children: [
              Expanded(
                child: QuestDetailScreen(
                  quest: familyQuest,
                ),
              ),
            ],
          ),
        );
      },
    );
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

  @override
  Future<FamilyQuestEditingData?> getEditFamilyQuest(String questId) {
    // TODO: implement getEditFamilyQuest
    throw UnimplementedError();
  }
}
