# 💬 コメントルール

## 概要
このドキュメントでは、コード内のコメントの書き方に関するルールを定義します。

## 基本原則

### 言語関連
- コメントは**日本語**で記述すること
- ソースコード内のコメントに絵文字などは使わないこと

### 関連ドキュメント
- 🤖 [Copilotガイドライン](../copilot-guidelines.md) - AI支援開発時のコメントガイドライン

## コメントの種類
### クラスや関数のdocstring
- 必須ではない
- 引数の説明はすべて入れる必要はなく、特殊なものに限り入れる
- 不要な例: find_by_id(id: QuestId)  # 引数の説明がなくても伝わるから不要

#### docstring形式
- クラスやメソッドのdocstring方式は`reStructuredText（reST）`を使用する
- 例:  
  ```python
  def say_hallo(your_name: str) -> bool:
      """指定人物に挨拶をする

      もしも、指定人物が空白の場合は、挨拶しない

      :param str your_name: 挨拶する人物の名前
      :return bool: 挨拶したかどうか
      :raise ValueError: your_nameがstr型でない場合
      """
      if not isinstance(your_name, str):
        raise ValueError("your_nameはstr型でなければなりません")
      if not your_name:
        return False
      print(f"Hello, {your_name}!")

  say_hallo("Alice")
  print(say_hallo(""))  # False
  say_hallo(123)  # ValueError: your_nameはstr型でなければなりません
  ```
- 最初の行は`"""`の右に配置する
- 説明文は、最初の行に簡潔に記述し、必要な場合のみ一行空けて詳細な説明を記述する
- 引数や戻り値は説明文と一行空けてから記述する

### 単行コメント
- ‘〜する‘や‘〜です‘などの言葉は省くこと
- 一文の時は最後に丸‘。‘をつけないこと
	- 例: 
		- ✗: # hogeを処理する。
		- ○: # hogeを処理

### 複数行コメント
- 極力スマートにシンプルに記述すること