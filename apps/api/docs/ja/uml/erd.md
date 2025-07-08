# お小遣いクエストボードERD

## core
```mermaid
%% core
erDiagram
    %% 基底エンティティ（全テーブル共通のベースクラス）
    %% 実際のテーブルではないため、ER図には含めない
```

## shared
```mermaid
%% shared
erDiagram
    languages {
        String code UK "言語コード"
        String name "言語名"
        Boolean is_active "有効フラグ"
        Integer sort_order "表示順序"
    }

    screens {
        String name UK "スクリーン名"
        String description "スクリーンの説明"
    }

    currencies {
        String code UK "通貨コード"
        String name "通貨名"
        String symbol "通貨記号"
        Boolean is_active "有効フラグ"
        Integer sort_order "表示順序"
    }

    currencies_by_language {
        Integer currency_id FK "currencies.id"
        Integer language_id FK "languages.id"
    }

    educations {
        String code UK "学歴コード"
    }

    educations_translation {
        Integer education_id FK "educations.id"
        String language_id FK "languages.id"
        String name "学歴名の翻訳"
    }

    exchange_rates {
        Integer base_currency_id FK "currencies.id"
        Integer target_currency_id FK "currencies.id"
        Decimal rate "為替レート"
        Date effective_date "適用日"
    }

    %% Relationships
    currencies_by_language }|--|| currencies: ""
    currencies_by_language }|--|| languages: ""
    educations_translation }|--|| educations: ""
    educations_translation }|--|| languages: ""
    exchange_rates }|--|| currencies: "base_currency"
    exchange_rates }|--|| currencies: "target_currency"
```

## ui
```mermaid
%% ui
erDiagram
    icons {
        Integer category_id FK "icon_categories.id"
        Integer sort_order "表示順序"
        Boolean is_active "有効フラグ"
    }

    icon_categories {
        Integer sort_order "表示順序"
        Boolean is_active "有効フラグ"
    }

    icon_categories_translation {
        Integer category_id FK "icon_categories.id"
        String language_id FK "languages.id"
        String name "カテゴリ名の翻訳"
    }

    %% Relationships
    icons }|--|| icon_categories: ""
    icon_categories_translation }|--|| icon_categories: ""
    icon_categories_translation }|--|| languages: ""
```

## auth
```mermaid
%% auth
erDiagram
    user_settings {
        UUID user_id FK,UK "auth.users.id"
        String language_id FK "languages.id"
    }

    user_settings }|--|| languages: ""
    user_settings ||--|| auth_users: ""
```

## family
```mermaid
%% family
erDiagram
    families {
        %% 履歴あり
        String name "家名"
        Integer icon_id FK "icons.id"
        String introduction "説明文"
    }

    family_members {
        UUID user_id UK,FK "auth.users.id"
        String name "名前"
        Integer icon_id FK "icons.id"
        Date birthday "誕生日"
    }

    family_member_types {
        String table_name UK "family_memberタイプのテーブル名"
        String description "タイプの説明"
    }

    family_settings {
        Integer family_id FK "families.id"
        String default_currency_code FK "currencies.code"
        String default_language_code FK "languages.id"
    }

    follows {
        Integer follower_family_id FK "families.id"
        Integer followed_family_id FK "families.id"
        DateTime followed_at "フォロー日時"
    }

    exp_by_level {
        Integer level "レベル"
        Integer required_exp "必要経験値"
    }

    %% Relationships
    families }|--|| icons: ""
    family_members }|--|| icons: ""
    family_settings }|--|| families: ""
    family_settings }|--|| currencies: ""
    family_settings }|--|| languages: ""
    follows }|--|| families: "follower"
    follows }|--|| families: "followed"
```

## parent
```mermaid
%% parent
erDiagram
    parents {
        Integer family_member_id UK,FK "family_members.id"
        Integer family_id UK,FK "families.id"
    }

    parents }|--|| family_members: ""
    parents }|--|| families: ""
```

