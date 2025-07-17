import 'package:flutter/material.dart';

class ErrorPage extends StatelessWidget {
  /// エラーページ
  ///
  /// [error]には発生したエラーを指定する
  /// [snapshot.error]は[Object]型なので、初期化時にエラーの型に応じてキャストする
  ErrorPage({required error}) {
    if (error is Error) {
      _message = error.toString();
      _traceback = error.stackTrace;
    }
  }

  late final String _message;
  late final StackTrace? _traceback;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("エラー"),
        ),
        body: Center(
          child: SingleChildScrollView(
            scrollDirection: Axis.vertical,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("存在しないページです"),
                TextButton(onPressed: () => Navigator.of(context).pop(), child: Text("戻る")),
                Text("error: $_message"),
                Text("traceback: $_traceback"),
              ],
            ),
          ),
        ));
  }
}

// 動作確認用コード
void main() {
  runApp(MaterialApp(
    home: ErrorPage(
      error: TypeError(),
    ),
  ));
}
