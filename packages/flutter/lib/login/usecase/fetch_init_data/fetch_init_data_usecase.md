# アプリ初期化時のマスタデータ取得ユースケース

## 概要
アプリ初期化時にAPIからマスタデータを取得し、LanguageTypeを更新するユースケースです。

## ファイル構成
- `fetch_init_data_usecase.dart` - メインのユースケースクラス
- `fetch_init_data_usecase_command.dart` - ユースケースのコマンドクラス
- `fetch_init_data_usecase_result.dart` - ユースケースの結果クラス

## 使用方法

```dart
// APIクライアントを用意
final initApi = InitApi();

// コマンドを作成
final command = FetchInitDataUsecaseCommand(initApi: initApi);

// ユースケースを実行
final usecase = FetchInitDataUsecase();
final result = await usecase.execute(command);

if (result.isSuccess) {
  // 成功時の処理
  print('マスタデータの取得が完了しました');
} else {
  // エラー時の処理
  print('エラー: ${result.errorMessage}');
}
```

## 処理フロー
1. InitAPIを実行してマスタデータを取得
2. LanguageType.updateFromLanguageDtoListを呼び出してenumを更新
3. 結果を返す

## テスト
`test/login/usecase/fetch_init_data/fetch_init_data_usecase_test.dart` にテストを配置。

実行方法:
```bash
flutter test test/login/usecase/fetch_init_data/fetch_init_data_usecase_test.dart
```
