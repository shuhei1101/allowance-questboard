-- フォロー関係テーブル
CREATE TABLE IF NOT EXISTS follows (
    id serial PRIMARY KEY,
    follower_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    followed_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (follower_id, followed_id),
    CHECK (follower_id != followed_id)
);

COMMENT ON TABLE follows IS 'オンライン家族間のフォロー関係を管理するテーブル';
COMMENT ON COLUMN follows.id IS 'フォローID（主キー）';
COMMENT ON COLUMN follows.follower_id IS 'フォロワーの家族ID（外部キー）';
COMMENT ON COLUMN follows.followed_id IS 'フォローされている家族ID（外部キー）';
COMMENT ON COLUMN follows.created_at IS 'フォローが作成された日時';
COMMENT ON COLUMN follows.updated_at IS '更新日時';
