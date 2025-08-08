# 開発者向け共通Wikiトップページ

## 1. 実装する前に
- 何を実装するにしても、まずは**設計書を確認**すること
  - どれを参考にする予定か、実装前に必ず教えてください
- 設計書を確認して、「さぁ実装」とする前に**一度似たような実装を確認**すること
- コーディング規約を確認すること
  - [コーディング規約](common/コーディング規約.md)
- フォルダ構成や書き方がドキュメントと異なる場合は、修正するかユーザに確認すること

- 実装後は以下を行うこと
  - [単体テストの実施](common/単体テスト.md)
  - 関連する設計書を更新

## 3. 今から何をする？
### フロントエンド
- [ページを作成する](./flutter/ページ-page.md)
- [状態管理を行う](./flutter/状態管理-state.md)
- [APIクライアントを作成する](./flutter/APIクライアント-apiclient.md)
- [ユースケースを作成する](./flutter/ユースケース-usecase.md)
- [多言語化する](./flutter/多言語対応-l10n.md)
- [ログを出力する](./flutter/ロガー-logger.md)
- [例外情報を解析、整形する](./flutter/例外解析-eparser.md)

### バックエンド
- [環境構築を行う](./api/環境構築.md)
- [APIサーバでPythonをテスト実行する](./api/環境構築.md)
- [APIのエンドポイント(route.py)を作成する](./api/エンドポイント-endpoint.md)
- [APIのユースケースを作成する](api/ユースケース_バックエンド-usecase.md)
- [QueryServiceを作成する](./api/クエリサービス-queryservice.md)
- [ページネーションを実装する](./api/ページネーション-pagination.md)
- [ドメインモデルを作成する](./api/ドメインモデル-domain_model.md)
- [ドメインEnumを作成する](./api/ドメインEnum-domain_enum.md)
- [リポジトリクラスを作成する](./api/リポジトリクラス_repository.md)
- [DAOを作成する](./api/DAO.md)
- [キャッシュを管理する](./api/キャッシュ管理-cache.md)
- [エンティティを変更・確認する](./api/エンティティ-entity.md)
- [共通メッセージを使用する](./api/共通メッセージ管理-common_message.md)

## 簡易全体クラス図
```mermaid
classDiagram
direction LR

class 構造体

class State {
  <<Zustandストア>>
  xxx: 構造体x
  yyy: 構造体y
}
class ページ
class ユースケース_フロントエンド {
  ユースケースA(params): result
  ユースケースB(params): result
}

class Supabaseクライアント {
  クエリ名(BaseRequest): BaseResponse
}

ページ --> ユースケース_フロントエンド: ユースケース実行
ページ --> ZustandStore: 状態取得

ユースケース_フロントエンド --> ZustandStore: 状態更新
ユースケース_フロントエンド --> クエリサービス: データ取得
ユースケース_フロントエンド --> tRPCルーター: データ更新等

Supabaseクライアント --> Supabase: データ取得

class tRPCルーター {
  エンドポイントメソッド(リクエスト): レスポンス
}

class ユースケース_バックエンド {
  execute(コマンド): リザルト
}

class クエリサービス {
  execute(クエリコマンド): リザルト
  to_models(): ドメインモデルリザルト
}

class ドメインモデル {
  プロパティA: 値オブジェクト
  プロパティB: 値オブジェクト
  from_entity(): ドメインモデル
}

APサーバ --> tRPCルーター: エンドポイントメソッド実行

tRPCルーター --> クエリサービス: クエリサービス実行
tRPCルーター --> ユースケース_バックエンド: ユースケース実行

クエリサービス --> Supabase: 結合されたデータ取得

ユースケース_バックエンド --> リポジトリ: ドメインモデル単位のCRUD
ユースケース_バックエンド --> クエリサービス: 結合されたデータ取得(取得後ドメインモデルに変換)
ユースケース_バックエンド --> ドメインモデル: ビジネスロジック実行

リポジトリ --> DAO: データ取得
リポジトリ --> ドメインモデル: 構築

DAO --> RedisCache: キャッシュの作成、取得、削除
DAO --> Supabase: エンティティ単位のCRUD
DAO --> エンティティ: 永続化管理
```
