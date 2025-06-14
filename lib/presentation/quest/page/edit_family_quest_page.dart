import 'package:allowance_questboard/application/quest/family_quest_update_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_update_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/presentation/quest/screen/quest_editing_screen.dart';
import 'package:allowance_questboard/presentation/quest/state/edit_family_quest_state_provider.dart';
import 'package:allowance_questboard/presentation/shared/page/error_page.dart';
import 'package:allowance_questboard/presentation/shared/router/app_route.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart' show ConsumerWidget, WidgetRef;
import 'package:get_it/get_it.dart' show GetIt;
import 'package:go_router/go_router.dart' show GoRouter;

abstract interface class ValidateNotifiable {
  void validateNotify();
}

class EditFamilyQuestPage extends ConsumerWidget {
  EditFamilyQuestPage({required this.questId});

  final String questId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(editFamilyQuestStateProvider);
    final notifier = ref.read(editFamilyQuestStateProvider.notifier);
    return FutureBuilder<FamilyQuestUpdateData?>(
      // 画面表示時にクエスト情報を取得
      future: notifier.getEditFamilyQuestData(questId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting)
          return Center(child: CircularProgressIndicator());
        if (snapshot.hasError) return ErrorPage(error: snapshot.error);
        final quest = snapshot.data!;

        // クエスト情報を取得できた場合、編集画面を表示
        return EditFamilyQuestTab(quest: quest);
      },
    );
  }
}

class EditFamilyQuestTab extends StatefulWidget {
  /// 家族クエスト編集画面内のタブ画面
  EditFamilyQuestTab({required this.quest});
  final FamilyQuestUpdateData quest;

  @override
  State<StatefulWidget> createState() => EditFamilyQuestTabState();
}

class EditFamilyQuestTabState extends State<EditFamilyQuestTab> implements ValidateNotifiable {
  /// クエスト名の入力コントローラ
  final _questNameController = TextEditingController();

  /// クエスト分類の入力コントローラ
  final _questCategoryController = TextEditingController();

  /// 全ての入力が正常かどうか
  bool _isValid = false;

  /// バリデートチェック通知
  ///
  /// 全ての入力が正常かどうかを判定し、画面を再描画する
  @override
  void validateNotify() {
    if (_questNameController.text.isNotEmpty && _questCategoryController.text.isNotEmpty) {
      setState(() {
        _isValid = true;
      });
    } else {
      setState(() {
        _isValid = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      // TODO: 試験用に1にしているが、最終的には3にする。また、画面は最終的にクラス分割する。
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
            EditGeneralQuestScreen(
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

// 動作確認用コード
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
    throw UnimplementedError();
  }

  @override
  Future<List<FamilyQuestData>> getFamilyQuests(String familyId) async {
    throw UnimplementedError();
  }

  @override
  Future<FamilyQuestUpdateData?> getEditFamilyQuestData(String questId) async {
    return FamilyQuestUpdateData(
      id: "123",
      name: "Test Quest",
      icon: Icon(Icons.ac_unit),
      category: "テスト分類",
      isPublic: true,
      isShared: true,
      participants: [
        ParticipantUpdateDTO(icon: Icon(Icons.person)),
      ],
      questLevelDetails: {
        1: QuestDetailUpdateData(
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
