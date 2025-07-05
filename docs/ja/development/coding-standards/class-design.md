# 🏗️ クラス設計ガイドライン

## クラス
- クラス名は名詞で表現
  - 振る舞いを持つクラス: 動詞 + `~er`や`or`(例: `Validator`, `Processor`)
    - ただし、DDDに関連するRepositoryやServiceは除く。
    - 関心事に関連する場合は、はじめに関心事を表す名詞を付ける(例: `QuestValidator`, `QuestProcessor`)
  - データを保持するクラス: 名詞(例: `Quest`, `User`)
- コンストラクタは基本的にメンバ変数を初期化するだけにする
- オブジェクトからの初期化はファクトリメソッドを使用する
	- 例: `Quest.from_data(data: dict)`
	- ただし、ドメインモデル駆動なため、依存性が逆転する場合は、ファクトリクラスを作成し、依存関係が崩れないようにする
		- 例: `QuestFactory.create_from_data(data: dict)`
