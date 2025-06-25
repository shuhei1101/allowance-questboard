-- 通知対象タイプテーブル
CREATE TABLE IF NOT EXISTS notifiable_types (
    id serial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,  -- family, child, quest, comment
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE notifiable_types IS '通知対象となるオブジェクトのタイプを管理するテーブル';
COMMENT ON COLUMN notifiable_types.id IS '通知対象タイプID（主キー）';
COMMENT ON COLUMN notifiable_types.type IS '通知対象タイプコード（family, child, quest, comment等）';
COMMENT ON COLUMN notifiable_types.description IS '通知対象タイプの説明';
COMMENT ON COLUMN notifiable_types.created_at IS '作成日時';
COMMENT ON COLUMN notifiable_types.updated_at IS '更新日時';

-- 通知対象タイプ翻訳テーブル
CREATE TABLE IF NOT EXISTS notifiable_types_translation (
    id serial PRIMARY KEY,
    notifiable_type_id int NOT NULL REFERENCES notifiable_types (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (notifiable_type_id, language_code)
);

COMMENT ON TABLE notifiable_types_translation IS '通知対象タイプの多言語対応テーブル';
COMMENT ON COLUMN notifiable_types_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN notifiable_types_translation.notifiable_type_id IS '通知対象タイプID（外部キー）';
COMMENT ON COLUMN notifiable_types_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN notifiable_types_translation.description IS '通知対象タイプ説明の翻訳';
COMMENT ON COLUMN notifiable_types_translation.created_at IS '作成日時';
COMMENT ON COLUMN notifiable_types_translation.updated_at IS '更新日時';
