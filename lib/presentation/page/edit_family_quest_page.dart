import 'package:allowance_questboard/application/quest/edit_family_quest_data.dart';
import 'package:allowance_questboard/application/quest/edit_quest_detail_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

class EditFamilyQuestPage extends StatelessWidget {
  EditFamilyQuestPage({required this.questId}) : _service = GetIt.I<FamilyQuestApplicationService>();

  final String questId;
  final FamilyQuestApplicationService _service;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<EditFamilyQuestData?>(
      future: _service.getEditFamilyQuest(questId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) return Center(child: CircularProgressIndicator());
        if (snapshot.hasError) return ErrorPage();
        final quest = snapshot.data!;
        return DefaultTabController(
          length: 3,
          child: Scaffold(
              appBar: AppBar(
                title: Text(quest.name),
                bottom: TabBar(
                  tabs: [
                    Tab(text: "Detail"),
                  ],
                ),
              ),
              body: TabBarView(
                children: [
                  Text("data"),
                ],
              )),
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
    throw UnimplementedError();
  }

  @override
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
    throw UnimplementedError();
  }

  @override
  Future<EditFamilyQuestData?> getEditFamilyQuest(String questId) async {
    return EditFamilyQuestData(
      id: "123",
      name: "Test Quest",
      icon: Icon(Icons.ac_unit),
      category: "テスト分類",
      isPublic: true,
      isShared: true,
      participants: [
        EditParticipantData(icon: Icon(Icons.person)),
      ],
      questLevelDetails: {
        1: EditQuestDetailData(
          successCondition: "Complete all tasks",
          failureCondition: "Fail any task",
          targetCount: 10,
          rewards: 12,
          memberExp: 50,
          questExp: 100,
        ),
      },
    );
  }
}
