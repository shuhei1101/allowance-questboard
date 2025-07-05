# 🔧 Service層の責務

## 概要
`service/`はユースケースを定義する場所です。

## 基本原則
- ユースケースごとにファイルを分ける
  - 例: クエストの達成(`apply_quest`), クエストの取得(`get_quests`)など
- serviceファイルはユースケース一つにつき一ファイルとする

## ファイル構成
- 命名規則は`動詞_{関心事}_usecase.py`とする
  - 例: `apply_quest_usecase.py`, `get_quests_usecase.py`

## ファイル内の構成要素
ファイル内には以下のオブジェクトを定義する:
- ユースケースクラス: `class ApplyQuestUseCase`
- メソッド: `def execute(self, request: ApplyQuestRequest) -> ApplyQuestResponse`

## 役割
ユースケースクラスは、ファサードであり、主に以下２つのクラスを呼び出します:
- Repository: データの永続化や取得を行う
- QueryService: 特定のクエリを実行する

## 処理の委譲
低水準の処理はドメインモデル内のメソッドもしくはドメインサービスに処理を委譲すること。