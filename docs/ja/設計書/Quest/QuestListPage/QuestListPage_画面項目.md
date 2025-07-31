# 画面名_セクション

## 目次


## アプリバー
### 戻るボタン
- タイプ: ボタン
- 説明: 前の画面に戻るためのボタン
- [イベント](クエスト一覧画面_イベント.md#戻るボタン)
- 対象画面: [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage)

### タイトル
- タイプ: テキスト
- 説明: 画面のタイトルを表示する
- 設定値: 
 
| 画面名       | 表示内容           |
| ------------ | ------------------ |
| 家族         | クエスト一覧       |
| テンプレート | テンプレートの選択 |
| オンライン   | クエスト一覧       |
| 子供         | クエスト一覧       |

- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

### 検索ボタン
- タイプ: ボタン
- 説明: 検索画面へ遷移するためのボタン
- [イベント](クエスト一覧画面_イベント.md#検索ボタン)
- アイコン名: `search`
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

### 設定ボタン
- タイプ: ボタン
- 説明: 設定画面へ遷移するためのボタン
- [イベント](クエスト一覧画面_イベント.md#設定ボタン)
- アイコン名: `settings`
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

## トップタブバー
### クエスト分類タブバー
- タイプ: トップタブバー
- 説明: クエストの分類を選択するタブバー
- 設定値: [クエスト分類タブアイテム](QuestListPage_構造体.md#QuestCategoryTabItem) 
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

## コンテンツエリア
### クエストリスト
- タイプ: リスト
- 説明: クエストの一覧を表示する
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

### クエストリストアイテム
- タイプ: リストアイテム
- 説明: クエストの情報を表示する
- 設定値: [クエストリストアイテム](クエスㇳ一覧画面_構造体.md#QuestListItem)
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

## クエストリストアイテム
### クエストアイコン
- タイプ: アイコン
- 説明: クエストのアイコンを表示する
- 設定値: [クエストアイコン](../Quest_値オブジェクト.md)
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

### クエスト公開非公開フラグ
- タイプ: アイコン
- 説明: クエストが公開されているか非公開かを示すアイコン
- 設定値: [クエスト公開非公開フラグ](../Quest_値オブジェクト.md#QuestPublicFlag)
- アイコン名: `public` または `private`
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage) 

### クエストタイトル
- タイプ: テキスト
- 説明: クエストのタイトルを表示する
- 設定値: [クエストタイトル](../Quest_値オブジェクト.md#QuestTitle)
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage) 

### クエスト報酬
- タイプ: テキスト
- 説明: クエストの報酬額を表示する
- 表示形式: `報酬: {報酬額}円`
- 設定値: [クエスト報酬](../Quest_値オブジェクト.md#QuestReward)
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage) 

### テンプレート共有者
- タイプ: テキスト
- 説明: テンプレートの共有者を表示する
- 表示形式: `テンプレート`
- 設定値: [テンプレート共有者](../Quest_値オブジェクト.md#QuestTemplateSharer)
- 対象画面: [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage)

### 家族メンバーアイコン
- タイプ: アイコンリスト
- 説明: クエストに参加可能な家族メンバーのアイコンを表示する
- 設定値: [家族メンバーアイコンリスト](../Quest_値オブジェクト.md#QuestFamilyMemberIcons)
- アイコン色: オレンジ、青、グレーなど
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage)

### 地球アイコン
- タイプ: アイコン
- 説明: クエストがオンライン公開されていることを示すアイコン
- アイコン名: `public`
- 設定値: [クエスト公開フラグ](../Quest_値オブジェクト.md#QuestPublicFlag)
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage)

### コメントアイコン
- タイプ: アイコン（数値付き）
- 説明: クエストのコメント数を表示するアイコン
- アイコン名: `comment`
- 表示形式: `コメントアイコン + コメント数`
- 設定値: [クエストコメント数](../Quest_値オブジェクト.md#QuestCommentCount)
- 対象画面: [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage)

### いいねアイコン
- タイプ: アイコン（数値付き）
- 説明: クエストのいいね数を表示するアイコン
- アイコン名: `favorite`
- 表示形式: `いいねアイコン + いいね数`
- 設定値: [クエストいいね数](../Quest_値オブジェクト.md#QuestLikeCount)
- 対象画面: [テンプレート](./クエスト一覧画面_ページ.md#TemplateQuestListPage), [オンライン](./クエスト一覧画面_ページ.md#OnlineQuestListPage)

### クエストステータス
- タイプ: タグ
- 説明: クエストの進行状況を示すステータスタグ
- 設定値: [クエストステータス](../Quest_値オブジェクト.md#QuestStatus)
- 表示値: 
  - `公開中` (赤色)
  - `進行中` (オレンジ色)
  - `クリア` (青色)
  - `報告中` (紫色)
  - `未公開` (グレー色)
- 対象画面: [家族](./クエスト一覧画面_ページ.md#FamilyQuestListPage), [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

### クエストレベル
- タイプ: 星アイコン
- 説明: クエストの難易度レベルを星の数で表示する
- 設定値: [クエストレベル](../Quest_値オブジェクト.md#QuestLevel)
- 表示形式: 星アイコン（1〜5個）
- 対象画面: [子供](./クエスト一覧画面_ページ.md#ChildQuestListPage)

## 検索エリア（ボードタブクエスト画面）
### 検索条件選択ドロップダウン
- タイプ: ドロップダウン
- 説明: 検索条件を選択するドロップダウンメニュー
- 設定値: `クエスト名`
- アイコン名: `arrow_drop_down`
- 対象画面: [ボードタブクエスト](./クエスト一覧画面_ページ.md#BoardTabQuestListPage)

### 検索テキストフィールド
- タイプ: テキストフィールド
- 説明: 検索キーワードを入力するテキストフィールド
- プレースホルダー: `検索ワードを入力してください`
- アイコン名: `search`
- 対象画面: [ボードタブクエスト](./クエスト一覧画面_ページ.md#BoardTabQuestListPage)

## フローティングアクションボタン
### クエスト追加ボタン
- タイプ: フローティングアクションボタン
- 説明: 新しいクエストを追加するためのボタン
- [イベント](クエスト一覧画面_イベント.md#クエスト追加ボタン)
- アイコン名: `add`

## ボトムナビゲーションバー
- [共通ナビゲーションバー](../../共通機能/共通ナビゲーションバー.md)