## child
```mermaid
%% child
erDiagram
    children {
        %% 履歴あり
        Integer family_member_id UK,FK "family_members.id"
        Integer level "レベル"
        Integer exp "経験値"
        Integer balance "お小遣い残高"
    }

    child_settings {
        %% 履歴あり
        Integer child_id FK "children.id"
        Integer allowance_table_id FK "allowance_tables.id"
        Integer quest_difficulty_level "クエスト難易度レベル"
        Boolean auto_approve_quests "クエスト自動承認フラグ"
        Boolean notification_enabled "通知有効フラグ"
    }

    child_grades {
        %% 履歴あり
        Integer child_id FK "children.id"
        Integer education_period_id FK "education_periods.id"
        Integer grade "学年"
        Date start_date "開始日"
        Date end_date "終了日"
    }

    child_statuses {
        %% 履歴あり
        Integer child_id FK "children.id"
        Integer total_quests_completed "完了クエスト総数"
        Integer total_allowance_earned "獲得お小遣い総額"
        Integer current_streak "連続完了日数"
        Integer max_streak "最大連続完了日数"
        DateTime last_quest_completed_at "最後のクエスト完了日時"
    }

    education_periods {
        String code UK "教育課程コード"
        String name "教育課程名"
        Integer duration_years "期間（年）"
        Integer sort_order "表示順序"
    }

    %% Relationships
    children }|--|| family_members: ""
    child_settings }|--|| children: ""
    child_settings }|--|| allowance_tables: ""
    child_grades }|--|| children: ""
    child_grades }|--|| education_periods: ""
    child_statuses }|--|| children: ""
```

## bank
```mermaid
%% bank
erDiagram
    allowance_records {
        Integer child_id FK "children.id"
        Integer allowanceable_type FK "allowanceable_types.id"
        Integer allowanceable_id "お小遣いの対象ID"
        String title "お小遣いのタイトル"
        Integer amount "お小遣い額"
        DateTime recorded_at "お小遣いが記録された日時"
    }

    allowanceable_types {
        String table_name UK "お小遣い支給対象テーブル名"
        String description "説明"
    }

    savings_records {
        Integer saved_by FK "children.id"
        Integer amount "貯金額"
        Integer balance "貯金残高"
        DateTime recorded_at "貯金記録日時"
    }

    withdrawal_requests {
        Integer requested_by FK "children.id"
        Integer amount "引き落とし額"
        Integer status_id FK "withdrawal_request_statuses.id"
        String reason "引き落とし理由"
        DateTime requested_at "引き落とし申請日時"
        DateTime processed_at "処理日時"
        Integer processed_by FK "family_members.id"
    }

    withdrawal_request_statuses {
        String code UK "ステータスコード"
    }

    withdrawal_request_statuses_translation {
        Integer withdrawal_request_status_id FK "withdrawal_request_statuses.id"
        String language_id FK "languages.id"
        String name "ステータス名の翻訳"
    }

    %% Relationships
    allowance_records }|--|| children: ""
    allowance_records }|--|| allowanceable_types: ""
    savings_records }|--|| children: ""
    withdrawal_requests }|--|| children: ""
    withdrawal_requests }|--|| withdrawal_request_statuses: ""
    withdrawal_requests }|--|| family_members: "processed_by"
    withdrawal_request_statuses_translation }|--|| withdrawal_request_statuses: ""
    withdrawal_request_statuses_translation }|--|| languages: ""
```

## allowance_tables
```mermaid
%% allowance_tables
erDiagram
    allowance_tables {
        %% 履歴あり
        Integer subclass_type FK "allowance_table_types.id(継承先のクラス名)"
        Integer subclass_id "継承先のレコードのID"
    }

    allowance_table_types {
        String table_name UK "テーブル名"
    }

    family_allowance_tables {
        %% 履歴あり
        Integer superclass_id UK,FK "allowance_tables.id"
        Integer family_id FK "families.id"
        Boolean is_public "公開フラグ"
    }

    child_allowance_tables {
        %% 履歴あり
        Integer superclass_id UK,FK "allowance_tables.id"
        Integer child_id FK "children.id"
    }

    shared_allowance_tables {
        %% 履歴あり
        Integer family_allowance_table_id FK "family_allowance_tables.id"
        Integer shared_by FK "families.id"
    }

    allowance_by_age {
        %% 履歴あり
        Integer age "年齢"
        Integer amount "お小遣い額"
    }

    %% Relationships
    allowance_tables }|--|| allowance_table_types: ""
    family_allowance_tables }|--|| allowance_tables: ""
    family_allowance_tables }|--|| families: ""
    child_allowance_tables }|--|| allowance_tables: ""
    child_allowance_tables }|--|| children: ""
    shared_allowance_tables }|--|| family_allowance_tables: ""
    shared_allowance_tables }|--|| families: ""
```

## level_tables
```mermaid
%% level_tables
erDiagram
    level_tables {
        Integer subclass_type FK "level_table_types.id(継承先のクラス名)"
        Integer subclass_id "継承先のレコードのID"
    }

    level_table_types {
        String table_name UK "テーブル名"
    }

    family_level_tables {
        Integer superclass_id UK,FK "level_tables.id"
        Integer family_id FK "families.id"
        Boolean is_public "公開フラグ"
    }

    child_level_tables {
        Integer superclass_id UK,FK "level_tables.id"
        Integer child_id FK "children.id"
    }

    shared_level_tables {
        Integer family_level_table_id FK "family_level_tables.id"
        Integer shared_by FK "families.id"
    }

    allowance_by_level {
        Integer level_table_id FK "level_tables.id"
        Integer level "レベル"
        Integer amount "お小遣い額"
    }

    %% Relationships
    level_tables }|--|| level_table_types: ""
    family_level_tables }|--|| level_tables: ""
    family_level_tables }|--|| families: ""
    child_level_tables }|--|| level_tables: ""
    child_level_tables }|--|| children: ""
    shared_level_tables }|--|| family_level_tables: ""
    shared_level_tables }|--|| families: ""
    allowance_by_level }|--|| level_tables: ""
```

