-- コメントいいねテーブル
CREATE TABLE IF NOT EXISTS comment_likes (
    id serial PRIMARY KEY,
    comment_id int NOT NULL REFERENCES comments (id) ON DELETE CASCADE,
    user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    user_id int NOT NULL,  -- ユーザID (family_id or child_id)
    liked_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (comment_id, user_type, user_id)
);

COMMENT ON TABLE comment_likes IS 'コメントへのいいねを管理するテーブル';
COMMENT ON COLUMN comment_likes.id IS 'いいねID（主キー）';
COMMENT ON COLUMN comment_likes.comment_id IS 'コメントID（外部キー）';
COMMENT ON COLUMN comment_likes.user_type IS 'ユーザタイプID（外部キー）';
COMMENT ON COLUMN comment_likes.user_id IS 'ユーザID（ポリモーフィック：family_id または child_id）';
COMMENT ON COLUMN comment_likes.liked_at IS 'いいねした日時';
COMMENT ON COLUMN comment_likes.created_at IS '作成日時';
COMMENT ON COLUMN comment_likes.updated_at IS '更新日時';
