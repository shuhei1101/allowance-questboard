[indexへ戻る](../index.md)
# 🔍 ユースケース

## 概要
- ユースケースクラスはAPサーバの画面が使用するビジネスロジックのファサードクラス
  - ビジネスロジッククラスの例:
    - [リポジトリクラス](リポジトリクラス_repository.md)
    - [クエリサービスクラス](クエリサービス-queryservice.md)

## オブジェクト図
```mermaid
classDiagram
    class XxxUsecase {
        +execute(cmd: XxxUsecaseCommand): XxxUsecaseResult
    }
    class XxxUsecaseCommand {
      xxx_repo: XxxRepository
      xxx_query_service: XxxQueryService
    }
    class XxxUsecaseResult

    XxxPage --> XxxUsecase : executeメソッドを実行
    XxxUsecase --> XxxUsecaseCommand : 引数
    XxxUsecase --> XxxUsecaseResult : 戻り値

    XxxUsecase --> XxxRepository: 情報取得: 
    XxxUsecase --> XxxQueryService: 情報取得
    XxxUsecase --> ドメインモデル: ビジネスロジック
```

## `XxxUsecase`クラス
### 概要
- `usecase`クラスは一つのメソッドに対して一つのクラスとする
- 公開メソッドは`execute`のみとする
- `execute`メソッドは、引数に`XxxUsecaseCommand`を受け取り、戻り値に`XxxUsecaseResult`を返す
- 画面は`XxxUsecase`からのみ状態の更新やビジネスロジックを行うこと

### 配置場所
- `{関心事名}/usecase/{xxx}/xxx_usecase.py`
  - 例: `quest/usecase/get_quest/get_quest_usecase.py`
- ユースケースごとに一つのフォルダを作成し、中に以下を配置すること
  - `xxx_usecase.py`
  - `xxx_usecase_command.py`
  - `xxx_usecase_result.py`
  - `xxx_usecase.md` (クラス図)

### 命名規則
- `XxxUsecase`の形式で命名すること
- `Xxx`は動詞を使用すること
  - 例: `UpdateQuestsUsecase`, `LoginUsecase`

- `Command`クラスのインスタンス名は`cmd`とすること
  - 例: `cmd: UpdateQuestsUsecaseCommand`

## `XxxUsecaseCommand`クラス
### 概要
- `XxxUsecase`の引数を定義するクラス
- DIコンテナは使用しないため、以下クラスはCommandクラス経由で依存性注入を行う
  - `Repository`
  - `QueryService`

### 配置場所
- `XxxUsecase`と同じファイルに配置すること

### 命名規則
- `{ユースケースクラス名}Command`の形式で命名すること
  - 例: `UpdateQuestsUsecaseCommand`, `LoginUsecaseCommand`

- メンバの命名は以下のようにすること
  - `xxx_repo`: リポジトリクラス
  - `xxx_query_service`: クエリサービスクラス

## `XxxUsecaseResult`クラス
### 概要
- `XxxUsecase`の戻り値を定義するクラス

### 配置場所
- `XxxUsecase`と同じファイルに配置すること

### 命名規則
- `{ユースケースクラス名}Result`の形式で命名すること
  - 例: `UpdateQuestsUsecaseResult`, `LoginUsecaseResult` 
