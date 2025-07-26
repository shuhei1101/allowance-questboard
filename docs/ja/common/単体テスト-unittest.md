# 🧪 テスト

## 共通
### 命名規則
- メソッド名は日本語で記述し、最後は‘〜すること‘で終わるようにすること

- テストファイル内のコメントは最小限にする
  - クラス名やメソッド名で目的が伝わるため、docstringは不要
  - 複雑な処理の説明が必要な場合のみ記述すること
  - 極力テストはクリーンでシンプルに仕上げること

- テストメソッド内のコメントは日本語で以下のようにする
  ```python
  # 準備
  ...
  # 実行
  ...
  # 検証
  ...
  ```

### テストケースの確認観点
- テストケースの作成観点
	- カバレッジが80％を超えるように作成する
	- 境界値テストはしなくて良い
	- 使用者側のユースケースで記載し、楽観的に最小限のテストを書く

## /apps/flutter
### テストフレームワーク
- テストフレームワークは`flutter_test`を使用する

### 配置場所
- テストコードは`test/`ディレクトリに配置する

- testファイルはaqapiと同じ構造の対象ファイルの場所をtest配下に作成し、そこに配置すること
  - 例: `lib/core/l10n/l10n_provider.dart`→`test/core/l10n/l10n_provider_test.dart`

### 命名規則
- テストファイル名は`*_test.dart`とする

### コーディング規約
- テストファイル内のグルーピングは`group`を用いて必ず２階層にする
  - 1階層目: `group('対象クラス名')`
    - 例: `group('LoginUsecase')`
  - 2階層目: `group('対象メソッド名')`
    - 例: `group('execute')`
  - 2階層に配置するテストメソッドは`test('テスト内容')`とする
    - テスト内容は日本語で記述し、最後は‘〜すること‘で終わるようにする
    - 例: `test('ログインできること')`
  - 例:
```dart
// login_usecase.dart

class LoginUsecase {
  Future<void> execute(String userId, String password) {
    // ログイン処理
  }
}

// login_usecase_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:allowance_questboard/core/usecase/login_usecase.dart';

void main() {
  group('LoginUsecase', () {
    group('execute', () {
      test('ログインできること', () async {
        ...
      });
      test('ユーザーIDが空の場合はエラーになること', () async {
        ...
      });
    });
  // 他のメソッドも同様にテストを追加
  });
}
```

### テストの実行方法
- `flutter test`コマンドを使用してテストを実行する

## /apps/api
### テストフレームワーク
- テストフレームワークは`pytest`を使用する

### 配置場所
- テストコードは`tests/`ディレクトリに配置する

- testファイルはaqapiと同じ構造の対象ファイルの場所をtests配下に作成し、そこに配置すること
  - 例: `aqapi/core/di_container.py`→`tests/core/di_container.py`

### 命名規則
- テストファイル名は`test_*.py`とする

### コーディング規約
- テストファイル内のグルーピングはclassを用いて必ず２階層にする
  - 1階層目: `Test{対象クラス名}`
		- ‘class TestQuestRepository‘
  - 2階層目: `Test_{対象メソッド名}`
		- 例: ‘class Test_find_all‘ <- メソッド名はキャメルケースのまま。アンダーバー区切り。
  - 2階層に配置するテストメソッドは`test_{テスト内容}`とする
    - テスト内容は日本語で記述し、最後は‘〜すること‘で終わるようにする
    - 例: `test_クエストを取得できること`, `test_クエストを達成できること`
  - 例:
```python
class QuestRepository:
    def find_all(self):
        ...
    def find_by_id(self, quest_id):
        ...

class TestQuestRepository:
    class Test_find_all:
        def test_クエストを全件取得できること(self):
            ...
        def test_クエストが存在しない場合は空リストを返すこと(self):
            ...
    class Test_find_by_id:
        def test_クエストをIDで取得できること(self):
          ...
```

- 共通な初期化処理やオブジェクトについて
	- fixtureなどを活用する

- 外部通信があるモジュールでDIされていないモジュールについて
  - `patch`や`patch.object`を使用してモック化する
  - なお、可能であれば`patch.object`を使用し型ヒントを明示すること
  - RedisClientやDAOなど

### テストの実行方法
- `api`ディレクトリで`venv`を起動してからpytestを実行すること
```bash
source venv/bin/activate  # venvの起動
pip freeze  # pytestがインストールされていることを確認
```
