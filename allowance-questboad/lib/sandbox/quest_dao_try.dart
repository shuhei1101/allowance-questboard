import 'package:allowance_questboard/firebase_options.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';

import 'package:allowance_questboard/infrastracture/dao/interface/quest_dao.dart';
import 'package:allowance_questboard/infrastracture/entity/quest_entity.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: QuestListPage(),
    );
  }
}

class QuestListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('クエスト一覧')),
      body: FutureBuilder<List<QuestEntity>>(
        future: QuestDao().fetchQuests(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('エラー: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('データがありません'));
          } else {
            final quests = snapshot.data!;
            return ListView.builder(
              itemCount: quests.length,
              itemBuilder: (context, index) {
                final quest = quests[index];
                return ListTile(
                  title: Text(quest.title),
                  subtitle: Text('クライアント: ${quest.client}'),
                );
              },
            );
          }
        },
      ),
    );
  }
}
