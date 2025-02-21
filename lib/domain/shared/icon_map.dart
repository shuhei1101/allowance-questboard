import 'package:flutter/material.dart';

/// アイコンとコードポイントのマップクラス
class IconMap {
  IconMap(this.map) {
    // バリデーション
    map.forEach((key, value) {
      if (value < 0 || value > 0x10FFFF) {
        throw ArgumentError.value(value, 'codepoint', 'Invalid codepoint');
      }
    });
  }
  final Map<String, int> map;

  /// 指定した[name]に対応するアイコンを取得する
  Icon? toIcon(String name) {
    Icon? icon;
    int codepoint = map[name]!;
    icon = Icon(IconData(codepoint));
    return icon;
  }
}
