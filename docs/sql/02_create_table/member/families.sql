-- 家族テーブル
CREATE TABLE IF NOT EXISTS families (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
    icon_id int REFERENCES icons (id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE families IS '家族（親）の基本情報を管理するテーブル';
COMMENT ON COLUMN families.id IS '家族ID（主キー）';
COMMENT ON COLUMN families.user_id IS 'ユーザID（外部キー、一意制約）';
COMMENT ON COLUMN families.icon_id IS 'アイコンID（外部キー、NULL許可）';
COMMENT ON COLUMN families.created_at IS '作成日時';
COMMENT ON COLUMN families.updated_at IS '更新日時';

-- 家族履歴テーブル
CREATE TABLE IF NOT EXISTS history.families (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    icon_id int REFERENCES icons (id) ON DELETE SET NULL,
    bio text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.families IS '家族情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.families.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.families.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.families.user_id IS 'ユーザID（外部キー）';
COMMENT ON COLUMN history.families.icon_id IS 'アイコンID（履歴時点）';
COMMENT ON COLUMN history.families.bio IS '自己紹介（履歴時点）';
COMMENT ON COLUMN history.families.created_at IS '元作成日時';
COMMENT ON COLUMN history.families.updated_at IS '元更新日時';
COMMENT ON COLUMN history.families.recorded_at IS '履歴記録日時';

-- 家族翻訳テーブル
CREATE TABLE IF NOT EXISTS families_translations (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    bio text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (family_id, language_id)
);

COMMENT ON TABLE families_translations IS '家族情報の多言語対応テーブル';
COMMENT ON COLUMN families_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN families_translations.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN families_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN families_translations.name IS '家族名の翻訳';
COMMENT ON COLUMN families_translations.bio IS '自己紹介の翻訳';
COMMENT ON COLUMN families_translations.created_at IS '作成日時';
COMMENT ON COLUMN families_translations.updated_at IS '更新日時';

-- 家族翻訳履歴テーブル
CREATE TABLE IF NOT EXISTS history.families_translations (
    id serial PRIMARY KEY,
    family_translation_id int NOT NULL REFERENCES families_translations (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    bio text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.families_translations IS '家族翻訳情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.families_translations.id IS '翻訳履歴ID（主キー）';
COMMENT ON COLUMN history.families_translations.family_translation_id IS '元の翻訳ID（外部キー）';
COMMENT ON COLUMN history.families_translations.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.families_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN history.families_translations.name IS '家族名の翻訳（履歴時点）';
COMMENT ON COLUMN history.families_translations.bio IS '自己紹介の翻訳（履歴時点）';
COMMENT ON COLUMN history.families_translations.created_at IS '元作成日時';
COMMENT ON COLUMN history.families_translations.updated_at IS '元更新日時';
COMMENT ON COLUMN history.families_translations.recorded_at IS '履歴記録日時';

-- 家族設定テーブル
CREATE TABLE IF NOT EXISTS families_settings (
    family_id int PRIMARY KEY REFERENCES families (id) ON DELETE CASCADE,
    currency_id int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE families_settings IS '家族の設定情報を管理するテーブル';
COMMENT ON COLUMN families_settings.family_id IS '家族ID（主キー、外部キー）';
COMMENT ON COLUMN families_settings.currency_id IS '通貨ID（外部キー）';
COMMENT ON COLUMN families_settings.created_at IS '作成日時';
COMMENT ON COLUMN families_settings.updated_at IS '更新日時';
