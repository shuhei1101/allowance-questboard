-- コメント可能タイプテーブル
CREATE TABLE IF NOT EXISTS commentable_types (
    id serial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,  -- quests, comments
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE commentable_types IS 'コメント可能なオブジェクトのタイプを管理するテーブル';
COMMENT ON COLUMN commentable_types.id IS 'コメント可能タイプID（主キー）';
COMMENT ON COLUMN commentable_types.type IS 'コメント可能タイプコード（quests, comments等）';
COMMENT ON COLUMN commentable_types.description IS 'コメント可能タイプの説明';
COMMENT ON COLUMN commentable_types.created_at IS '作成日時';
COMMENT ON COLUMN commentable_types.updated_at IS '更新日時';

-- コメントテーブル
CREATE TABLE IF NOT EXISTS comments (
    id serial PRIMARY KEY,
    user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    user_id int NOT NULL,  -- ユーザID (family_id or child_id)
    commentable_type int NOT NULL REFERENCES commentable_types (id) ON DELETE RESTRICT,
    commentable_id int NOT NULL,
    parent_comment_id int REFERENCES comments (id) ON DELETE CASCADE,
    body text NOT NULL CHECK (length(body) > 0),
    commented_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE comments IS 'コメントを管理するテーブル';
COMMENT ON COLUMN comments.id IS 'コメントID（主キー）';
COMMENT ON COLUMN comments.user_type IS 'ユーザタイプID（外部キー）';
COMMENT ON COLUMN comments.user_id IS 'ユーザID（ポリモーフィック：family_id または child_id）';
COMMENT ON COLUMN comments.commentable_type IS 'コメント対象タイプID（外部キー）';
COMMENT ON COLUMN comments.commentable_id IS 'コメント対象ID（ポリモーフィック）';
COMMENT ON COLUMN comments.parent_comment_id IS '親コメントID（返信の場合）';
COMMENT ON COLUMN comments.body IS 'コメント本文（空文字不可）';
COMMENT ON COLUMN comments.commented_at IS 'コメント投稿日時';
COMMENT ON COLUMN comments.created_at IS '作成日時';
COMMENT ON COLUMN comments.updated_at IS '更新日時';

-- コメント履歴テーブル
CREATE TABLE IF NOT EXISTS history.comments (
    id serial PRIMARY KEY,
    comment_id int NOT NULL REFERENCES comments (id) ON DELETE CASCADE,
    user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    user_id int NOT NULL,  -- ユーザID (family_id or child_id)
    commentable_type int NOT NULL REFERENCES commentable_types (id) ON DELETE RESTRICT,
    commentable_id int NOT NULL,
    parent_comment_id int REFERENCES comments (id) ON DELETE CASCADE,
    body text NOT NULL,
    commented_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.comments IS 'コメントの変更履歴を管理するテーブル';
COMMENT ON COLUMN history.comments.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.comments.comment_id IS '元のコメントID（外部キー）';
COMMENT ON COLUMN history.comments.user_type IS 'ユーザタイプID（外部キー）';
COMMENT ON COLUMN history.comments.user_id IS 'ユーザID（ポリモーフィック）';
COMMENT ON COLUMN history.comments.commentable_type IS 'コメント対象タイプID（外部キー）';
COMMENT ON COLUMN history.comments.commentable_id IS 'コメント対象ID（ポリモーフィック）';
COMMENT ON COLUMN history.comments.parent_comment_id IS '親コメントID';
COMMENT ON COLUMN history.comments.body IS 'コメント本文（履歴時点）';
COMMENT ON COLUMN history.comments.commented_at IS 'コメント投稿日時';
COMMENT ON COLUMN history.comments.created_at IS '元作成日時';
COMMENT ON COLUMN history.comments.updated_at IS '元更新日時';
COMMENT ON COLUMN history.comments.recorded_at IS '履歴記録日時';

-- コメント翻訳テーブル
CREATE TABLE IF NOT EXISTS comments_translation (
    id serial PRIMARY KEY,
    comment_id int NOT NULL REFERENCES comments (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    body text NOT NULL CHECK (length(body) > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (comment_id, language_code)
);

COMMENT ON TABLE comments_translation IS 'コメントの多言語対応テーブル';
COMMENT ON COLUMN comments_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN comments_translation.comment_id IS 'コメントID（外部キー）';
COMMENT ON COLUMN comments_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN comments_translation.body IS 'コメント本文の翻訳（空文字不可）';
COMMENT ON COLUMN comments_translation.created_at IS '作成日時';
COMMENT ON COLUMN comments_translation.updated_at IS '更新日時';

-- コメント翻訳履歴テーブル
CREATE TABLE IF NOT EXISTS history.comments_translation (
    id serial PRIMARY KEY,
    comment_translation_id int NOT NULL REFERENCES comments_translation (id) ON DELETE CASCADE,
    comment_id int NOT NULL,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    body text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.comments_translation IS 'コメント翻訳の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.comments_translation.id IS '翻訳履歴ID（主キー）';
COMMENT ON COLUMN history.comments_translation.comment_translation_id IS '元の翻訳ID（外部キー）';
COMMENT ON COLUMN history.comments_translation.comment_id IS 'コメントID';
COMMENT ON COLUMN history.comments_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN history.comments_translation.body IS 'コメント本文の翻訳（履歴時点）';
COMMENT ON COLUMN history.comments_translation.created_at IS '元作成日時';
COMMENT ON COLUMN history.comments_translation.updated_at IS '元更新日時';
COMMENT ON COLUMN history.comments_translation.recorded_at IS '履歴記録日時';
