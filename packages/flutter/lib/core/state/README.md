# ValidationMixin

## 概要
`ValidationMixin`は、`BaseStateObject`と組み合わせて使用するバリデーション機能を提供するmixinです。
例外ベースの自動エラーハンドリングにより、シンプルで読みやすいバリデーションコードが書けます。

## 提供機能

### 1. 必須入力チェック
```dart
void validateRequired(dynamic value, String message)
```
- `null`値や空文字列、空白のみの文字列をチェック
- エラー時: `ValidationException`をthrow

### 2. 文字数制限チェック（最小）
```dart
void validateMinLength(String? value, int minLength, String message)
```
- 指定した最小文字数以上かチェック
- エラー時: `ValidationException`をthrow

### 3. 文字数制限チェック（最大）
```dart
void validateMaxLength(String? value, int maxLength, String message)
```
- 指定した最大文字数以下かチェック
- エラー時: `ValidationException`をthrow

### 4. 正の整数チェック
```dart
void validatePositiveInteger(dynamic value, String message)
```
- 1以上の整数かチェック（文字列からの変換も対応）
- エラー時: `ValidationException`をthrow

### 5. 数値範囲チェック
```dart
void validateNumberRange(dynamic value, num min, num max, String message)
```
- 指定した範囲内の数値かチェック（文字列からの変換も対応）
- エラー時: `ValidationException`をthrow

## 使用方法

### 基本的な使い方

1. `BaseStateObject`を継承したクラスを作成
2. `validate()`メソッド内で各バリデーションメソッドを呼び出し
3. エラーハンドリングは自動で行われるため、`if`文での戻り値チェックは不要

```dart
class UserNameState extends BaseStateObject<String> {
  UserNameState(super.value);

  @override
  void validate() {
    // 必須チェック
    validateRequired(value, 'ユーザー名は必須です');
    
    // 文字数チェック（2文字以上20文字以下）
    validateMinLength(value, 2, 'ユーザー名は2文字以上で入力してください');
    validateMaxLength(value, 20, 'ユーザー名は20文字以下で入力してください');
  }
}
```

### 従来の方式との比較

**従来の方式（面倒）：**
```dart
@override
ErrorMessage? validate() {
  final requiredError = validateRequired(value, 'エラーメッセージ');
  if (requiredError != null) return requiredError;
  
  final minLengthError = validateMinLength(value, 2, 'エラーメッセージ');
  if (minLengthError != null) return minLengthError;
  
  return null;
}
```

**新しい方式（シンプル）：**
```dart
@override
void validate() {
  validateRequired(value, 'エラーメッセージ');
  validateMinLength(value, 2, 'エラーメッセージ');
}
```

### 使用例

```dart
// ユーザー名のバリデーション
final userNameState = UserNameState('太郎');
if (userNameState.isValid) {
  print('有効なユーザー名です');
} else {
  print('エラー: ${userNameState.errorMessage!.value}');
}

// 年齢のバリデーション
final ageState = AgeState(25);
if (ageState.isValid) {
  print('有効な年齢です');
} else {
  print('エラー: ${ageState.errorMessage!.value}');
}
```

## 技術詳細

### ValidationException
`ValidationException`は`ValidationMixin`内で定義された例外クラスです。
`BaseStateObject`のコンストラクタ内でtry-catchによりキャッチされ、自動的に`errorMessage`プロパティに設定されます。

### 自動エラーハンドリングの仕組み
1. `BaseStateObject`のコンストラクタで`validate()`メソッドを呼び出し
2. `validate()`内でバリデーションエラーが発生すると`ValidationException`がthrow
3. コンストラクタ内のtry-catchでキャッチし、`errorMessage`に設定
4. エラーがない場合は`errorMessage`に`null`を設定

## ファイル構成

- `lib/core/state/validation_mixin.dart` - ValidationMixinの実装
- `lib/core/state/validation_example.dart` - 使用例
- `test/core/state/validation_mixin_test.dart` - ValidationMixinのテスト
- `test/core/state/validation_example_test.dart` - 使用例のテスト

## テスト

```bash
# ValidationMixinのテストを実行
flutter test test/core/state/validation_mixin_test.dart

# 使用例のテストを実行
flutter test test/core/state/validation_example_test.dart
```

## 注意事項

- 各バリデーションメソッドは最初のエラーで例外をthrowします
- 複数のバリデーションを組み合わせる場合は、順序を考慮して実装してください
- `null`値の扱いはメソッドによって異なりますので、各メソッドの仕様を確認してください
