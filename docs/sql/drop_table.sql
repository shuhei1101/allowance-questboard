-- 履歴テーブルの削除（最初に削除）
DROP TABLE IF EXISTS history.quest_details_by_level_translation CASCADE;
DROP TABLE IF EXISTS history.quest_details_by_level CASCADE;
DROP TABLE IF EXISTS history.quest_exp_by_level CASCADE;
DROP TABLE IF EXISTS history.quests_translation CASCADE;
DROP TABLE IF EXISTS history.quests CASCADE;
DROP TABLE IF EXISTS history.shared_quests CASCADE;
DROP TABLE IF EXISTS history.family_quests CASCADE;
DROP TABLE IF EXISTS history.reports_translation CASCADE;
DROP TABLE IF EXISTS history.reports CASCADE;
DROP TABLE IF EXISTS history.notifications CASCADE;
DROP TABLE IF EXISTS history.comments_translation CASCADE;
DROP TABLE IF EXISTS history.comments CASCADE;
DROP TABLE IF EXISTS history.allowance_by_level CASCADE;
DROP TABLE IF EXISTS history.shared_level_table CASCADE;
DROP TABLE IF EXISTS history.family_level_table CASCADE;
DROP TABLE IF EXISTS history.child_level_table CASCADE;
DROP TABLE IF EXISTS history.level_table CASCADE;
DROP TABLE IF EXISTS history.allowance_by_age CASCADE;
DROP TABLE IF EXISTS history.shared_allowance_table CASCADE;
DROP TABLE IF EXISTS history.family_allowance_table CASCADE;
DROP TABLE IF EXISTS history.child_allowance_table CASCADE;
DROP TABLE IF EXISTS history.allowance_table CASCADE;
DROP TABLE IF EXISTS history.exp_by_level CASCADE;
DROP TABLE IF EXISTS history.child_stats CASCADE;
DROP TABLE IF EXISTS history.children_settings CASCADE;
DROP TABLE IF EXISTS history.children CASCADE;
DROP TABLE IF EXISTS history.families_translation CASCADE;
DROP TABLE IF EXISTS history.families CASCADE;

-- 子テーブルの削除（外部キーを持つテーブル）
DROP TABLE IF EXISTS child_quests CASCADE;
DROP TABLE IF EXISTS child_quest_statuses_translation CASCADE;
DROP TABLE IF EXISTS child_quest_status CASCADE;
DROP TABLE IF EXISTS template_quests CASCADE;
DROP TABLE IF EXISTS saved_quests CASCADE;
DROP TABLE IF EXISTS family_quests CASCADE;
DROP TABLE IF EXISTS shared_quests CASCADE;
DROP TABLE IF EXISTS quest_details_by_level_translation CASCADE;
DROP TABLE IF EXISTS quest_details_by_level CASCADE;
DROP TABLE IF EXISTS quest_exp_by_level CASCADE;
DROP TABLE IF EXISTS quests_translation CASCADE;
DROP TABLE IF EXISTS quests CASCADE;
DROP TABLE IF EXISTS quest_requests CASCADE;
DROP TABLE IF EXISTS quest_request_status_translation CASCADE;
DROP TABLE IF EXISTS quest_request_statuses CASCADE;
DROP TABLE IF EXISTS family_quest_categories CASCADE;
DROP TABLE IF EXISTS custom_quest_categories CASCADE;
DROP TABLE IF EXISTS template_quest_categories CASCADE;
DROP TABLE IF EXISTS quest_categories_translation CASCADE;
DROP TABLE IF EXISTS quest_categories CASCADE;
DROP TABLE IF EXISTS quest_category_subclass_types CASCADE;
DROP TABLE IF EXISTS quest_subclass_types CASCADE;

-- レポート関連
DROP TABLE IF EXISTS reports_translation CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS report_statuses CASCADE;
DROP TABLE IF EXISTS reportable_types CASCADE;

-- 通知関連
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS notifiable_types_translation CASCADE;
DROP TABLE IF EXISTS notifiable_types CASCADE;
DROP TABLE IF EXISTS screens CASCADE;

-- コメント関連
DROP TABLE IF EXISTS comment_likes CASCADE;
DROP TABLE IF EXISTS comments_translation CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS commentable_types CASCADE;

-- メンバー関連詳細テーブル
DROP TABLE IF EXISTS allowance_by_level CASCADE;
DROP TABLE IF EXISTS allowance_by_age CASCADE;
DROP TABLE IF EXISTS shared_level_table CASCADE;
DROP TABLE IF EXISTS family_level_table CASCADE;
DROP TABLE IF EXISTS child_level_table CASCADE;
DROP TABLE IF EXISTS level_table CASCADE;
DROP TABLE IF EXISTS child_level_sub_types CASCADE;
DROP TABLE IF EXISTS shared_allowance_table CASCADE;
DROP TABLE IF EXISTS family_allowance_table CASCADE;
DROP TABLE IF EXISTS child_allowance_table CASCADE;
DROP TABLE IF EXISTS allowance_table CASCADE;
DROP TABLE IF EXISTS allowance_table_sub_types CASCADE;
DROP TABLE IF EXISTS exp_by_level CASCADE;
DROP TABLE IF EXISTS child_stats CASCADE;
DROP TABLE IF EXISTS children_settings CASCADE;
DROP TABLE IF EXISTS child_grade CASCADE;
DROP TABLE IF EXISTS education_period CASCADE;
DROP TABLE IF EXISTS educations_translation CASCADE;
DROP TABLE IF EXISTS educations CASCADE;
DROP TABLE IF EXISTS follows CASCADE;

-- メンバー基本テーブル
DROP TABLE IF EXISTS children CASCADE;

-- 家族関連
DROP TABLE IF EXISTS families_settings CASCADE;
DROP TABLE IF EXISTS families_translation CASCADE;
DROP TABLE IF EXISTS families CASCADE;

-- ユーザー設定
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS user_types CASCADE;

-- 銀行関連
DROP TABLE IF EXISTS withdrawal_requests CASCADE;
DROP TABLE IF EXISTS withdrawal_request_statuses_translation CASCADE;
DROP TABLE IF EXISTS withdrawal_request_status CASCADE;
DROP TABLE IF EXISTS savings_records_translation CASCADE;
DROP TABLE IF EXISTS savings_records CASCADE;
DROP TABLE IF EXISTS allowance_records CASCADE;
DROP TABLE IF EXISTS allowanceable_types CASCADE;

-- その他マスタテーブル
DROP TABLE IF EXISTS exchange_rates CASCADE;
DROP TABLE IF EXISTS currencies CASCADE;
DROP TABLE IF EXISTS icon_categories_translation CASCADE;
DROP TABLE IF EXISTS icons CASCADE;
DROP TABLE IF EXISTS icon_categories CASCADE;
DROP TABLE IF EXISTS languages CASCADE;
DROP TABLE IF EXISTS countries CASCADE;

-- historyスキーマの削除（空になった場合）
DROP SCHEMA IF EXISTS history CASCADE;
