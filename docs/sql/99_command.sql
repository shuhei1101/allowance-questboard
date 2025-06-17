-- スキーマ削除
DROP SCHEMA member CASCADE;

-- 家族テーブル削除
DROP TABLE IF EXISTS history.families;
DROP TABLE IF EXISTS history.families_translations;
DROP TABLE IF EXISTS public.families_settings;
DROP TABLE IF EXISTS public.families_translations;
DROP TABLE IF EXISTS public.families;
