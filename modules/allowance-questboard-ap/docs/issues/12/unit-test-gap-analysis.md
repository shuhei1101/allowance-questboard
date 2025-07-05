# 単体テストギャップ分析レポート

## 概要
現状のallowance-questboard-apiプロジェクトにおいて、単体テストが作成されていないモジュールを洗い出した結果を報告します。

## 分析方法
- aqapiディレクトリ配下の全Pythonファイル（計107ファイル）を調査
- テストドキュメント (`docs/ja/development/testing.md`) の指針に基づき対象を特定
- 既存のtestsディレクトリと照合してテスト済み/未テストを判定

## テスト対象の選定基準
テストドキュメントに基づき、以下を単体テストの対象としました：
- **ユースケース**: service層のメソッド
- **リポジトリ**: repository層のメソッド  
- **DAO**: dao層のメソッド
- **ドメインモデル**: domain層や値オブジェクトのメソッド

## 洗い出し結果

### 🔴 テストが存在しないモジュール（15ファイル）

#### Core層（共通機能）- 11ファイル

**Domain層**
- `aqapi/core/domain/base_model.py`
  - `BaseModel`クラス: バージョン管理機能を持つドメインモデルの基底クラス
  - テスト対象メソッド: `version()`, `next_version()`, `is_same_version()`

- `aqapi/core/domain/value_object/version.py`
  - `Version`クラス: バージョン値オブジェクト
  - テスト対象メソッド: `__init__()`, `next()`, `__eq__()`

**DAO層**
- `aqapi/core/dao/dao.py`
  - `Dao`クラス: DAOの抽象基底クラス
  - テスト対象メソッド: `commit()`, `rollback()`

**Infrastructure・Utility層**
- `aqapi/core/app_logger.py`
  - `build_logger()`関数: アプリケーションロガーの構築
  
- `aqapi/core/app_timer.py`
  - `AppTimer`クラス: アプリケーション実行時間計測
  - テスト対象メソッド: `init_and_start()`, `snap_delta()`, `snap_total()`

- `aqapi/core/pagination/pagination_meta.py`
  - `PaginationMeta`クラス: ページネーションメタデータ

- `aqapi/core/pagination/paginator.py`
  - `Paginator`クラス: ページネーション機能
  - テスト対象メソッド: `paginate()`

- `aqapi/core/config/db_config.py`
  - `DBConfig`クラス: データベース設定とセッション管理
  - テスト対象メソッド: `get_db()`, `import_all_entities()`

- `aqapi/core/config/log_config.py`
  - `LogConfig`クラス: ログ設定

- `aqapi/core/constants/error_messages.py`
  - `ErrorMessages`クラス: エラーメッセージ定数

- `aqapi/core/setup/setup_di.py`
  - `setup_di()`関数: DIコンテナのセットアップ

#### Quest関心事 - 3ファイル

**DAO層**
- `aqapi/quest/dao/quest_dao.py`
  - `QuestDao`クラス: クエストデータアクセス
  - テスト対象メソッド: `fetch_all()`, `fetch_by_id()`, `update()`, `delete()`

- `aqapi/quest/dao/family_quests_dao.py`
  - `FamilyQuestsDAO`クラス: ファミリークエストデータアクセス

**Query Service層**
- `aqapi/quest/query_service/family_quest_query_service.py`
  - `FamilyQuestQueryService`クラス: ファミリークエスト照会サービス
  - テスト対象メソッド: `fetch_quest_summary()`

#### Utility層 - 1ファイル
- `aqapi/util/traceback_converter.py`
  - `TracebackConverter`クラス: エラートレースバック変換
  - テスト対象メソッド: `get_all()`, `get_origin()`

### 🟢 テストが存在するモジュール（1ファイル）

- `aqapi/core/di_container.py` → `tests/core/di_container.py`

### ⚪ テスト対象外（91ファイル）

- **Entity層**: SQLAlchemyのORMモデル（ビジネスロジック無し）
- **__init__.py**: モジュール初期化ファイル
- **API Routes**: 統合テストの範囲と判断（一部例外有り）

## 優先度の推奨

### 🔴 高優先度（7ファイル）
ビジネスロジックを含み、アプリケーションの基盤となるモジュール：
1. `aqapi/core/domain/value_object/version.py`
2. `aqapi/core/domain/base_model.py`
3. `aqapi/core/pagination/paginator.py`
4. `aqapi/core/app_timer.py`
5. `aqapi/quest/dao/quest_dao.py`
6. `aqapi/quest/query_service/family_quest_query_service.py`
7. `aqapi/util/traceback_converter.py`

### 🟡 中優先度（4ファイル）
設定やセットアップ関連：
1. `aqapi/core/config/db_config.py`
2. `aqapi/core/setup/setup_di.py`
3. `aqapi/core/app_logger.py`
4. `aqapi/quest/dao/family_quests_dao.py`

### 🟢 低優先度（4ファイル）
定数やシンプルなデータクラス：
1. `aqapi/core/constants/error_messages.py`
2. `aqapi/core/config/log_config.py`
3. `aqapi/core/pagination/pagination_meta.py`
4. `aqapi/core/dao/dao.py`

## 推奨実装アプローチ

1. **高優先度モジュールから順次実装**
2. **テストファイル配置**: `tests/`配下にaqapiと同じディレクトリ構造で配置
3. **テストクラス構造**: 2階層（`Test{クラス名}` > `Test_{メソッド名}`）
4. **テストメソッド命名**: `test_{テスト内容}` (日本語、「〜すること」で終わる)

## 見積もり
- **高優先度**: 約14日（各モジュール2日）
- **中優先度**: 約8日（各モジュール2日）
- **低優先度**: 約4日（各モジュール1日）
- **合計**: 約26日

---
*分析日時: 2024年12月19日*  
*対象バージョン: commit f25015f*