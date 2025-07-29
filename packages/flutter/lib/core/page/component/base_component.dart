import 'package:allowance_questboard/core/page/base_widget.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

abstract class BaseComponent extends BaseWidget {
  const BaseComponent({super.key});

  /// コンポーネントのレンダリングを実装するメソッド
  @override
  Widget render(BuildContext context, WidgetRef ref) {
    // コンポーネント共通ビルド処理
    return buildComponent(context, ref);
  }

  /// コンポーネントの具体的なビルド処理を実装するメソッド
  Widget buildComponent(BuildContext context, WidgetRef ref);
}
