# 🧱 ディレクトリ構成（DDDスタイル）

## ディレクトリ構成
```plaintext
.
├── aqapi/                                  // メインアプリケーションディレクトリ
│  ├── {関心事名}/                         // 関心事ごとのモジュール
│  │   ├── api/v{x}/xx_route.py           // APIルーティング (v{x}はAPIバージョン、例: v1)
│  │   ├── service/xx_usecase.py          // ユースケース
│  │   ├── query_service/xx_query_service.py  // クエリサービス
│  │   ├── domain/
│  │   │   ├── {関心事名}.py              // ドメインモデル
│  │   │   └── value_object/{値オブジェクト名}.py  // 値オブジェクト
│  │   ├── repository/{関心事名}_repository.py  // リポジトリ
│  │   ├── dao/{関心事名}_dao.py          // データアクセスオブジェクト
│  │   └── entity/{テーブル名}_entity.py  // エンティティ
│  ├── core/                               // アプリケーションの中核機能
│  │   ├── app_logger.py                   // アプリケーションロガー
│  │   ├── app_timer.py                    // アプリケーションタイマー
│  │   ├── di_container.py                 // DIコンテナ（依存性注入）
│  │   ├── constants/                      // 定数やエラーメッセージ
│  │   ├── config/                         // 設定ファイル
│  │   ├── dao/                            // 共通データアクセスオブジェクト
│  │   ├── domain/                         // 共通ドメインモデル
│  │   ├── entity/                         // 共通エンティティ
│  │   ├── pagination/                     // ページネーション関連
│  │   └── setup/                          // セットアップ関連
│  ├── shared/                             // 複数モジュール間で共有されるコード
│  ├── util/                               // ユーティリティ関数
│  │   └── traceback_converter.py          // トレースバック変換ユーティリティ
│  └── main.py                             // アプリケーションエントリーポイント
├── docs/                                  // ドキュメント
│  ├── ja/                                 // 日本語ドキュメント
│  └── *.md                                // 図表・設計書類
├── tests/                                 // テストコード
├── seed/                                  // シードデータ
├── requirements.txt                       // Python依存関係
├── Dockerfile                             // Docker設定
├── docker-compose.yml                     // Docker Compose設定
└── .env.sample                            // 環境変数サンプル
```

## 各層の責務
- [Router層の責務](../../../../../docs/ja/development/routerの書き方.md)
- [Service層の責務](../../../../../docs/ja/development/service.md)
- [QueryService層の責務](../../../../../docs/ja/development/query-serviceの書き方.md)
- [Models層の責務](../../../../../docs/ja/development/models.md)
- [Repository層の責務](../../../../../docs/ja/development/repository.md)
- [DAO層の責務](../../../../../docs/ja/development/dao.md)
- [Entity層の責務](../../../../../docs/ja/development/entity.md)
