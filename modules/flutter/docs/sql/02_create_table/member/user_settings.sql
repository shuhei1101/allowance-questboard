-- ユーザ設定テーブル
CREATE TABLE IF NOT EXISTS user_settings (
    user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE user_settings IS 'ユーザの基本設定を管理するテーブル';
COMMENT ON COLUMN user_settings.user_id IS 'ユーザID（主キー、外部キー）';
COMMENT ON COLUMN user_settings.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN user_settings.created_at IS '作成日時';
COMMENT ON COLUMN user_settings.updated_at IS '更新日時';
