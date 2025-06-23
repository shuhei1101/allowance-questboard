import 'package:allowance_questboard/login/page/login_page.dart';
import 'package:allowance_questboard/presentation/shared/theme/app_themes.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'allowance-questboard',
      theme: AppThemes.commonTheme,
      darkTheme: ThemeData(),
      home: const Loginpage(),
    );
  }
}
