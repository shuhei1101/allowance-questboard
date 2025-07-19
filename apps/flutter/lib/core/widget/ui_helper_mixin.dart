import 'package:flutter/material.dart';

/// よく使用するUIコンポーネントを簡単に呼び出すためのmixin
/// 
/// 主にSnackBar、Dialog、Indicator系のコンポーネントを
/// 短いメソッド名で呼び出せるようにする
/// 
/// 使用例:
/// ```dart
/// class MyPage extends StatelessWidget with UiHelperMixin {
///   @override
///   Widget build(BuildContext context) {
///     return ElevatedButton(
///       onPressed: () => snackBar(context, 'メッセージ'),
///       child: Text('SnackBar表示'),
///     );
///   }
/// }
/// ```
mixin UiHelperMixin {
  /// SnackBarを表示
  ///
  /// [context] BuildContext
  /// [message] 表示するメッセージ
  /// [isError] エラー系の表示かどうか（背景色が変わる）
  /// [duration] 表示時間（デフォルト4秒）
  void snackBar(
    BuildContext context,
    String message, {
    bool isError = false,
    Duration duration = const Duration(seconds: 4),
  }) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.red : null,
        duration: duration,
      ),
    );
  }

  /// 成功メッセージのSnackBar
  ///
  /// [context] BuildContext
  /// [message] 表示するメッセージ
  void successSnackBar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.green,
        duration: const Duration(seconds: 3),
      ),
    );
  }

  /// エラーメッセージのSnackBar
  ///
  /// [context] BuildContext
  /// [message] 表示するメッセージ
  void errorSnackBar(BuildContext context, String message) {
    snackBar(context, message, isError: true);
  }

  /// 確認ダイアログを表示
  ///
  /// [context] BuildContext
  /// [title] ダイアログのタイトル
  /// [content] ダイアログの内容
  /// [onConfirm] 確認ボタンを押した時の処理
  /// [confirmText] 確認ボタンのテキスト（デフォルト「OK」）
  /// [cancelText] キャンセルボタンのテキスト（デフォルト「キャンセル」）
  Future<bool?> confirmDialog(
    BuildContext context, {
    required String title,
    required String content,
    VoidCallback? onConfirm,
    String confirmText = 'OK',
    String cancelText = 'キャンセル',
  }) {
    return showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text(cancelText),
          ),
          TextButton(
            onPressed: () {
              onConfirm?.call();
              Navigator.of(context).pop(true);
            },
            child: Text(confirmText),
          ),
        ],
      ),
    );
  }

  /// シンプルなアラートダイアログ
  ///
  /// [context] BuildContext
  /// [title] ダイアログのタイトル
  /// [content] ダイアログの内容
  /// [buttonText] ボタンのテキスト（デフォルト「OK」）
  Future<void> alertDialog(
    BuildContext context, {
    required String title,
    required String content,
    String buttonText = 'OK',
  }) {
    return showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(buttonText),
          ),
        ],
      ),
    );
  }

  /// ローディングダイアログを表示
  ///
  /// [context] BuildContext
  /// [message] ローディング中のメッセージ（オプション）
  void showLoadingDialog(BuildContext context, {String? message}) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CircularProgressIndicator(),
            if (message != null) ...[
              const SizedBox(height: 16),
              Text(message),
            ],
          ],
        ),
      ),
    );
  }

  /// ローディングダイアログを閉じる
  ///
  /// [context] BuildContext
  void hideLoadingDialog(BuildContext context) {
    Navigator.of(context).pop();
  }

  /// CircularProgressIndicatorのWidget
  ///
  /// [size] インジケーターのサイズ（デフォルト24.0）
  /// [color] インジケーターの色
  Widget loadingIndicator({double size = 24.0, Color? color}) {
    return SizedBox(
      width: size,
      height: size,
      child: CircularProgressIndicator(
        strokeWidth: 2.0,
        valueColor: color != null ? AlwaysStoppedAnimation<Color>(color) : null,
      ),
    );
  }

  /// 中央に配置されたローディングWidget
  ///
  /// [message] ローディング中のメッセージ（オプション）
  Widget centerLoading({String? message}) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const CircularProgressIndicator(),
          if (message != null) ...[
            const SizedBox(height: 16),
            Text(message),
          ],
        ],
      ),
    );
  }

  /// エラー状態のWidget
  ///
  /// [message] エラーメッセージ
  /// [onRetry] リトライボタンを押した時の処理
  /// [retryText] リトライボタンのテキスト（デフォルト「再試行」）
  Widget errorWidget({
    required String message,
    VoidCallback? onRetry,
    String retryText = '再試行',
  }) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.error_outline,
            size: 64,
            color: Colors.red,
          ),
          const SizedBox(height: 16),
          Text(
            message,
            style: const TextStyle(fontSize: 16),
            textAlign: TextAlign.center,
          ),
          if (onRetry != null) ...[
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: onRetry,
              child: Text(retryText),
            ),
          ],
        ],
      ),
    );
  }

  /// 空状態のWidget
  ///
  /// [message] 空状態のメッセージ
  /// [icon] アイコン（デフォルトはinbox）
  Widget emptyWidget({
    required String message,
    IconData icon = Icons.inbox,
  }) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 64,
            color: Colors.grey,
          ),
          const SizedBox(height: 16),
          Text(
            message,
            style: const TextStyle(
              fontSize: 16,
              color: Colors.grey,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
