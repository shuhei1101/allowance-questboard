import 'package:flutter/material.dart';

/// 当該アプリのテーマを定義するクラス
class AppThemes {
  /// デフォルトテーマ
  static final commonTheme = ThemeData(
      // テーマの色設定
      colorScheme: const ColorScheme.light(
        primary: Color.fromARGB(255, 33, 243, 58),
        secondary: Colors.green,
      ),
      // テキストのスタイル設定
      textTheme: TextTheme());

  /// クエスト画面用テーマ
  static final questTheme = ThemeData(
      // TODO: 試験用に色を指定。後で修正が必要。
      colorScheme: const ColorScheme.light(
          primary: Color.fromARGB(255, 13, 105, 226),
          secondary: Colors.amber,
          primaryContainer: Colors.amber,
          surface: Color.fromARGB(255, 255, 255, 255),
          error: Colors.amber,
          brightness: Brightness.light),
      // テキストのスタイル設定
      textTheme: TextTheme(bodyLarge: TextStyle(color: const Color.fromARGB(255, 77, 62, 0)), bodySmall: TextStyle(color: Colors.blue.shade500)),
      // アプリバーのテーマ設定
      appBarTheme: AppBarTheme(
        color: Colors.lightGreenAccent,
      ));
}
