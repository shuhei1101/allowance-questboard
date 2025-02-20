# はじめに
本リポジトリはiPhone・Android・Web向けに開発中のアプリ「お小遣いクエストボード」に関するものです。 \
転職用に期間限定で公開しているため、掲載内容は予告なく変更・削除する可能性がありますので、ご了承ください。

# 背景
昨今ではゲームやSNSに夢中になり、不登校になる子供が増えています。 \
私自身も過去に同じような状況を経験し、この問題を解決する手助けをアプリ開発を通じてできないかと考え、 \
本プロジェクトをスタートしました。

# アプリ概要
本アプリは、親が「クエスト」と呼ばれるお手伝いや成長を促すタスクを作成し、\
子供が自由に選んで挑戦できるアプリです。\
クエストを達成すると、お小遣いや経験値を獲得でき、ゲーム感覚で楽しみながら自発的に成長できます。

具体的には以下のようなサイクルでアプリが進行します。

![image](https://github.com/user-attachments/assets/f096b26e-6d36-46cf-add6-ac7cbcaeb032)

# 開発環境
- OS: Ubuntu 22.04 LTS
- Flutter SDK: 3.13.8
- Dart SDK: 3.5.3
- データベース: Firestore
- 使用ライブラリ（主要なものを抜粋）
	- 状態管理: flutter_riverpod
	- ルーティング: go_router
	- DI管理: get_it

# 機能一覧
![サービス利用イメージ](https://github.com/user-attachments/assets/5b87f7b3-8596-4c2b-b15e-350305841a77)
- クエスト作成・受注・達成報告機能
	- 親がクエストを作成し、子供が自由に受注できる。
 	- 達成報告が承認されると報酬（お小遣い・経験値）を獲得可能。
- オンライン機能
	- 親がクエストをオンライン上に共有できる。
	- 親ユーザはオンラインに公開されたクエストに対して保存や「いいね」、コメントが可能。
- その他
	- 罰金機能
 	- 貯金機能
 	- 定額お小遣いテーブル設定機能
  	- etc...


# 設計について
## 画面設計
本アプリの画面設計は Figma を使用して作成しています。
詳細なデザインは [こちら](https://www.figma.com/design/WJpCB11rIjR94aZ5yha8hD/%E3%81%8A%E5%B0%8F%E9%81%A3%E3%81%84%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%83%9C%E3%83%BC%E3%83%89?node-id=1007-14185&t=penZDoTiJQwgSZ7J-1) から確認できます。

![画面設計例2025-02-21 3 07 26](https://github.com/user-attachments/assets/e6a1ee53-e314-4d0a-b4ec-dc4c39d62ed9)


## データベース設計
本アプリのデータベース設計は Mermaid記法 を使用して作成しています。\
詳細は以下から確認できます。
[ユーザ関連ERD](https://www.mermaidchart.com/raw/29d432f8-eee8-4fde-a9bd-6250c648c78c?theme=light&version=v0.1&format=svg)
[クエスト関連ERD](https://www.mermaidchart.com/raw/3f328b02-9b02-400e-ae65-b0574c59508c?theme=light&version=v0.1&format=svg) 
[その他通知等](https://www.mermaidchart.com/app/projects/ed949344-1350-4e83-97f4-506c642ccc31/diagrams/b6cd4ba8-dc7a-4e1a-8d5c-c68674af9910/version/v0.1/edit)

## アーキテクチャ設計
本アプリのアーキテクチャ設計は PlantUML記法 を使用して作成しています。\


# 開発の進捗と今後の予定

# おわりに
Flutter初でFlutterを触った書簡と読んでくれたことへの感謝
Factoryメソッドとかコンストラクタが使いやすい
インターフェースなしでも継承できるからユニットテストがしやすそう
なんと言ってもコンポーネントのカプセル化が楽しい。




