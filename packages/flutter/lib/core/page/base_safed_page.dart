import 'package:allowance_questboard/core/l10n/l10n_provider.dart' show l10n;
import 'package:allowance_questboard/core/logger/app_logger.dart' show logger;
import 'package:allowance_questboard/core/page/base_page.dart' show BasePage;
import 'package:allowance_questboard/core/page/error_page/error_page.dart' show ErrorPage;
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart' show useMemoized;
import 'package:hooks_riverpod/hooks_riverpod.dart' show WidgetRef;

/// エラー処理を含むPageの基底クラス
abstract class BaseSafedPage extends BasePage {
  const BaseSafedPage({super.key});


  /// AppBarの構築
  PreferredSizeWidget? buildSafedAppBar(BuildContext context, WidgetRef ref);
  /// ボディ部分の構築
  Widget buildSafedBody(BuildContext context, WidgetRef ref);
  /// BottomNavigationBarの構築（オプション）
  Widget? buildSafedBottomNavigationBar(BuildContext context, WidgetRef ref) => null;  
  /// FloatingActionButtonの構築（オプション）
  Widget? buildSafedFloatingActionButton(BuildContext context, WidgetRef ref) => null;  
  /// Drawerの構築（オプション）
  Widget? buildSafedDrawer(BuildContext context, WidgetRef ref) => null;  
  
  @override
  PreferredSizeWidget? buildAppBar(BuildContext context, WidgetRef ref) {
    try {
      return buildSafedAppBar(context, ref);
    } catch (error) {
      logger.e('AppBarの構築中にエラー: $error');
      return AppBar(title: const Text('エラー'));
    }
  }

  @override
  Widget buildBody(BuildContext context, WidgetRef ref) {
    useMemoized(() => l10n.update(context));
    
    try {
      return buildSafedBody(context, ref);
    } catch (error) {
      // Bodyでエラーが発生した場合はエラーページを表示
      return ErrorPage(
        message: 'ページの読み込み中にエラーが発生しました',
      );
    }
  }

  @override
  Widget? buildBottomNavigationBar(BuildContext context, WidgetRef ref) {
    try {
      return buildSafedBottomNavigationBar(context, ref);
    } catch (error) {
      return null;
    }
  }
  
  @override
  Widget? buildFloatingActionButton(BuildContext context, WidgetRef ref) {
    try {
      return buildSafedFloatingActionButton(context, ref);
    } catch (error) {
      return null;
    }
  }

  @override
  Widget? buildDrawer(BuildContext context, WidgetRef ref) {
    try {
      return buildSafedDrawer(context, ref);
    } catch (error) {
      return null;
    }
  }
}
