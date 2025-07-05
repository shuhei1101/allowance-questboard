# 🗃️ Entity層の責務

## 概要
`entity/`はデータベースのテーブルに対応するエンティティを定義する場所です。

## 基本原則
- エンティティ名はテーブル名に`Entity`を付ける
  - 例: `quests_entity.py`, `users_entity.py`
- エンティティは`SQLAlchemy`のORMを使用して定義する

## エンティティの構成要素
主に以下の要素を定義します:

### 基本要素
- テーブル名: `__tablename__ = 'quests'`
- テーブル制約: `__table_args__ = (UniqueConstraint('id', name='uq_quests_id'),)`
- カラム: `id = Column(Integer, primary_key=True)`
- リレーションシップ: `children = relationship('ChildEntity', back_populates='parent')`

## ベースクラス
エンティティは以下のいずれかのベースクラスを継承します(`aqapi/core/entity/base_entity.py`):

### BaseEntity
基本的なエンティティクラスです。

#### 主要要素
- `id`: 主キーとなるカラム
- `created_at`: 作成日時
- `created_by`: 作成者
- `created_from`: 作成元の画面情報
- `updated_at`: 更新日時
- `updated_by`: 更新者
- `updated_from`: 更新元の画面情報

#### 主要メソッド
- `create_table()`: テーブルを作成するメソッド
- `drop_table()`: テーブルを削除するメソッド
- `seed()`: テーブルに初期データを投入するメソッド
  - `_seed_data()`メソッド: 初期データを定義する抽象メソッド(サブクラスで実装する)
  - `_seed_data()`メソッドはマスターテーブルなどの初期データを定義するために使用する

### BaseHistoryEntity
履歴テーブル用のエンティティクラスです。

#### 特徴
- `BaseEntity`を継承し、履歴テーブルに必要なカラムを追加する
- 履歴テーブルは、対象となるエンティティと同じファイル内に定義する

#### 追加要素
- `source_id`: 元のエンティティのID
- `source_created_at`: 元のエンティティの作成日時
- `source_updated_at`: 元のエンティティの更新日時
- `from_source()`: 元のエンティティから履歴エンティティを生成する抽象ファクトリメソッド

### BaseTranslationEntity
翻訳テーブル用のエンティティクラスです。

#### 特徴
- `BaseEntity`を継承し、翻訳テーブルに必要なカラムを追加する

#### 追加要素
- `language_id`: 翻訳対象の言語ID

#### 翻訳情報の追加シナリオ
翻訳情報は以下のシナリオで追加する予定:
- 管理者が直接翻訳情報を追加する(マスタデータ等)
- ユーザがアプリ側で翻訳ボタンを押した際
  - 翻訳APIを使用して翻訳情報を取得し、翻訳テーブルに保存する
- 翻訳はユーザの言語設定に基づいて行う