import 'package:allowance_questboard/generated/l10n.dart';
import 'package:flutter/material.dart';

class L10nProvider {
  L10nProvider._();
  static final L10nProvider _instance = L10nProvider._();

  late S _l10n;

  static void update(BuildContext context) {
    _instance._l10n = S.of(context);
  }

  static S get I => _instance._l10n;
}
