-- スキーマ削除
DROP SCHEMA child CASCADE;
DROP SCHEMA quest CASCADE;

-- 家族テーブル削除
DROP TABLE IF EXISTS history.families;
DROP TABLE IF EXISTS history.families_translation;
DROP TABLE IF EXISTS families_settings;
DROP TABLE IF EXISTS families_translation;
DROP TABLE IF EXISTS families;
