CREATE TABLE IF NOT EXISTS screens (
    id serial PRIMARY KEY,
    -- スクリーン名
    name varchar NOT NULL UNIQUE,  -- quest_page, comment_page, etc.
    -- スクリーンの説明
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE screens IS 'アプリケーションの画面/ページを管理するテーブル';
COMMENT ON COLUMN screens.id IS 'スクリーンID（主キー）';
COMMENT ON COLUMN screens.name IS 'スクリーン名（一意制約）';
COMMENT ON COLUMN screens.description IS 'スクリーンの説明';
COMMENT ON COLUMN screens.created_at IS '作成日時';
COMMENT ON COLUMN screens.updated_at IS '更新日時';
