# APIClientの仕様

## DTO / Request / Response 命名規則
- 取得: `〇〇Response`
- リスト取得(ページネーションあり): 
    - `〇〇sResponse`
         - `List[〇〇Dto]`
         - `PaginationMeta`
- 作成: `Create〇〇Request`, `Create〇〇Response`
- 更新: `Update〇〇Request`

- 基本的にはAPサーバ側のオブジェクト構造と同じにする

## メソッド
- `toJson()` は全Request共通
- `fromJson()` はResponse/DTO共通

## 配置ルール
- Request/Responseクラスは対応するAPIClientの中に記載
    - ばらばらに記載しないこと

## クラス図
```mermaid
classDiagram
    class BaseApiClient {
        +get(path: String): Map
        +post(path: String, body: Map): Map
        +put(path: String, body: Map): Map
    }

    class QuestApiClient {
        +createQuest(req: CreateQuestRequest): CreateQuestResponse
        +updateQuest(id: String, req: UpdateQuestRequest)
        +acceptQuest(req: AcceptQuestRequest)
        +reportCompletion(questId: String)
        +approveCompletion(questId: String)
    }

    QuestApiClient --|> BaseApiClient

    class CreateQuestRequest {
        +title: String
        +description: String
        +reward: int
        +childId: String
        +toJson(): Map
    }

    class CreateQuestResponse {
        +questId: String
        +fromJson(json: Map): CreateQuestResponse
    }

    class UpdateQuestRequest {
        +title: String
        +description: String
        +reward: int
        +toJson(): Map
    }

    class AcceptQuestRequest {
        +questId: String
        +childId: String
        +toJson(): Map
    }

    QuestApiClient o-- CreateQuestRequest
    QuestApiClient o-- CreateQuestResponse
    QuestApiClient o-- UpdateQuestRequest
    QuestApiClient o-- AcceptQuestRequest

    class BaseRequest {
        <<abstract>>
        +toJson(): Map
    }

    class BaseResponse {
        <<abstract>>
        +fromJson(Map): BaseResponse
    }

    CreateQuestRequest --|> BaseRequest
    UpdateQuestRequest --|> BaseRequest
    AcceptQuestRequest --|> BaseRequest

    CreateQuestResponse --|> BaseResponse
```


## リスト形式のオブジェクトの場合
```mermaid
classDiagram
    class FamilyQuestSummariesResponse {
        +meta: PaginationMeta
        +items: List~QuestDTO~
        +fromJson(Map): FamilyQuestSummariesResponse
    }

    class QuestDTO {
        +id: int
        +title: String
        +categoryId: int
        +iconId: int
        +isShared: bool
        +isPublic: bool?
        +members: List~QuestMemberDTO~
    }

    class QuestMemberDTO {
        +childId: int
        +childIconId: int?
    }

    class PaginationMeta {
        +page: int
        +size: int
        +total: int
    }

    FamilyQuestSummariesResponse o-- QuestDTO
    QuestDTO o-- QuestMemberDTO
    FamilyQuestSummariesResponse o-- PaginationMeta

```

