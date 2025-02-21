import 'package:allowance_questboard/application/quest/family_quest_editing_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_editing_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:allowance_questboard/presentation/screen/quest_editing_screen.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

abstract interface class ValidateNotifiable {
  void notify();
}

class FamilyQuestEditingPage extends StatelessWidget {
  FamilyQuestEditingPage({required this.questId});
  final String questId;

  final _service = GetIt.I<FamilyQuestApplicationService>();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<FamilyQuestEditingData?>(
      future: _service.getFamilyQuestEditingData(questId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) return Center(child: CircularProgressIndicator());
        if (snapshot.hasError) return ErrorPage(error: snapshot.error);
        final quest = snapshot.data!;
        return FamilyQuestEditingTab(quest: quest);
      },
    );
  }
}

class FamilyQuestEditingTab extends StatefulWidget {
  FamilyQuestEditingTab({required this.quest});
  final FamilyQuestEditingData quest;

  @override
  State<StatefulWidget> createState() => FamilyQuestEditingTabState();
}

class FamilyQuestEditingTabState extends State<FamilyQuestEditingTab> implements ValidateNotifiable {
  final _questNameController = TextEditingController();
  final _questCategoryController = TextEditingController();
  bool _isValid = false;

  @override
  void notify() {
    if (_questNameController.text.isNotEmpty && _questCategoryController.text.isNotEmpty) {
      setState(() {
        _isValid = true;
      });
      return;
    }
    setState(() {
      _isValid = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 1,
      child: Scaffold(
        appBar: AppBar(
          title: Text("クエスト編集"),
          bottom: TabBar(
            tabs: [
              Tab(text: "一般"),
            ],
          ),
          actions: [
            IconButton(
              icon: Icon(Icons.delete),
              onPressed: _isValid ? () {} : null,
              color: _isValid ? Colors.red : Colors.grey,
            ),
            IconButton(
              icon: Icon(Icons.preview),
              onPressed: () {},
            ),
            IconButton(
              icon: Icon(Icons.save),
              onPressed: () {},
            ),
          ],
        ),
        body: TabBarView(
          children: [
            GeneralQuestEditingScreen(
              quest: widget.quest,
              delegate: this,
              questNameController: _questNameController,
              questCategoryController: _questCategoryController,
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  GetIt.I.registerSingleton<FamilyQuestApplicationService>(MockFamilyQuestApplicationService());
  final router = GoRouter(initialLocation: '/quest/123/edit', routes: $appRoutes);
  runApp(MaterialApp.router(
    routerConfig: router,
  ));
}

class MockFamilyQuestApplicationService implements FamilyQuestApplicationService {
  @override
  Future<FamilyQuestData?> getFamilyQuest(String questId) async {
    // TODO: implement getFamilyQuest
    throw UnimplementedError();
  }

  @override
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
    // TODO: implement getFamilyQuests
    throw UnimplementedError();
  }

  @override
  Future<FamilyQuestEditingData?> getFamilyQuestEditingData(String questId) async {
    return FamilyQuestEditingData(
      id: "123",
      name: "Test Quest",
      icon: Icon(Icons.ac_unit),
      category: "テスト分類",
      isPublic: true,
      isShared: true,
      participants: [
        ParticipantEditingData(icon: Icon(Icons.person)),
      ],
      questLevelDetails: {
        1: QuestDetailSettingData(
          successCondition: "Complete all tasks",
          failureCondition: "Fail any task",
          targetCount: 10,
          rewards: 12,
          memberExp: 50,
          questExp: 100,
        ),
      },
      ageFrom: 3,
      ageTill: 12,
      startedOn: DateTime.now(),
      endedOn: DateTime.now().add(Duration(days: 7)),
    );
  }
}
