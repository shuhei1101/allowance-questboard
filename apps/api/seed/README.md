# Seed System - データベースセットアップツール

このディレクトリには、Allowance Questboard APIのデータベースセットアップに関するツールが含まれています。

## 構成

### 主要ファイル

- **`seed.py`** - メインのファサードファイル。すべての操作の統合インターフェース
- **`entity_manager.py`** - Entityクラスの初期化と情報表示
- **`table_dropper.py`** - テーブル削除機能
- **`table_creator.py`** - テーブル作成・制約追加機能
- **`data_seeder.py`** - 初期データ投入機能

### サポートファイル

- **`compare_tables.py`** - SQLファイルとEntityクラスの比較分析
- **`fix_entities.py`** - Entityファイルの修正ツール
- **`fix_broken_entities.py`** - 問題のあるEntityファイルの修正

### バックアップ

- **`backup/`** - 古いバージョンのファイルを保管

## 使用方法

### 基本的な使用方法

```bash
# 情報表示
python seed.py info

# テーブル削除
python seed.py drop

# テーブル作成
python seed.py create

# 初期データ投入
python seed.py seed

# マスタデータのみ投入
python seed.py master

# 完全リセット(削除→作成→データ投入)
python seed.py reset

# 完全セットアップ(削除→作成→制約追加→データ投入)
python seed.py full
```

### よく使用されるパターン

#### 開発環境の初期セットアップ
```bash
python seed.py full
```

#### テーブル構造の変更後
```bash
python seed.py reset
```

#### マスタデータの再投入のみ
```bash
python seed.py master
```

## 各モジュールの詳細

### entity_manager.py
- Entityクラスの動的インポート
- auth.usersテーブルの反映
- テーブル情報とデータベース状態の表示

### table_dropper.py
- CASCADE削除を使用した安全なテーブル削除
- 依存関係を考慮した削除順序

### table_creator.py
- auth.usersテーブルとの連携を考慮したテーブル作成
- 外部キー制約の追加
- 作成されたテーブルの確認機能

### data_seeder.py
- マスタデータの投入(言語、通貨など)
- サンプルデータの投入(将来実装予定)
- 重複チェック機能

## 後方互換性

引数なしで`python seed.py`を実行すると、旧バージョンと同じ動作(情報表示＋テーブル削除)を行います。

## エラーハンドリング

各モジュールは適切なエラーハンドリングを実装しており、問題が発生した場合は詳細なエラーメッセージを表示します。

## 開発者向け情報

### 新しい初期データの追加

`data_seeder.py`の`seed_master_data()`関数または`seed_sample_data()`関数に追加してください。

### 新しいEntityクラスの追加

`entity_manager.py`の`entity_modules`リストに新しいモジュールパスを追加してください。

### カスタム処理の追加

`seed.py`に新しいアクションを追加し、対応する実行関数を実装してください。
