-- 学歴マスタテーブル
CREATE TABLE IF NOT EXISTS education (
    id serial PRIMARY KEY,
    code varchar(20) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE education IS '学歴の種類を管理するマスタテーブル';
COMMENT ON COLUMN education.id IS '学歴ID（主キー）';
COMMENT ON COLUMN education.code IS '学歴コード（例：elementary, junior_high, high_school等）';
COMMENT ON COLUMN education.created_at IS '作成日時';
COMMENT ON COLUMN education.updated_at IS '更新日時';

-- 学歴翻訳テーブル
CREATE TABLE IF NOT EXISTS education_translations (
    id serial PRIMARY KEY,
    education_id int NOT NULL REFERENCES education (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (education_id, language_id)
);

COMMENT ON TABLE education_translations IS '学歴の多言語対応テーブル';
COMMENT ON COLUMN education_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN education_translations.education_id IS '学歴ID（外部キー）';
COMMENT ON COLUMN education_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN education_translations.name IS '学歴名の翻訳';
COMMENT ON COLUMN education_translations.created_at IS '作成日時';
COMMENT ON COLUMN education_translations.updated_at IS '更新日時';
