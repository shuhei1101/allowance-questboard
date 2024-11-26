import 'package:allowance_questboard/presentation/theme/app_themes.dart';
import 'package:flutter/material.dart';

main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Theme Demo',
      theme: AppThemes.commonTheme, // デフォルトの共通テーマ
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Theme(
        data: AppThemes.questTheme, // ホーム画面専用のテーマ
        child: Builder(
          builder: (context) => Scaffold(
            appBar: AppBar(
              title: Text('Home Scre en'),
            ),
            body: Column(
              children: [
                ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => DetailScreen()),
                    );
                  },
                  child: Text('Go to Detail Screen'),
                ),
                TextField(
                  decoration: InputDecoration(label: Text('data')),
                )
              ],
            ),
          ),
        ));
  }
}

class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Theme(
      data: AppThemes.commonTheme, // 詳細画面専用のテーマ
      child: Builder(
          builder: (context) => Scaffold(
                appBar: AppBar(
                  title: Text('Detail Screen'),
                  backgroundColor: Theme.of(context).colorScheme.primary,
                ),
                body: Center(
                  child: Text('This is the Detail Screen'),
                ),
              )),
    );
  }
}
