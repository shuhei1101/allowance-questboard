import 'package:allowance_questboard/application/quest/family_quest_update_data.dart';
import 'package:allowance_questboard/application/quest/quest_detail_editing_data.dart';
import 'package:allowance_questboard/application/quest/family_quest_application_service.dart';
import 'package:allowance_questboard/application/quest/family_quest_data.dart';
import 'package:allowance_questboard/presentation/page/error_page.dart';
import 'package:allowance_questboard/presentation/router/app_route.dart';
import 'package:allowance_questboard/presentation/screen/quest_editing_screen.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

// TODO: 作成中

/// バリデートチェック通知用インターフェース
///
/// バリデートチェックが必要な画面で実装する
abstract interface class ValidateNotifiable {
  /// バリデートチェックが正常に通知された際に呼び出される
  ///
  ///
  void validateNotify();
}

class FamilyQuestEditingPage extends StatelessWidget {
  /// 家族クエストの新規・編集画面
  FamilyQuestEditingPage({required this.questId});

  /// 更新対象のクエストID
  final String questId;

  final _service = GetIt.I<FamilyQuestApplicationService>();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<FamilyQuestUpdateData?>(
      // 画面表示時にクエスト情報を取得
      future: _service.getFamilyQuestEditingData(questId),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) return Center(child: CircularProgressIndicator());
        if (snapshot.hasError) return ErrorPage(error: snapshot.error);
        final quest = snapshot.data!;

        // クエスト情報を取得できた場合、編集画面を表示
        return FamilyQuestEditingTab(quest: quest);
      },
    );
  }
}

class FamilyQuestEditingTab extends StatefulWidget {
  /// 家族クエスト編集画面内のタブ画面
  FamilyQuestEditingTab({required this.quest});
  final FamilyQuestUpdateData quest;

  @override
  State<StatefulWidget> createState() => FamilyQuestEditingTabState();
}

class FamilyQuestEditingTabState extends State<FamilyQuestEditingTab> implements ValidateNotifiable {
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
  Future<FamilyQuestUpdateData?> getFamilyQuestEditingData(String questId) async {
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
        1: QuestDetailEditingData(
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
