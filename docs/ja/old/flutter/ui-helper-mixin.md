# 🎨 UIヘルパーmixin

## 概要
`UiHelperMixin`は、Flutterアプリケーションでよく使用するUIコンポーネントを簡単に呼び出すためのmixinです。
SnackBar、Dialog、Indicator系のコンポーネントを短いメソッド名で統一的に呼び出せます。

## 場所
`lib/core/widget/ui_helper_mixin.dart`

## 使用方法

### 1. mixinをクラスに追加
```dart
class MyPage extends StatelessWidget with UiHelperMixin {
  // ...
}
```

### 2. 各メソッドの使用例

#### SnackBar系

```dart
// 基本のSnackBar
snackBar(context, 'メッセージを表示');

// 成功メッセージ
successSnackBar(context, '保存が完了しました');

// エラーメッセージ
errorSnackBar(context, 'エラーが発生しました');

// カスタムオプション付き
snackBar(
  context, 
  'カスタムメッセージ',
  isError: true,
  duration: Duration(seconds: 5),
);
```

#### ダイアログ系

```dart
// 確認ダイアログ
await confirmDialog(
  context,
  title: '削除確認',
  content: '本当に削除しますか？',
  onConfirm: () {
    // 削除処理
  },
);

// シンプルなアラート
await alertDialog(
  context,
  title: 'お知らせ',
  content: '処理が完了しました',
);

// ローディングダイアログ
showLoadingDialog(context, message: '処理中...');
// 処理完了後
hideLoadingDialog(context);
```

#### Widget系

```dart
// ローディングインジケーター
Widget build(BuildContext context) {
  return Column(
    children: [
      loadingIndicator(size: 32.0),
      // または
      centerLoading(message: '読み込み中...'),
    ],
  );
}

// エラー表示
errorWidget(
  message: 'データの取得に失敗しました',
  onRetry: () {
    // リトライ処理
  },
);

// 空状態
emptyWidget(
  message: 'データがありません',
  icon: Icons.search_off,
);
```

## メソッド一覧

### SnackBar系
- `snackBar()` - 基本のSnackBar表示
- `successSnackBar()` - 成功メッセージ（緑背景）
- `errorSnackBar()` - エラーメッセージ（赤背景）

### ダイアログ系
- `confirmDialog()` - 確認ダイアログ（OK/キャンセル）
- `alertDialog()` - シンプルなアラートダイアログ
- `showLoadingDialog()` - ローディングダイアログ表示
- `hideLoadingDialog()` - ローディングダイアログ非表示

### Widget系
- `loadingIndicator()` - CircularProgressIndicatorのWidget
- `centerLoading()` - 中央配置のローディングWidget
- `errorWidget()` - エラー状態のWidget
- `emptyWidget()` - 空状態のWidget

## 使用前後のコード比較

### 使用前
```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('ログイン成功'),
    backgroundColor: Colors.green,
    duration: Duration(seconds: 3),
  ),
);
```

### 使用後
```dart
successSnackBar(context, 'ログイン成功');
```

## 注意事項
- このmixinを使用する際は、必ず`import 'package:allowance_questboard/core/widget/ui_helper_mixin.dart';`をインポートしてください
- `BuildContext`が必要なメソッドは、Widgetクラス内で使用してください
- ローディングダイアログは`showLoadingDialog()`と`hideLoadingDialog()`をペアで使用してください

## カスタマイズ
プロジェクト固有のデザインに合わせて、各メソッドの色やスタイルを調整できます。
`ui_helper_mixin.dart`ファイルを編集してください。
