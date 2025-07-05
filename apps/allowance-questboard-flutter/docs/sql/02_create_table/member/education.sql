-- 学歴マスタテーブル
CREATE TABLE IF NOT EXISTS educations (
    id serial PRIMARY KEY,
    code varchar(20) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE educations IS '学歴の種類を管理するマスタテーブル';
COMMENT ON COLUMN educations.id IS '学歴ID（主キー）';
COMMENT ON COLUMN educations.code IS '学歴コード（例：elementary, junior_high, high_school等）';
COMMENT ON COLUMN educations.created_at IS '作成日時';
COMMENT ON COLUMN educations.updated_at IS '更新日時';

-- 学歴翻訳テーブル
CREATE TABLE IF NOT EXISTS educations_translation (
    id serial PRIMARY KEY,
    education_id int NOT NULL REFERENCES educations (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (education_id, language_code)
);

COMMENT ON TABLE educations_translation IS '学歴の多言語対応テーブル';
COMMENT ON COLUMN educations_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN educations_translation.education_id IS '学歴ID（外部キー）';
COMMENT ON COLUMN educations_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN educations_translation.name IS '学歴名の翻訳';
COMMENT ON COLUMN educations_translation.created_at IS '作成日時';
COMMENT ON COLUMN educations_translation.updated_at IS '更新日時';
