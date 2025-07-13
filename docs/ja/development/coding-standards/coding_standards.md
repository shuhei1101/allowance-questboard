# 📝 コーディング規約

## 開発原則
- SOLID原則に従ってコーディングすること
  - SRP(Single Responsibility Principle): 単一責任の原則
  - OCP(Open-Closed Principle): オープンクローズドの原則
  - LSP(Liskov Substitution Principle): リスコフの置換原則
  - ISP(Interface Segregation Principle): インターフェース分離の原則
  - DIP(Dependency Inversion Principle): インターフェース分離の原則
- KISS(Keep it Simple, Stupid): コードをシンプルに、複雑なら分解せよ！
- DRY(Don't Repeat Yourself): 同じコードを繰り返すな
- YAGNI(You Aren't Gonna need It): 必要になるまで追加するな
- CoC(Convention over Configuration): まずは公式コーディング規約に従え
- SLAP原則: メソッドを高低でレイヤー分割せよ
- **デメテルの法則(Law of Demeter)**: オブジェクトが直接知っている相手とのみ通信する
  - 例: `model._id.value` → `model.id().value` (ゲッターメソッド経由でアクセス)

## インポート
- インポート文は特に理由がない限り、ファイルの一番上にまとめる

## Pythonメソッドアクセス制御
- **パブリック**: 接頭語なし（例: `validate()`）
- **プライベート**: 接頭語にアンダーバー（例: `_validate()`）

## コメント・ドキュメント
- **コメントは日本語で記述する**
  - docstring、インラインコメント、エラーメッセージなど全て日本語で統一
  - 例：
    ```python
    def get(self, source_id: int, language_id: int) -> TranslationType | None:
        """source_idとlanguage_idでアイテムを取得"""
        if not isinstance(source_id, int):
            raise TypeError(f"source_idはintである必要があります。実際: {type(source_id)}")
        if not isinstance(language_id, int):
            raise TypeError(f"language_idはintである必要があります。実際: {type(language_id)}")
    ```
- **docstringは必須**
  - メソッド、クラス、モジュールには説明的なdocstringを記述する
  - 引数、戻り値、例外について明記する
- **エラーメッセージは分かりやすく**
  - 期待される型と実際の型を明示する
  - 日本語で何が問題かを具体的に説明する
