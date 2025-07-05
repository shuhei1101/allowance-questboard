# INSERT文実行順序

各INSERT文の実行順序を依存関係に基づいて決定しました。
外部キー制約により、参照先のデータを先に挿入する必要があります。

## 実行順序

### 1. 基本マスタデータ（依存関係なし）
```sql
-- 言語マスタ
1. 05_insert_data/other/languages.sql

-- 通貨マスタ
2. 05_insert_data/other/money.sql

-- アイコンカテゴリ・アイコン
3. 05_insert_data/other/icons.sql

-- 国家マスタ
4. 05_insert_data/other/countries.sql

-- 学歴マスタ
5. 05_insert_data/child/educations.sql

-- ユーザタイプ
6. 05_insert_data/comment/user_types.sql

-- レポート対象タイプ
7. 05_insert_data/report/reportable_types.sql

-- 通知対象タイプ
8. 05_insert_data/notification/notifiable_types.sql

-- スクリーン
9. 05_insert_data/notification/screens.sql

-- 引き落とし申請ステータス
10. 05_insert_data/bank/withdrawal_request_status.sql

-- お小遣い種類
11. 05_insert_data/bank/allowanceable_types.sql
```

### 2. 認証ユーザー（手動作成またはアプリケーション側）
11.5 05_insert_data\user.sql

### 3. 家族データ（auth.usersに依存）
```sql
-- 家族テーブル（auth.users, iconsに依存）
12. 05_insert_data/child/families.sql
```

### 4. メンバーデータ（families, educationに依存）
```sql
-- メンバーテーブル（families, icons, educationに依存）
13. 05_insert_data/child/children.sql

-- メンバー学年（children, educationに依存）
14. 05_insert_data/child/child_grade.sql

-- 教育期間（children, educationに依存）
15. 05_insert_data/child/education_period.sql

-- フォロー関係（familiesに依存）
16. 05_insert_data/child/follows.sql

-- 経験値レベル設定（familiesに依存）
17. 05_insert_data/child/exp_by_level.sql
```

### 5. サブタイプテーブルデータ
```sql
-- お小遣いテーブルサブタイプ
18. 05_insert_data/child/allowance_table_sub_types.sql

-- レベルテーブルサブタイプ
19. 05_insert_data/child/level_table_sub_types.sql

-- クエストサブクラスタイプ
20. 05_insert_data/quest/quest_subclass_types.sql

-- クエストカテゴリサブクラスタイプ
21. 05_insert_data/quest/quest_category_subclass_types.sql
```

### 6. レベルテーブル関連データ
```sql
-- レベルテーブル関連（children, families, child_level_sub_typesに依存）
22. 05_insert_data/child/level_table.sql
```

### 7. お小遣いテーブル関連データ
```sql
-- お小遣いテーブル関連（children, families, allowance_table_sub_typesに依存）
23. 05_insert_data/child/allowance_table.sql
```

### 8. クエスト関連データ
```sql
-- クエストカテゴリ（quest_category_subclass_types, familiesに依存）
24. 05_insert_data/quest/quest_categories.sql

-- クエスト関連（quest_subclass_types, quest_categories, icons, currenciesに依存）
25. 05_insert_data/quest/quests.sql
   ※このファイルには以下のテーブルのINSERT文が含まれます：
   - quests（基底クエストテーブル）
   - template_quests（テンプレートクエスト）
   - quests_translation（クエスト翻訳）
   - child_quest_status（メンバークエストステータス）
   - child_quest_statuses_translation（ステータス翻訳）
   - family_quests（家族クエスト）
   - shared_quests（共有クエスト）
   - saved_quests（保存クエスト）
   - child_quests（メンバークエスト）
   - quest_details_by_level（クエスト詳細レベル別）
   - quest_details_by_level_translation（クエスト詳細翻訳）
   - quest_request_statuses（クエストリクエストステータス）
   - quest_request_status_translation（リクエストステータス翻訳）
   - quest_exp_by_level（クエスト経験値レベル別）
   - quest_requests（クエストリクエスト）
```

### 9. コメント関連データ
```sql
-- コメント関連（多くのテーブルに依存）
26. 05_insert_data/comment/comment.sql

-- コメントいいね（commentsに依存）
27. 05_insert_data/comment/comment_likes.sql
```

### 10. 通知関連データ
```sql
-- 通知（各テーブルに依存）
28. 05_insert_data/notification/notification.sql
```

### 11. 銀行関連データ
```sql
-- 貯金記録（childrenに依存）
29. 05_insert_data/bank/savings_records.sql

-- お小遣い記録（children, allowanceable_typesに依存）
30. 05_insert_data/bank/allowance_records.sql

-- 引き落とし申請（children, families, withdrawal_request_statusに依存）
31. 05_insert_data/bank/withdrawal_requests.sql
```

