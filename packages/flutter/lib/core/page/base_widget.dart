import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

abstract class BaseWidget extends HookConsumerWidget {
  const BaseWidget({super.key});



  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 共通処理
    return render(context, ref);
  }

  /// コンポーネントのレンダリングを実装するメソッド
  Widget render(BuildContext context, WidgetRef ref);
}
