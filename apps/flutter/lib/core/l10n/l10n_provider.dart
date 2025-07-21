import 'package:allowance_questboard/core/l10n/app_localizations.dart';
import 'package:flutter/material.dart';

class L10nProvider {
  late AppLocalizations _l10n;

  /// 多言語化の更新
  /// - アプリ起動時
  /// - 言語設定を変更したとき
  /// - システムの言語設定が変更されたとき
  void update(BuildContext context) {
    _l10n = AppLocalizations.of(context)!;
  }
  AppLocalizations get I => _l10n;
}

final l10n = L10nProvider();
