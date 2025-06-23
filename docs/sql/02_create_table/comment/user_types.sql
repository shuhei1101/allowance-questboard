-- ユーザタイプテーブル
CREATE TABLE IF NOT EXISTS user_types (
    id serial PRIMARY KEY,
    type varchar(20) NOT NULL UNIQUE,  -- family, member
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE user_types IS 'ユーザのタイプを分類するテーブル';
COMMENT ON COLUMN user_types.id IS 'ユーザタイプID（主キー）';
COMMENT ON COLUMN user_types.type IS 'ユーザタイプコード（family, member等）';
COMMENT ON COLUMN user_types.description IS 'ユーザタイプの説明';
COMMENT ON COLUMN user_types.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN user_types.updated_at IS 'レコードの更新日時';
