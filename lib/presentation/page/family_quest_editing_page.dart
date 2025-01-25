import 'package:allowance_questboard/application/quest/edit_family_quest_data.dart';
import 'package:allowance_questboard/application/quest/edit_quest_detail_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:allowance_questboard/presentation/screen/quest_editing_screen.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

abstract interface class ValidateNotifiable {
  void notify(bool isValid);
}

class FamilyQuestEditingPage extends StatefulWidget {
  FamilyQuestEditingPage({required this.questId}) : _service = GetIt.I<FamilyQuestApplicationService>();

  final String questId;
  final FamilyQuestApplicationService _service;

  @override
  State<StatefulWidget> createState() => FamilyQuestEditingPageState();
}

class FamilyQuestEditingPageState extends State<FamilyQuestEditingPage> implements ValidateNotifiable {
  bool _isValid = false;
  final TextEditingController _controller1 = TextEditingController();
  final TextEditingController _controller2 = TextEditingController();

  @override
  void notify(bool isValid) {
    _isValid = isValid;
    setState(() => {});
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<FamilyQuestEditingData?>(
      future: widget._service.getEditFamilyQuest(widget.questId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) return Center(child: CircularProgressIndicator());
        if (snapshot.hasError) return ErrorPage(error: snapshot.error);
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
                actions: [
                  IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: _isValid ? () {} : null,
                    color: _isValid ? null : Colors.grey,
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
                    questId: widget.questId,
                    delegate: this,
                    controller1: _controller1,
                    controller2: _controller2,
                  ),
                ],
              )),
        );
      },
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
  Future<FamilyQuestEditingData?> getEditFamilyQuest(String questId) async {
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
        1: QuestEditingDetailData(
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
