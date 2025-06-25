-- クエストカテゴリテーブル（基底クラス）
CREATE TABLE IF NOT EXISTS quest_category (
    id serial PRIMARY KEY,
    subclass_type int NOT NULL REFERENCES quest_category_subclass_types (id) ON DELETE RESTRICT,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (subclass_type, subclass_id)
);

COMMENT ON TABLE quest_category IS 'クエストカテゴリの基底テーブル（ポリモーフィック関連）';
COMMENT ON COLUMN quest_category.id IS 'クエストカテゴリID（主キー）';
COMMENT ON COLUMN quest_category.subclass_type IS 'サブクラスタイプ（template, custom, family）';
COMMENT ON COLUMN quest_category.subclass_id IS 'サブクラスID（ポリモーフィック）';
COMMENT ON COLUMN quest_category.created_at IS '作成日時';
COMMENT ON COLUMN quest_category.updated_at IS '更新日時';

-- クエストカテゴリ翻訳テーブル
CREATE TABLE IF NOT EXISTS quest_category_translations (
    id serial PRIMARY KEY,
    quest_category_id int NOT NULL REFERENCES quest_category (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL CHECK (length(name) > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_category_id, language_id)
);

COMMENT ON TABLE quest_category_translations IS 'クエストカテゴリの多言語対応テーブル';
COMMENT ON COLUMN quest_category_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN quest_category_translations.quest_category_id IS 'クエストカテゴリID（外部キー）';
COMMENT ON COLUMN quest_category_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN quest_category_translations.name IS 'カテゴリ名の翻訳（空文字不可）';
COMMENT ON COLUMN quest_category_translations.created_at IS '作成日時';
COMMENT ON COLUMN quest_category_translations.updated_at IS '更新日時';

-- テンプレートクエストカテゴリテーブル
CREATE TABLE IF NOT EXISTS template_quest_category (
    id serial PRIMARY KEY,
    category_id int NOT NULL UNIQUE REFERENCES quest_category (id) ON DELETE CASCADE,
    code varchar(50) NOT NULL UNIQUE,
    sort_order int DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE template_quest_category IS 'アプリ提供のテンプレートクエストカテゴリテーブル';
COMMENT ON COLUMN template_quest_category.id IS 'テンプレートカテゴリID（主キー）';
COMMENT ON COLUMN template_quest_category.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
COMMENT ON COLUMN template_quest_category.code IS 'カテゴリコード（一意制約）';
COMMENT ON COLUMN template_quest_category.sort_order IS '表示順序';
COMMENT ON COLUMN template_quest_category.is_active IS '有効フラグ';
COMMENT ON COLUMN template_quest_category.created_at IS '作成日時';
COMMENT ON COLUMN template_quest_category.updated_at IS '更新日時';

-- カスタムクエストカテゴリテーブル
CREATE TABLE IF NOT EXISTS custom_quest_category (
    id serial PRIMARY KEY,
    category_id int NOT NULL UNIQUE REFERENCES quest_category (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE custom_quest_category IS '家族が作成したカスタムクエストカテゴリテーブル';
COMMENT ON COLUMN custom_quest_category.id IS 'カスタムカテゴリID（主キー）';
COMMENT ON COLUMN custom_quest_category.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
COMMENT ON COLUMN custom_quest_category.family_id IS '作成者の家族ID（外部キー）';
COMMENT ON COLUMN custom_quest_category.created_at IS '作成日時';
COMMENT ON COLUMN custom_quest_category.updated_at IS '更新日時';

-- 家族クエストカテゴリテーブル
CREATE TABLE IF NOT EXISTS family_quest_category (
    id serial PRIMARY KEY,
    category_id int NOT NULL UNIQUE REFERENCES quest_category (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE family_quest_category IS '家族固有のクエストカテゴリテーブル';
COMMENT ON COLUMN family_quest_category.id IS '家族カテゴリID（主キー）';
COMMENT ON COLUMN family_quest_category.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
COMMENT ON COLUMN family_quest_category.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN family_quest_category.created_at IS '作成日時';
COMMENT ON COLUMN family_quest_category.updated_at IS '更新日時';
