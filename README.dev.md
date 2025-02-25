# はじめに
本READMEは開発者向けのよく使うコマンドや備忘録の保存用に使用します。

# 開発用コンテナの起動


# コンソールコマンド
### デバッグなしで実行（dockerコンテナ内）
```bash
Flutter run -d web-server --target=lib/app.dart --web-port=8080 --web-hostname=0.0.0.0
```
- --target: 実行対象のファイルを指定する。
- デフォルト設定は「lib/app.dart」。

### デバッグありで実行（dockerコンテナ内）
main関数の上のRun/Debugを押す。

### テストの実行（flutter依存）
```bash
flutter test xxx_test.dart
```
- パッケージ「flutter_test」のインポートが必要。

### テストの実行（dartのみ）
```bash
dart test xxx_test.dart
```
- パッケージ「test」のインポートが必要。
- 軽量
- フォルダ名を指定すると、フォルダ内の<*_test.dart>を全て実行する。

### 依存関係の取得
```bash
flutter pub get
```
### 依存関係の更新
```bash
flutter pub upgrade
```

### キャッシュの削除
```bash
flutter clean
```

### flutterのバージョン確認
```bash
flutter --version
```

### flutterの診断
```bash
flutter doctor
```

### build_runnerの実行
```bash
flutter pub run build_runner build
dart pub run build_runner build
```
- ライブラリ「go_router」のルーティングコード自動生成
- ライブラリ「freezed」のモデルコード自動生成
- 実行後、dartファイル「xxx.g.dart」が生成される。
- 1:delete, 2:Cancel build, 3: List conflictsの選択が表示される場合、基本的には1を選択する。

# 設定ファイル
### `const`や`final`のanalysisを無効にする
- `analysis_options.yaml`ファイルを作成し、以下のコードを記述する。
```yaml
analyzer:
  errors:
    prefer_const_constructors: ignore
    prefer_final_fields: ignore
    use_key_in_widget_constructors: ignore
```

# vscodeショートカット
### 呼び出し元の表示
- Mac: Option + Shift + F12
- Windows: Ctrl + Shift + F12

### シンボル検索
- Mac: Command + T
- Windows: Ctrl + T

### ファイル検索
- Mac: Command + P
- Windows: Ctrl + P

# アノテーションコメント
- TODO:	あとで追加、修正するべき機能がある。
- FIXME:	既知の不具合があるコード。修正が必要。
- HACK:	あまりきれいじゃないコード。リファクタリングが必要。
- XXX:	危険！動くけどなぜうごくかわからない。
- REVIEW:	意図した通りに動くか、見直す必要がある。
- OPTIMIZE:	無駄が多く、ボトルネックになっている。
- CHANGED:	コードをどのように変更したか。
- NOTE:	なぜ、こうなったという情報を残す。
- WARNING:	注意が必要。

# ドキュメンテーションルール
- Widgetの説明は、コンストラクタの上に記述する。
  - 通常インスタンスを生成して使用しないため。
- バックエンドのクラスの説明は、クラスの上に記述する。


# 単体テストの書き方
### モックの振る舞い変更
```dart
// モックの振る舞いを変更
when(mock.method()).thenReturn(value);
// FormatExceptionをスロー
when(mock.someMethod(any)).thenThrow(FormatException('Invalid format')); 
```

### 例外検知
```dart
expect(
  () => throw SocketException('Network error'),
  throwsA(isA<SocketException>()),
);
``` 