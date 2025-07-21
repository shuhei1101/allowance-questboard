import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart' show HookConsumerWidget, WidgetRef;
import 'package:allowance_questboard/core/widget/ui_helper_mixin.dart' show UiHelperMixin;

abstract class BasePage extends HookConsumerWidget with UiHelperMixin {
  const BasePage({super.key});

  /// AppBarの構築
  PreferredSizeWidget? buildAppBar(BuildContext context, WidgetRef ref);
  /// ボディ部分の構築
  Widget buildBody(BuildContext context, WidgetRef ref);
  /// BottomNavigationBarの構築（オプション）
  Widget? buildBottomNavigationBar(BuildContext context, WidgetRef ref) => null;
  /// FloatingActionButtonの構築（オプション）
  Widget? buildFloatingActionButton(BuildContext context, WidgetRef ref) => null;
  /// Drawerの構築（オプション）
  Widget? buildDrawer(BuildContext context, WidgetRef ref) => null;
  /// 背景色の指定（オプション）
  Color? get backgroundColor => null;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 共通ビルド処理
    return Scaffold(
      appBar: buildAppBar(context, ref),
      body: buildBody(context, ref),
      bottomNavigationBar: buildBottomNavigationBar(context, ref),
      floatingActionButton: buildFloatingActionButton(context, ref),
      drawer: buildDrawer(context, ref),
      backgroundColor: backgroundColor,
    );
  }
}
