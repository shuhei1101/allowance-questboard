# CREATE TABLE実行順序

各CREATE TABLEの実行順序を依存関係に基づいて決定しました。
外部キー制約により、参照先のテーブルを先に作成する必要があります。

## 実行順序

### 1. スキーマ作成
```sql
-- historyスキーマ作成
1. 01_create_schema.sql
```

### 2. 基本マスタテーブル（依存関係なし）
```sql
-- 言語マスタ
2. 02_create_table/other/languages.sql

-- 通貨マスタ
3. 02_create_table/other/money.sql

-- アイコン関連
4. 02_create_table/other/icons.sql

-- 国家マスタ
5. 02_create_table/other/countries.sql

-- 学歴マスタ
6. 02_create_table/child/educations.sql

-- ユーザタイプ
7. 02_create_table/comment/user_types.sql

-- レポート対象タイプ
8. 02_create_table/report/reportable_types.sql

-- レポートステータス
9. 02_create_table/report/report.sql

-- 通知対象タイプ
10. 02_create_table/notification/notifiable_types.sql

-- スクリーン
11. 02_create_table/notification/screens.sql

-- 引き落とし申請ステータス
12. 02_create_table/bank/withdrawal_request_status.sql

-- お小遣い種類
13. 02_create_table/bank/allowanceable_types.sql
```

### 3. 認証システム（auth.users）に依存するテーブル
```sql
-- ユーザ設定（auth.usersに依存）
14. 02_create_table/child/user_settings.sql

-- 家族テーブル（auth.usersに依存）
15. 02_create_table/child/families.sql
```

### 4. 家族テーブルに依存するテーブル
```sql
-- メンバーテーブル（families, icons, educationに依存）
16. 02_create_table/child/children.sql

-- メンバー学年（children, educationに依存）
17. 02_create_table/child/child_grade.sql

-- 教育期間（children, educationに依存）
18. 02_create_table/child/education_reriod.sql

-- フォロー関係（familiesに依存）
19. 02_create_table/child/follows.sql

-- 経験値レベル設定（familiesに依存）
20. 02_create_table/child/exp_by_level.sql
```

### 5. サブタイプテーブル関連
```sql
-- お小遣いテーブルサブタイプ
21. 02_create_table/child/allowance_table_sub_types.sql

-- レベルテーブルサブタイプ
22. 02_create_table/child/level_table_sub_types.sql
```

### 6. お小遣いテーブル関連（children, families, allowance_table_sub_typesに依存）
```sql
-- お小遣いテーブル基底クラス
23. 02_create_table/child/allowance_table.sql
```

### 7. レベルテーブル関連（children, families, child_level_sub_typesに依存）
```sql
-- レベルテーブル基底クラス
24. 02_create_table/child/level_table.sql
```

### 8. クエストサブクラスタイプ（依存関係なし）
```sql
-- クエストサブクラスタイプ
25. 02_create_table/quest/quest_subclass_types.sql

-- クエストカテゴリサブクラスタイプ
26. 02_create_table/quest/quest_category_subclass_types.sql
```

### 9. クエストカテゴリ関連（quest_category_subclass_typesに依存）
```sql
-- クエストカテゴリ基底クラス
27. 02_create_table/quest/quest_categories.sql
```

### 10. コメント関連（依存関係が複雑なため後回し）
```sql
-- コメント関連
28. 02_create_table/comment/comment.sql

-- コメントいいね（commentsに依存）
29. 02_create_table/comment/comment_likes.sql
```

### 11. クエスト関連（quest_subclass_types, quest_categories, iconsに依存）
```sql
-- クエストテーブル
30. 02_create_table/quest/quests.sql

-- クエスト詳細（quests, currenciesに依存）
31. 02_create_table/quest/quest_details.sql

-- クエスト経験値（questsに依存）
32. 02_create_table/quest/quest_exp_by_level.sql

-- クエストリクエスト（families, children, questsに依存）
33. 02_create_table/quest/quest_requests.sql
```


### 12. 通知関連（各テーブルに依存）
```sql
-- 通知テーブル
34. 02_create_table/notification/notification.sql
```

### 13. 銀行関連（childrenに依存）
```sql
-- 貯金記録（childrenに依存）
35. 02_create_table/bank/savings_records.sql

-- お小遣い記録（children, allowanceable_typesに依存）
36. 02_create_table/bank/allowance_records.sql

-- 引き落とし申請（children, families, withdrawal_request_statusに依存）
37. 02_create_table/bank/withdrawal_request_status.sql
38. 02_create_table/bank/withdrawal_requests.sql
```

-- お小遣い記録（children, allowanceable_typesに依存）
35. 02_create_table/bank/allowance_records.sql

-- 引き落とし申請（children, families, withdrawal_request_statusに依存）
36. 02_create_table/bank/withdrawal_request_status.sql
37. 02_create_table/bank/withdrawal_requests.sql
```

## 依存関係の詳細

### 基本的な依存関係の流れ
1. **マスタテーブル** → **認証関連** → **家族・メンバー** → **機能テーブル**
2. **auth.users** → **families** → **children** → **各機能テーブル**
3. **languages** → **各翻訳テーブル**
4. **currencies** → **金額関連テーブル**
5. **icons** → **アイコン参照テーブル**

### 特に注意が必要な依存関係
- `children`テーブルは`families`テーブルに依存
- 多くの機能テーブルが`children`と`families`に依存
- 翻訳テーブルは必ず`languages`テーブルに依存
- 金額関連テーブルは`currencies`テーブルに依存
- 履歴テーブル（`history.`スキーマ）は対応する元テーブルの作成後

### 循環参照の回避
一部のテーブル間で循環参照がある場合は、以下の方法で回避：
1. 外部キー制約を後から追加
2. NULLを許可する外部キー設計
3. 適切な作成順序での設計

## 実行時の注意点
1. **スキーマの作成**を最初に実行する
2. **外部キー制約エラー**が発生した場合は依存関係を再確認
3. **auth.users**テーブルがSupabase等の認証システムで提供される前提
4. **履歴テーブル**は対応する元テーブル作成後に実行
5. **翻訳テーブル**は元テーブルと言語マスタ作成後に実行
