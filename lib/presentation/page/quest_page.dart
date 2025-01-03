import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_data.dart';
import 'package:allowance_questboard/presentation/component/quest/quest_detail_page_view.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class QuestPage extends StatelessWidget {
  QuestPage({required this.questId}) : _service = GetIt.I.get<FamilyQuestApplicationService>();

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
        if (snapshot.hasError || snapshot.data == null) return ErrorPage();
        final familyQuest = snapshot.data!;
        return Scaffold(
          appBar: AppBar(
            title: Text(familyQuest.name),
          ),
          body: Column(
            children: [
              familyQuest.icon,
              Expanded(
                child: QuestDetailPageView(
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
  runApp(MaterialApp(
    home: QuestPage(questId: "123"),
  ));
}

class MockFamilyQuestApplicationService implements FamilyQuestApplicationService {
  @override
  Future<FamilyQuestData?> getFamilyQuest(String questId) async {
    return FamilyQuestData(id: "123", name: "Test Quest", icon: Icon(Icons.person), isPublic: true, isShared: true, participants: [
      ParticipantData(icon: Icon(Icons.person)),
    ], questLevelDetails: {
      1: QuestDetailData(successCondition: "successCondition1", failureCondition: "failureCondition2", targetCount: 1, rewards: 1, memberExp: 1, questExp: 1),
      2: QuestDetailData(successCondition: "successCondition2", failureCondition: "failureCondition2", targetCount: 1, rewards: 1, memberExp: 1, questExp: 1)
    });
  }

  @override
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) {
    // TODO: implement getFamilyQuests
    throw UnimplementedError();
  }
}
