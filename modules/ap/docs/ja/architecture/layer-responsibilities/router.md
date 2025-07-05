# 🌐 Router層の責務

## 概要
`router/`にはAPIのルーティングを定義します。

## 基本ルール
- ルーティングにはFastAPIの`APIRouter`を使用する
- RequestやResponseは`pydantic`を使用して定義する
- ルートメソッドは基本的にRESTfulに従う
  - `GET`: データの取得
  - `POST`: データの作成
  - `PUT`: データの更新
  - `DELETE`: データの削除
- ただし、Restfulで表現できない場合はその限りではない
  - 例: クエストの達成や申請など、特定のアクションを表現する場合は`POST`を使用
  - `@router.post("/{quest_id}/apply")`のように、特定のリソースに対するアクションを表現する

## ファイル構成
- routeファイルは一ファイルにつき、一つのAPIエンドポイントを定義する
- routeファイルの命名は`動詞_{関心事}_route.py`とする
  - 例: `apply_quest_route.py`, `get_quests_route.py`

## ファイル内の構成要素
routeファイルの中には以下のオブジェクトを定義する:
- APIルーター: `router = APIRouter()`
- Requestモデル: `ApplyQuestRequest(BaseModel)`
- Responseモデル: `ApplyQuestResponse(BaseModel)`
- ルートメソッド: `@router.post("/{quest_id}/apply")`

## 処理の委譲
ルートメソッドでは具体的な処理は行わず、Service層に処理を委譲すること。

## Request/Responseモデル

### Requestモデル
- 受け取るデータを含める

### Responseモデル
- 返却するデータを含める
- (オプショナル)ファクトリメソッド(`from_domain`)を定義する
  - 例: `QuestResponse.from_domain(model: Quest)`