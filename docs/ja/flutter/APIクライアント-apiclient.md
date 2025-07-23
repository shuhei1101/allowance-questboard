[indexへ戻る](../index.md)
# 🔍 APIクライアント

## 概要
- APサーバのエンドポイントにAPIリクエストを送信するためのモジュール
- 必ず`BaseApiClient`を継承して実装すること

## クラス図
```mermaid
classDiagram
    class BaseApiClient { 
      <<abstract>>
      httpClient: HttpClient
      get endpoint(): ApiEndpoint
      get uri(): Uri
      execute(request: BaseApiRequest): BaseApiResponse
      get(request: BaseApiRequest): Future~HttpResponse~
      post(request: BaseApiRequest): Future~HttpResponse~
      put(request: BaseApiRequest): Future~HttpResponse~
      delete(request: BaseApiRequest): Future~HttpResponse~
      handleResponse(response: HttpResponse): Any
      dispose(): void
    }
    class XxxApi {
      get endpoint(): ApiEndpoint
      execute(request: XxxRequest): XxxResponse
    }
    class BaseApiRequest {
      <<abstract>>
      tokens: AuthTokens?
      get headers(): Map~String, String~
      toJson(): Object?
    }

    class XxxRequest {
      tokens: AuthTokens?
      get headers(): Map~String, String~
      toJson(): Object?
    }
    class BaseApiResponse {
      <<abstract>>
      fromJson(json: Map~String, dynamic~): BaseApiResponse
    }
    class XxxResponse {
      item: 関心事名Dto
    }

    BaseApiClient <|-- XxxApi
    BaseApiRequest <|-- XxxRequest
    XxxApi --> XxxRequest : 引数
    BaseApiResponse <|-- XxxResponse
    XxxApi --> XxxResponse : 戻り値
    XxxResponse --> 関心事名Dto : 保持
```

## `BaseApiClient`クラス
### 概要
- `BaseApiClient`は全てのAPIクライアントの基底クラス
- APIクライアントで共通の処理が発生した場合は`BaseApiClient`に実装すること
- `BaseApiClient`の具象クラスは、一つのエンドポイントに対して一つのクラスとする
  - 例: `GetQuestApi`, `LoginApi`
  - エンドポイント関数名と同じ名前にすること
- APIリクエストを実行するメソッドは`execute`とする

### 配置場所
- `/core/api/base_api_client.dart`に配置

## `Api`クラス
### 概要
- 全てのAPIクライアントは`BaseApiClient`を継承すること

### 配置場所
- `{関心事名}/api/v{バージョン番号}/{エンドポイント関数名}_api.dart`
  - 例: `quest/api/v1/get_quest_api`
  - `v1`はバージョン番号で、必要に応じて変更すること
- 

### 命名規則
- ファイル名は`{エンドポイント関数名}_api`とする
  - 例: `get_quest_api.dart`

- クラス名は`{エンドポイント関数名}Api`とする
  - 例: `GetQuestApi`

## `BaseApiRequest`抽象クラス
### 概要
- `BaseApiRequest`は全てのAPIリクエストの基底クラス
- APIリクエストで共通の処理が発生した場合は`BaseApiRequest`に実装すること

### 配置場所
- `/core/api/base_api_request.dart`に配置

### 命名規則
- クラス名は`BaseApiRequest`とする

## `Request`クラス
### 概要
- エンドポイントのリクエストを表現するクラス
- 基本的に構造はAPサーバ側の`Request`クラスと同じにすること
  - [APIサーバの設計書](../api/エンドポイント-endpoint.md)を参照すること

### 配置場所
- `./{関心事名}/api/v{バージョン番号}/{エンドポイント関数名}_request.dart`
  - 例: `quest/api/v1/get_quest_request.dart`

### 命名規則
- APIサーバ側の`Response`クラスと同じ命名規則に従うこと

## `BaseApiResponse`抽象クラス
### 概要
- `BaseApiResponse`は全てのAPIレスポンスの基底クラス
- APIレスポンスで共通の処理が発生した場合は`BaseApiResponse`に実装すること

### 配置場所
- `/core/api/base_api_response.dart`に配置

### 命名規則
- クラス名は`BaseApiResponse`とする

## `Response`クラス
### 概要
- エンドポイントのレスポンスを表現するクラス
- 基本的にAPIサーバ側の`Response`クラスと同じ構造にすること
  - [APIサーバの設計書](../api/エンドポイント-endpoint.md)を参照すること

### 配置場所
- `./{関心事名}/api/v{バージョン番号}/{エンドポイント関数名}_response.dart`
  - 例: `quest/api/v1/get_quest_response.dart`
  - `v1`はバージョン番号で、必要に応じて変更すること

### 命名規則
- APIサーバ側の`Response`クラスと同じ命名規則に従うこと
