-- アイコンカテゴリテーブル
CREATE TABLE IF NOT EXISTS icon_category (
    id serial PRIMARY KEY,
    code varchar(50) NOT NULL UNIQUE,
    sort_order int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE icon_category IS 'アイコンのカテゴリを管理するテーブル';
COMMENT ON COLUMN icon_category.id IS 'アイコンカテゴリID（主キー）';
COMMENT ON COLUMN icon_category.code IS 'カテゴリコード（一意制約）';
COMMENT ON COLUMN icon_category.sort_order IS '表示順序';
COMMENT ON COLUMN icon_category.is_active IS '有効フラグ';
COMMENT ON COLUMN icon_category.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN icon_category.updated_at IS 'レコードの更新日時';

-- アイコンカテゴリ翻訳テーブル
CREATE TABLE IF NOT EXISTS icon_category_translations (
    id serial PRIMARY KEY,
    category_id int NOT NULL REFERENCES icon_category(id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages(id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (category_id, language_id)
);

COMMENT ON TABLE icon_category_translations IS 'アイコンカテゴリの多言語対応テーブル';
COMMENT ON COLUMN icon_category_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN icon_category_translations.category_id IS 'アイコンカテゴリID（外部キー）';
COMMENT ON COLUMN icon_category_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN icon_category_translations.name IS 'カテゴリ名の翻訳';
COMMENT ON COLUMN icon_category_translations.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN icon_category_translations.updated_at IS 'レコードの更新日時';

-- アイコンテーブル
CREATE TABLE IF NOT EXISTS icons (
    id serial PRIMARY KEY,
    code varchar(100) NOT NULL UNIQUE,  -- アイコンコード
    category_id int REFERENCES icon_category(id) ON DELETE SET NULL,
    sort_order int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE icons IS 'アイコン情報を管理するテーブル';
COMMENT ON COLUMN icons.id IS 'アイコンID（主キー）';
COMMENT ON COLUMN icons.code IS 'アイコンコード（一意制約）';
COMMENT ON COLUMN icons.category_id IS 'アイコンカテゴリID（外部キー、NULL許可）';
COMMENT ON COLUMN icons.sort_order IS '表示順序';
COMMENT ON COLUMN icons.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN icons.updated_at IS 'レコードの更新日時';
