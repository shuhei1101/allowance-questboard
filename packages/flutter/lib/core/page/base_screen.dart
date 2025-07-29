import 'package:allowance_questboard/core/page/base_widget.dart';
import 'package:allowance_questboard/core/page/ui_helper_mixin.dart' show UiHelperMixin;
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

abstract class BaseScreen extends BaseWidget with UiHelperMixin {
  const BaseScreen({super.key});

  /// コンポーネントのレンダリングを実装するメソッド
  @override
  Widget render(BuildContext context, WidgetRef ref) {
    // スクリーン共通ビルド処理
    return buildScreen(context, ref);
  }

  /// スクリーンの具体的なビルド処理を実装するメソッド
  Widget buildScreen(BuildContext context, WidgetRef ref);
}