## quest/definition
```mermaid
%% quest/definition
erDiagram
    quests {
        String title "クエストタイトル"
        String description "クエスト説明"
        Integer category_id FK "quest_categories.id"
        Integer icon_id FK "icons.id"
        Integer subclass_type FK "quest_types.id"
        Integer subclass_id "サブクラスID"
    }

    quests_translation {
        Integer quest_id FK "quests.id"
        String language_id FK "languages.id"
        String title "タイトルの翻訳"
        String description "説明の翻訳"
    }

    quest_categories {
        Integer subclass_type FK "quest_category_types.id"
        Integer subclass_id "サブクラスID"
    }

    quest_categories_translation {
        Integer quest_category_id FK "quest_categories.id"
        String language_id FK "languages.id"
        String name "カテゴリ名の翻訳"
    }

    quest_category_types {
        String table_name UK "テーブル名"
        String description "説明"
    }

    quest_types {
        String table_name UK "テーブル名"
        String description "説明"
    }

    template_quest_categories {
        Integer category_id UK,FK "quest_categories.id"
        String name UK "カテゴリコード"
        Integer sort_order "表示順序"
        Boolean is_active "有効フラグ"
    }

    template_quest_categories_translation {
        Integer template_category_id FK "template_quest_categories.id"
        String language_id FK "languages.id"
        String name "カテゴリ名の翻訳"
    }

    custom_quest_categories {
        Integer family_id FK "families.id"
        String name "カスタムカテゴリ名"
        Integer sort_order "表示順序"
    }

    %% Relationships
    quests }|--|| quest_categories: ""
    quests }|--|| icons: ""
    quests }|--|| quest_types: ""
    quests_translation }|--|| quests: ""
    quests_translation }|--|| languages: ""
    quest_categories }|--|| quest_category_types: ""
    quest_categories_translation }|--|| quest_categories: ""
    quest_categories_translation }|--|| languages: ""
    template_quest_categories }|--|| quest_categories: ""
    template_quest_categories_translation }|--|| template_quest_categories: ""
    template_quest_categories_translation }|--|| languages: ""
    custom_quest_categories }|--|| families: ""
```

## quest/templates
```mermaid
%% quest/templates
erDiagram
    template_quests {
        Integer superclass_id UK,FK "quests.id"
        Integer difficulty_level "難易度レベル"
        Integer template_category_id FK "template_quest_categories.id"
        Boolean is_active "有効フラグ"
    }

    family_quests {
        Integer superclass_id UK,FK "quests.id"
        Integer family_id FK "families.id"
        Integer difficulty_level "難易度レベル"
        Boolean is_public "公開フラグ"
    }

    shared_quests {
        Integer family_quest_id FK "family_quests.id"
        Integer shared_by FK "families.id"
    }

    %% Relationships
    template_quests }|--|| quests: ""
    template_quests }|--|| template_quest_categories: ""
    family_quests }|--|| quests: ""
    family_quests }|--|| families: ""
    shared_quests }|--|| family_quests: ""
    shared_quests }|--|| families: ""
```

## quest/execution
```mermaid
%% quest/execution
erDiagram
    quest_members {
        Integer quest_id FK "quests.id"
        Integer child_id FK "children.id"
        Integer status_id FK "quest_member_statuses.id"
        DateTime assigned_at "割り当て日時"
        DateTime completed_at "完了日時"
        Integer progress "進捗"
        Integer exp_earned "獲得経験値"
        Integer allowance_earned "獲得お小遣い"
    }

    quest_member_statuses {
        String code UK "ステータスコード"
    }

    quest_member_statuses_translation {
        Integer status_id FK "quest_member_statuses.id"
        String language_id FK "languages.id"
        String name "ステータス名の翻訳"
    }

    quest_requests {
        Integer quest_id FK "quests.id"
        Integer requested_by FK "children.id"
        Integer status_id FK "quest_request_statuses.id"
        String message "リクエストメッセージ"
        DateTime requested_at "リクエスト日時"
        DateTime processed_at "処理日時"
        Integer processed_by FK "family_members.id"
    }

    quest_request_statuses {
        String code UK "ステータスコード"
    }

    quest_request_statuses_translation {
        Integer status_id FK "quest_request_statuses.id"
        String language_id FK "languages.id"
        String name "ステータス名の翻訳"
    }

    %% Relationships
    quest_members }|--|| quests: ""
    quest_members }|--|| children: ""
    quest_members }|--|| quest_member_statuses: ""
    quest_member_statuses_translation }|--|| quest_member_statuses: ""
    quest_member_statuses_translation }|--|| languages: ""
    quest_requests }|--|| quests: ""
    quest_requests }|--|| children: ""
    quest_requests }|--|| quest_request_statuses: ""
    quest_requests }|--|| family_members: "processed_by"
    quest_request_statuses_translation }|--|| quest_request_statuses: ""
    quest_request_statuses_translation }|--|| languages: ""
```

