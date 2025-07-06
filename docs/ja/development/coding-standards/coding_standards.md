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

## インポート
- インポート文は特に理由がない限り、ファイルの一番上にまとめる

## コンストラクタの書式設定
- コンストラクタの引数は、横に40文字〜60文字くらいまでは改行せず続けて記述する
- それを超える長さの場合は改行して記述する
- 可読性を重視し、縦に長くなりすぎないようにバランスを取る
