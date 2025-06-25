-- 言語マスタテーブル
CREATE TABLE IF NOT EXISTS languages (
    id serial PRIMARY KEY,
    code varchar(10) NOT NULL UNIQUE,  -- en, ja
    name varchar(100) NOT NULL,  -- English, Japanese
    is_active boolean NOT NULL DEFAULT true,
    sort_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE languages IS 'システムでサポートする言語を管理するマスタテーブル';
COMMENT ON COLUMN languages.id IS '言語ID（主キー）';
COMMENT ON COLUMN languages.code IS '言語コード（ISO 639-1準拠、例：en, ja）';
COMMENT ON COLUMN languages.name IS '言語名（例：English, Japanese）';
COMMENT ON COLUMN languages.is_active IS '有効フラグ';
COMMENT ON COLUMN languages.sort_order IS '表示順序（小さい値が上位）';
COMMENT ON COLUMN languages.created_at IS '作成日時';
COMMENT ON COLUMN languages.updated_at IS '更新日時';
