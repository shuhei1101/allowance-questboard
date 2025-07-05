# 🔧 メソッド設計ガイドライン

## メソッド
- メソッド名は動詞 + 名詞で表現
	- 例: `get_quests`, `apply_quest`, `complete_quest`
- クラス名とのつながりを意識して、命名する
	- 例: `QuestRepository.get_quests()`, `QuestService.apply_quest()`
	- 命名の重複にならないことを意識する