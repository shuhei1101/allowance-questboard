-- 国家マスタテーブル
CREATE TABLE IF NOT EXISTS countries (
    id serial PRIMARY KEY,
    name varchar NOT NULL UNIQUE,
    icon_id integer REFERENCES icons (id) ON DELETE SET NULL,
    is_active boolean NOT NULL DEFAULT true,
    sort_order int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE countries IS '国家情報を管理するマスタテーブル';
COMMENT ON COLUMN countries.id IS '国家ID（主キー）';
COMMENT ON COLUMN countries.name IS '国家名（英語）';
COMMENT ON COLUMN countries.icon_id IS '国旗アイコンID（外部キー、NULL許可）';
COMMENT ON COLUMN countries.is_active IS '有効フラグ';
COMMENT ON COLUMN countries.sort_order IS '表示順序';
COMMENT ON COLUMN countries.created_at IS '作成日時';
COMMENT ON COLUMN countries.updated_at IS '更新日時';
