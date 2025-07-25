import 'package:flutter/material.dart';

/// クエストレベルの表示ウィジェットのデリゲート
abstract interface class QuestLevelsIconDelegate {
  /// 指定したクエストレベルに変更する
  ///
  /// ### Parameters
  /// - int level: 変更後のクエストレベル
  ///
  /// ### delegate側実装例
  /// ```dart
  /// @override
  /// void toLevel(int level) {
  ///   setState(() {
  ///     _currentLevel = level;
  ///   });
  /// }
  /// ```
  void toLevel(int level);
}

class QuestLevelsIcon extends StatelessWidget {
  /// クエストのレベルを表示するウィジェット
  ///
  /// クエストの最大レベルと現在のレベルを受け取り、 \
  /// 現在のレベル以下を★のアイコン、それ以外を☆のアイコンで表示する
  ///
  /// * 例: maxLevel=5, currentLevel=3の場合 \
  /// ★★★☆☆
  QuestLevelsIcon({required this.maxLevel, required this.currentLevel, required this.delegate});

  /// クエストが持つ最大レベル
  final int maxLevel;

  /// 現在のレベル
  final int currentLevel;

  /// レベル変更時の処理を委譲するデリゲート
  final QuestLevelsIconDelegate delegate;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        for (int i = 1; i <= currentLevel; i++) IconButton(icon: Icon(Icons.star), onPressed: () => delegate.toLevel(i)),
        for (int i = currentLevel + 1; i <= maxLevel; i++) IconButton(icon: Icon(Icons.star_border), onPressed: () => delegate.toLevel(i)),
      ],
    );
  }
}

// 動作確認用コード
void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Center(
          child: QuestLevelsIcon(
            maxLevel: 5,
            currentLevel: 3,
            delegate: MockQuestLevelsIconDelegate(),
          ),
        ),
      ),
    ),
  );
}

class MockQuestLevelsIconDelegate implements QuestLevelsIconDelegate {
  @override
  void toLevel(int level) {
    // ignore: avoid_print
    print("Level changed to $level");
  }
}
