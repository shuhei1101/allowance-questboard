import 'package:flutter/material.dart';

class AppThemes {
  static final ThemeData commonTheme = ThemeData(
      colorScheme: const ColorScheme.light(
        primary: Color.fromARGB(255, 33, 243, 58),
        secondary: Colors.green,
      ),
      textTheme: TextTheme());

  static final ThemeData questTheme = ThemeData(
      colorScheme: const ColorScheme.light(
          primary: Color.fromARGB(255, 13, 105, 226),
          secondary: Colors.amber,
          primaryContainer: Colors.amber,
          surface: Color.fromARGB(255, 255, 255, 255),
          error: Colors.amber,
          brightness: Brightness.light),
      textTheme: TextTheme(bodyLarge: TextStyle(color: Colors.teal.shade900), bodySmall: TextStyle(color: Colors.blue.shade500)),
      appBarTheme: AppBarTheme(
        color: Colors.lightGreenAccent,
      ));
}