### 12. レポート関連データ
```sql
-- レポート（各テーブルに依存）
32. 05_insert_data/report/report.sql
```

## 主要なテストデータの内容

### 言語マスタ
- 日本語、英語、韓国語、中国語、スペイン語、フランス語、ドイツ語など
- 多言語対応のベースデータ

### 通貨マスタ
- 円（JPY）、ドル（USD）、ユーロ（EUR）、ポンド（GBP）、ウォン（KRW）など
- 為替レートも含む

### 家族テストデータ
- 佐藤家、田中家、スミス家、鈴木家
- 日本語・英語の翻訳データ付き

### 学歴マスタ
- 就学前、小学校、中学校、高等学校、大学、大学院、社会人、その他
- 多言語翻訳データ付き

### サブタイプテーブル
- **allowance_table_sub_types**: お小遣いテーブルのサブタイプ（child, family, shared）
- **child_level_sub_types**: レベルテーブルのサブタイプ（child, family, shared）
- **quest_subclass_types**: クエストサブクラスタイプ（template, family, custom）
- **quest_category_subclass_types**: クエストカテゴリサブクラスタイプ（template_quest_categories, family_quest_categories, custom_quest_categories）
- ポリモーフィック関連の外部キー参照で使用

### クエスト関連の包括的データ
quests.sqlファイルには、クエストシステム全体の15のテーブルのテストデータが統合されています：

**基本クエストデータ:**
- quests（基底クエスト）: テンプレート、家族、カスタムクエスト
- template_quests（テンプレートクエスト）
- quests_translation（クエスト翻訳）: 日本語・英語対応

**クエスト進行管理:**
- child_quest_status（メンバークエストステータス）: assigned, in_progress, completed等
- child_quest_statuses_translation（ステータス翻訳）
- child_quests（メンバークエスト）: 各メンバーのクエスト進行状況

**クエスト共有・保存:**
- family_quests（家族クエスト）: 家族が利用しているクエスト
- shared_quests（共有クエスト）: 他家族と共有されているクエスト
- saved_quests（保存クエスト）: 家族がお気に入り登録したクエスト

**クエスト詳細:**
- quest_details_by_level（クエスト詳細レベル別）: 成功条件、報酬、経験値等
- quest_details_by_level_translation（クエスト詳細翻訳）
- quest_exp_by_level（クエスト経験値レベル別）: レベルアップ必要経験値

**クエストリクエスト:**
- quest_request_statuses（クエストリクエストステータス）: pending, approved, rejected等
- quest_request_status_translation（リクエストステータス翻訳）
- quest_requests（クエストリクエスト）: メンバーからの新規/既存クエストリクエスト

**クエストカテゴリ（別ファイル: quest_categories.sql）:**
- 家事手伝い、勉強・学習、運動・スポーツ、片付け・整理、お手伝い全般
- テンプレート、カスタム、家族固有の各タイプ

## 依存関係の詳細

### 基本的な依存関係の流れ
1. **マスタデータ** → **認証ユーザー** → **家族データ** → **機能データ**
2. **languages** → **各翻訳データ**
3. **currencies** → **金額関連データ**
4. **icons** → **アイコン参照データ**
5. **families** → **children** → **各機能データ**

### 特に注意が必要な依存関係
- **auth.users**: 認証システムで事前作成が必要
- **families**: auth.usersとiconsに依存
- **children**: familiesとeducationに依存
- **翻訳テーブル**: 必ずlanguagesテーブルのデータが必要
- **クエスト関連**: カテゴリ → クエスト → 詳細の順序
- **金額関連**: currenciesテーブルのデータが必要

## 実行時の注意点

### 1. 認証ユーザーの事前準備
```sql
-- Supabase等の認証システムを使用する場合
-- 以下のようなUUIDでテストユーザーを事前作成
-- '550e8400-e29b-41d4-a716-446655440001'::uuid
-- '550e8400-e29b-41d4-a716-446655440002'::uuid
-- '550e8400-e29b-41d4-a716-446655440003'::uuid
-- '550e8400-e29b-41d4-a716-446655440004'::uuid
```

### 2. 外部キー制約エラーの回避
- 参照先データが存在することを確認
- IDの整合性を確認
- NULLを許可する外部キーの場合は注意

### 3. 翻訳データの整合性
- language_codeが正しく設定されているか確認
- 翻訳対象のテーブルとlanguagesテーブルの関連を確認

### 4. テストデータの特徴
- 実際のアプリケーションで使用可能な現実的なデータ
- 多言語対応（日本語・英語中心）
- 家族間の関係性やクエストの進行状況を含む
- 履歴データも含む包括的なテストデータ

### 5. 開発・テスト用途
- 本番環境では使用しない
- 開発環境でのテスト用データとして設計
- データの整合性とリアリティを重視
