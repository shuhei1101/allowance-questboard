-- follows
CREATE TABLE IF NOT EXISTS follows (
    id serial PRIMARY KEY,
    follower_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    followed_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
);

COMMENT ON TABLE follows IS 'オンライン家族間のフォロー関係を管理するテーブル';
COMMENT ON COLUMN follows.follower_id IS 'フォロワーの家族ID';
COMMENT ON COLUMN follows.followed_id IS 'フォローされている家族ID';
COMMENT ON COLUMN follows.created_at IS 'フォローが作成された日時';
