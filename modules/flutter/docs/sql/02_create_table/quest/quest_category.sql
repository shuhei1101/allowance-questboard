-- クエストカテゴリテーブル（基底クラス）
CREATE TABLE IF NOT EXISTS quest_categories (
    id serial PRIMARY KEY,
    subclass_type int NOT NULL REFERENCES quest_category_subclass_types (id) ON DELETE RESTRICT,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (subclass_type, subclass_id)
);

COMMENT ON TABLE quest_categories IS 'クエストカテゴリの基底テーブル（ポリモーフィック関連）';
COMMENT ON COLUMN quest_categories.id IS 'クエストカテゴリID（主キー）';
COMMENT ON COLUMN quest_categories.subclass_type IS 'サブクラスタイプ（template, custom, family）';
COMMENT ON COLUMN quest_categories.subclass_id IS 'サブクラスID（ポリモーフィック）';
COMMENT ON COLUMN quest_categories.created_at IS '作成日時';
COMMENT ON COLUMN quest_categories.updated_at IS '更新日時';

-- クエストカテゴリ翻訳テーブル
CREATE TABLE IF NOT EXISTS quest_categories_translation (
    id serial PRIMARY KEY,
    quest_category_id int NOT NULL REFERENCES quest_categories (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL CHECK (length(name) > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_category_id, language_code)
);

COMMENT ON TABLE quest_categories_translation IS 'クエストカテゴリの多言語対応テーブル';
COMMENT ON COLUMN quest_categories_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN quest_categories_translation.quest_category_id IS 'クエストカテゴリID（外部キー）';
COMMENT ON COLUMN quest_categories_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN quest_categories_translation.name IS 'カテゴリ名の翻訳（空文字不可）';
COMMENT ON COLUMN quest_categories_translation.created_at IS '作成日時';
COMMENT ON COLUMN quest_categories_translation.updated_at IS '更新日時';

-- テンプレートクエストカテゴリテーブル
CREATE TABLE IF NOT EXISTS template_quest_categories (
    id serial PRIMARY KEY,
    category_id int NOT NULL UNIQUE REFERENCES quest_categories (id) ON DELETE CASCADE,
    code varchar(50) NOT NULL UNIQUE,
    sort_order int DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE template_quest_categories IS 'アプリ提供のテンプレートクエストカテゴリテーブル';
COMMENT ON COLUMN template_quest_categories.id IS 'テンプレートカテゴリID（主キー）';
COMMENT ON COLUMN template_quest_categories.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
COMMENT ON COLUMN template_quest_categories.code IS 'カテゴリコード（一意制約）';
COMMENT ON COLUMN template_quest_categories.sort_order IS '表示順序';
COMMENT ON COLUMN template_quest_categories.is_active IS '有効フラグ';
COMMENT ON COLUMN template_quest_categories.created_at IS '作成日時';
COMMENT ON COLUMN template_quest_categories.updated_at IS '更新日時';

-- カスタムクエストカテゴリテーブル
CREATE TABLE IF NOT EXISTS custom_quest_categories (
    id serial PRIMARY KEY,
    category_id int NOT NULL UNIQUE REFERENCES quest_categories (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE custom_quest_categories IS '家族が作成したカスタムクエストカテゴリテーブル';
COMMENT ON COLUMN custom_quest_categories.id IS 'カスタムカテゴリID（主キー）';
COMMENT ON COLUMN custom_quest_categories.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
COMMENT ON COLUMN custom_quest_categories.family_id IS '作成者の家族ID（外部キー）';
COMMENT ON COLUMN custom_quest_categories.created_at IS '作成日時';
COMMENT ON COLUMN custom_quest_categories.updated_at IS '更新日時';

-- 家族クエストカテゴリテーブル
CREATE TABLE IF NOT EXISTS family_quest_categories (
    id serial PRIMARY KEY,
    category_id int NOT NULL UNIQUE REFERENCES quest_categories (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE family_quest_categories IS '家族固有のクエストカテゴリテーブル';
COMMENT ON COLUMN family_quest_categories.id IS '家族カテゴリID（主キー）';
COMMENT ON COLUMN family_quest_categories.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
COMMENT ON COLUMN family_quest_categories.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN family_quest_categories.created_at IS '作成日時';
COMMENT ON COLUMN family_quest_categories.updated_at IS '更新日時';
