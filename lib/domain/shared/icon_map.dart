import 'package:flutter/material.dart';

class IconMap {
  final Map<String, int> map;
  IconMap(this.map);

  Icon? toIcon(String name) {
    Icon? icon;
    try {
      int codepoint = map[name]!;
      icon = Icon(IconData(codepoint));
    } on Exception catch (_) {}
    return icon;
  }
}
