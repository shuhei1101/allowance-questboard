<!-- Please write comments and pull requests in Japanese. -->
# お小遣いクエストボード

## 1. 目次
- [1. 目次](#1-目次)
- [2. 概要](#2-概要)
- [3. 🛠 技術スタック](#3--技術スタック)
- [4. 📚 ドキュメント](#4--ドキュメント)
  - [アーキテクチャ関連](#アーキテクチャ関連)
  - [開発関連](#開発関連)
  - [モジュール](#モジュール)
  - [その他のドキュメント](#その他のドキュメント)


## 2. 概要
- 親がクエストを登録し、子どもがクエスト（お手伝いなど）を達成すると、親からご褒美がもらえるアプリ🎁
- お小遣いや貯金などの管理機能やオンラインでクエスト等の共有機能も。

- このREADMEは人間だけでなく、GitHub Copilotにプロジェクトの文脈や開発方針を伝えるためにも書かれています。


## 3. 🛠 技術スタック
- フロントエンド: 
	- Flutter
- APサーバ(本リポジトリ): 
	- Python3.13
		- FastAPI
		- SQLAlchemy(ORM)
- DB: Supabase(PostgreSQL)

## 4. 📚 ドキュメント

### アーキテクチャ関連
- 🧱 [ディレクトリ構成](docs/ja/architecture/directory-structure.md)
- 🏗️ [責務・アーキテクチャルール](docs/ja/architecture/responsibilities.md)
- 📊 [クラス図](docs/ddd_clsd.md)
- 🗂️ [ER図](docs/erd.md)

### 開発関連
- ⚠️ [例外ハンドリング](docs/ja/development/exception-handling.md)
- 🧪 [テスト](docs/ja/development/testing.md)
- 🤖 [Copilotガイドライン](docs/ja/development/copilot-guidelines.md)

#### コーディング規約
- ✍️ [命名ルール](docs/ja/development/coding-standards/naming-rules.md)
- 🏗️ [クラス・メソッド・変数ガイドライン](docs/ja/development/coding-standards/class-guidelines.md)
- 📝 [コーディング規約](docs/ja/development/coding-standards/coding_standards.md)
- 💬 [コメントルール](docs/ja/development/coding-standards/comment-rules.md)

### モジュール
- 🔧 [DIコンテナ](docs/ja/modules/di-container.md)
- 📄 [ページネーション](docs/ja/modules/pagination.md)

### その他のドキュメント
- 🌱 [Seedシステム](seed/README.md)
