# 値オブジェクト

## 目次
- [目次](#目次)
- [QuestTitle](#questtitle)
  - [メンバ](#メンバ)
  - [バリデーション](#バリデーション)
  - [メソッド](#メソッド)
- [QuestReward](#questreward)
  - [メンバ](#メンバ-1)
  - [バリデーション](#バリデーション-1)
  - [メソッド](#メソッド-1)
- [QuestRequestDetail](#questrequestdetail)
  - [メンバ](#メンバ-2)
  - [バリデーション](#バリデーション-2)
  - [メソッド](#メソッド-2)
- [QuestAgeRange](#questagerange)
  - [メンバ](#メンバ-3)
  - [バリデーション](#バリデーション-3)
  - [メソッド](#メソッド-3)


## QuestTitle
### メンバ
- String value: クエストタイトル

### バリデーション
- 必須
- 最大文字数: 200文字
- 最小文字数: 1文字（空文字不可）

### メソッド
- String get displayTitle: タイトルを表示用に整形して返す

## QuestReward
### メンバ
- int value: 報酬額（円）

### バリデーション
- 必須
- 最小値: 0円
- 数値

### メソッド
- String get displayReward: 「報酬: {報酬額}円」形式で返す
- bool get isFree: 報酬額が0円かどうかを返す

## QuestRequestDetail
### メンバ
- String value: 依頼詳細

### バリデーション
- オプション（null許可）
- 最大文字数: 1000文字

### メソッド
- String get displayDetail: 詳細を表示用に整形（null時は空文字）
- bool get hasDetail: 詳細が設定されているかどうかを返す

## QuestAgeRange
### メンバ
- int ageFrom: 対象年齢下限
- int ageTo: 対象年齢上限

### バリデーション
- 必須
- ageFrom: 0以上の整数
- ageTo: ageFrom以上の整数
- 最大値: 18歳

### メソッド
- String get displayAgeRange: 「{下限}歳〜{上限}歳」形式で返す
- bool isInRange(int age): 指定年齢が範囲内かどうかを返す
