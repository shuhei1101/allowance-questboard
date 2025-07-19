[indexへ戻る](../index.md)
# 🔍 APIクライアント関連

## 概要
- APサーバのエンドポイントにAPIリクエストを送信するためのモジュール
- 必ず`BaseApiClient`を継承して実装すること
- 

## クラス図
```mermaid
classDiagram
    class BaseApiClient {
      <<abstract>>
      url: String
      execute(request: Any): Any
    }
    class エンドポイント関数名Api {
      url: String = ApiEndpoints.エンドポイント関数名
      execute(request: エンドポイント関数名Request): エンドポイント関数名Response
    }
    class エンドポイント関数名Request {
      dto: エンドポイント関数名Dto
      tokens: AuthTokens
    }
    class エンドポイント関数名Response {
      item: {関心事名}Dto
    }

    BaseApiClient <|-- エンドポイント関数名Api
    エンドポイント関数名Api --> エンドポイント関数名Request : 引数
    エンドポイント関数名Api --> エンドポイント関数名Response : 戻り値
    エンドポイント関数名Response --> {関心事名}Dto : 保持
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
- `/core/api/base_api_client.py`に配置

## `エンドポイント関数名Api`クラス
### 概要
