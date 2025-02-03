import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ErrorPage extends StatelessWidget {
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

void main() {
  runApp(MaterialApp(
    home: ErrorPage(
      error: TypeError(),
    ),
  ));
}