## quest/mechanics
```mermaid
%% quest/mechanics
erDiagram
    quest_details_by_level {
        Integer quest_id FK "quests.id"
        Integer level "レベル"
        String success_criteria "成功条件"
        Integer target_count "目標回数"
        Integer reward "報酬金額"
        Integer currency_id FK "currencies.id"
        Integer child_exp "子供獲得経験値"
        Integer quest_exp "クエスト獲得経験値"
    }

    quest_details_by_level_translation {
        Integer quest_details_by_level_id FK "quest_details_by_level.id"
        String language_id FK "languages.id"
        String success_criteria "成功条件の翻訳"
    }

    quest_exp_by_level {
        Integer quest_id FK "quests.id"
        Integer level "レベル"
        Integer exp_reward "経験値報酬"
    }

    saved_quests {
        Integer quest_id FK "quests.id"
        Integer family_member_id FK "family_members.id"
        DateTime saved_at "保存日時"
    }

    %% Relationships
    quest_details_by_level }|--|| quests: ""
    quest_details_by_level }|--|| currencies: ""
    quest_details_by_level_translation }|--|| quest_details_by_level: ""
    quest_details_by_level_translation }|--|| languages: ""
    quest_exp_by_level }|--|| quests: ""
    saved_quests }|--|| quests: ""
    saved_quests }|--|| family_members: ""
```

## comment
```mermaid
%% comment
erDiagram
    comments {
        Integer commented_by "ユーザID(ポリモーフィック)"
        Integer commentable_type FK "commentable_types.id"
        Integer commentable_id "コメント対象ID"
        Integer parent_comment_id FK "comments.id"
        String body "コメント本文"
        DateTime commented_at "コメント投稿日時"
    }

    comments_translation {
        Integer comment_id FK "comments.id"
        String language_id FK "languages.id"
        String body "コメント本文の翻訳"
    }

    commentable_types {
        String table_name UK "コメント対象テーブル名"
        String description "説明"
    }

    comment_likes {
        Integer comment_id FK "comments.id"
        Integer liked_by FK "family_members.id"
        DateTime liked_at "いいね日時"
    }

    %% Relationships
    comments }|--|| commentable_types: ""
    comments }|--o| comments: "parent_comment"
    comments_translation }|--|| comments: ""
    comments_translation }|--|| languages: ""
    comment_likes }|--|| comments: ""
    comment_likes }|--|| family_members: ""
```

## notification
```mermaid
%% notification
erDiagram
    notifications {
        Integer notifiable_type FK "notifiable_types.id"
        Integer notifiable_id "通知対象ID"
        Integer recipient_id FK "family_members.id"
        String title "通知タイトル"
        String message "通知メッセージ"
        Boolean is_read "既読フラグ"
        DateTime notified_at "通知日時"
        DateTime read_at "既読日時"
    }

    notifiable_types {
        String table_name UK "通知対象テーブル名"
        String description "説明"
    }

    %% Relationships
    notifications }|--|| notifiable_types: ""
    notifications }|--|| family_members: ""
```

## report
```mermaid
%% report
erDiagram
    reports {
        Integer reporter_id FK "family_members.id"
        Integer reportable_type FK "reportable_types.id"
        Integer reportable_id "通報対象ID"
        String reason "通報理由"
        Integer status_id FK "report_statuses.id"
        DateTime reported_at "通報日時"
    }

    report_statuses {
        String code UK "ステータスコード"
    }

    report_statuses_translation {
        Integer report_status_id FK "report_statuses.id"
        String language_id FK "languages.id"
        String status "翻訳されたステータス名"
    }

    reportable_types {
        String table_name UK "レポート対象テーブル名"
        String description "レポート対象タイプの説明"
    }

    %% Relationships
    reports }|--|| family_members: ""
    reports }|--|| reportable_types: ""
    reports }|--|| report_statuses: ""
    report_statuses_translation }|--|| report_statuses: ""
    report_statuses_translation }|--|| languages: ""
```
