-- アイコンカテゴリテーブル
CREATE TABLE IF NOT EXISTS icon_categories (
    id serial PRIMARY KEY,
    code varchar(50) NOT NULL UNIQUE,
    sort_order int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE icon_categories IS 'アイコンのカテゴリを管理するテーブル';
COMMENT ON COLUMN icon_categories.id IS 'アイコンカテゴリID（主キー）';
COMMENT ON COLUMN icon_categories.code IS 'カテゴリコード（一意制約）';
COMMENT ON COLUMN icon_categories.sort_order IS '表示順序';
COMMENT ON COLUMN icon_categories.is_active IS '有効フラグ';
COMMENT ON COLUMN icon_categories.created_at IS '作成日時';
COMMENT ON COLUMN icon_categories.updated_at IS '更新日時';

-- アイコンカテゴリ翻訳テーブル
CREATE TABLE IF NOT EXISTS icon_categories_translation (
    id serial PRIMARY KEY,
    category_id int NOT NULL REFERENCES icon_categories(id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages(id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (category_id, language_code)
);

COMMENT ON TABLE icon_categories_translation IS 'アイコンカテゴリの多言語対応テーブル';
COMMENT ON COLUMN icon_categories_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN icon_categories_translation.category_id IS 'アイコンカテゴリID（外部キー）';
COMMENT ON COLUMN icon_categories_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN icon_categories_translation.name IS 'カテゴリ名の翻訳';
COMMENT ON COLUMN icon_categories_translation.created_at IS '作成日時';
COMMENT ON COLUMN icon_categories_translation.updated_at IS '更新日時';

-- アイコンテーブル
CREATE TABLE IF NOT EXISTS icons (
    id serial PRIMARY KEY,
    code varchar(100) NOT NULL UNIQUE,  -- アイコンコード
    category_id int REFERENCES icon_categories(id) ON DELETE SET NULL,
    sort_order int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE icons IS 'アイコン情報を管理するテーブル';
COMMENT ON COLUMN icons.id IS 'アイコンID（主キー）';
COMMENT ON COLUMN icons.code IS 'アイコンコード（一意制約）';
COMMENT ON COLUMN icons.category_id IS 'アイコンカテゴリID（外部キー、NULL許可）';
COMMENT ON COLUMN icons.sort_order IS '表示順序';
COMMENT ON COLUMN icons.created_at IS '作成日時';
COMMENT ON COLUMN icons.updated_at IS '更新日時';
