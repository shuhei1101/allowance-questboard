import 'package:allowance_questboard/core/l10n/app_localizations.dart';
import 'package:allowance_questboard/core/setup/setup.dart';
import 'package:allowance_questboard/login/page/login_page/login_page.dart';
import 'package:allowance_questboard/core/theme/app_themes.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await setup();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ProviderScope(
      child: MaterialApp(
        title: 'allowance-questboard',
        theme: AppThemes.commonTheme,
        darkTheme: ThemeData(),
        localizationsDelegates: const [
          AppLocalizations.delegate,
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate,
        ],
        supportedLocales: AppLocalizations.supportedLocales,
        home: LoginPage(),
      ),
    );
  }
}
