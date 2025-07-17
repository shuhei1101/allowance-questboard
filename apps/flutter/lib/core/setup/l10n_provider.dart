import 'package:allowance_questboard/core/l10n/app_localizations.dart';
import 'package:flutter/material.dart';

class L10nProvider {
  L10nProvider._();
  static final L10nProvider _instance = L10nProvider._();

  late AppLocalizations _l10n;

  static void update(BuildContext context) {
    _instance._l10n = AppLocalizations.of(context)!;
  }

  static AppLocalizations get I => _instance._l10n;
}
