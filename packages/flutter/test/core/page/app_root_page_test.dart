import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:allowance_questboard/core/page/app_root_page/app_root_page.dart';
import 'package:allowance_questboard/core/page/loading_page/loading_page.dart';

void main() {
  group('AppRootPage', () {
    group('build', () {
      testWidgets('初期状態ではロード画面が表示されること', (WidgetTester tester) async {
        // 準備
        await tester.pumpWidget(
          ProviderScope(
            child: MaterialApp(
              home: AppRootPage(),
            ),
          ),
        );

        // 検証
        expect(find.byType(LoadingPage), findsOneWidget);
        expect(find.text('マスタデータを読み込み中...'), findsOneWidget);
      });
    });

    group('AppInitStateNotifier', () {
      test('初期状態はloading状態であること', () {
        // 準備
        final notifier = AppInitStateNotifier();

        // 検証
        expect(notifier.state, equals(AppInitState.loading));
      });

      test('retry呼び出し時はloading状態に戻ること', () {
        // 準備
        final notifier = AppInitStateNotifier();

        // 実行
        notifier.retry();

        // 検証
        expect(notifier.state, equals(AppInitState.loading));
      });
    });
  });
}
