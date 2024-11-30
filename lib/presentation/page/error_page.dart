import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ErrorPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("エラー"),
        ),
        body: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [Text("存在しないページです"), TextButton(onPressed: () => Navigator.of(context).pop(), child: Text("戻る"))],
          ),
        ));
  }
}
