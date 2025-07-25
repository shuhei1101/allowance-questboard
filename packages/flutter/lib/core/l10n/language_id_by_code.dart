import 'package:flutter/material.dart';
import 'package:allowance_questboard/core/l10n/language_id.dart';

/// 言語コードから言語IDを変換するクラス
/// 
/// Contextから取得した言語文字列をキーとして、
/// 対応するLanguageIdを取得します。
class LanguageIdByCode {
  /// 言語コードマップ（言語コード -> LanguageId）
  final Map<String, LanguageId> _languageIdMap = {
    'ja': LanguageId(1),
    'en': LanguageId(2),
  };

  /// ContextからLanguageIdを取得
  /// 
  /// [context] Flutterのコンテキスト
  /// Returns: 対応するLanguageId、見つからない場合は日本語をデフォルト返却
  LanguageId getLanguageIdFromContext(BuildContext context) {
    final locale = Localizations.localeOf(context);
    final languageCode = locale.languageCode;
    
    return _languageIdMap[languageCode] ?? LanguageId(1);
  }

  /// 言語コードからLanguageIdを取得
  /// 
  /// [languageCode] 言語コード（例: 'ja', 'en'）
  /// Returns: 対応するLanguageId、見つからない場合は日本語をデフォルト返却
  LanguageId getLanguageIdFromCode(String languageCode) {
    return _languageIdMap[languageCode] ?? LanguageId(1);
  }

  /// サポートされている言語コードのリストを取得
  /// 
  /// Returns: サポートされている言語コードのリスト
  List<String> getSupportedLanguageCodes() {
    return _languageIdMap.keys.toList();
  }

  /// 指定された言語コードがサポートされているかチェック
  /// 
  /// [languageCode] 言語コード
  /// Returns: サポートされている場合はtrue
  bool isSupported(String languageCode) {
    return _languageIdMap.containsKey(languageCode);
  }
}
