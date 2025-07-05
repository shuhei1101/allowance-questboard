-- クエストリクエストステータステーブル
CREATE TABLE IF NOT EXISTS quest_request_statuses (
    id serial PRIMARY KEY,
    code varchar(20) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE quest_request_statuses IS 'クエストリクエストの状態を管理するマスタテーブル';
COMMENT ON COLUMN quest_request_statuses.id IS 'ステータスID（主キー）';
COMMENT ON COLUMN quest_request_statuses.code IS 'ステータスコード（例：pending, approved, rejected）';
COMMENT ON COLUMN quest_request_statuses.created_at IS '作成日時';
COMMENT ON COLUMN quest_request_statuses.updated_at IS '更新日時';

-- クエストリクエストステータス翻訳テーブル
CREATE TABLE IF NOT EXISTS quest_request_status_translation (
    id serial PRIMARY KEY,
    quest_request_status_id int NOT NULL REFERENCES quest_request_statuses (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_request_status_id, language_code)
);

COMMENT ON TABLE quest_request_status_translation IS 'クエストリクエストステータスの多言語対応テーブル';
COMMENT ON COLUMN quest_request_status_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN quest_request_status_translation.quest_request_status_id IS 'ステータスID（外部キー）';
COMMENT ON COLUMN quest_request_status_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN quest_request_status_translation.name IS 'ステータス名の翻訳';
COMMENT ON COLUMN quest_request_status_translation.created_at IS '作成日時';
COMMENT ON COLUMN quest_request_status_translation.updated_at IS '更新日時';

-- クエストリクエストテーブル
CREATE TABLE IF NOT EXISTS quest_requests (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    quest_id int REFERENCES quests (id) ON DELETE CASCADE,  -- 既存クエストの場合のみ
    title varchar(200) NOT NULL CHECK (length(title) > 0),
    description text NOT NULL CHECK (length(description) > 0),
    is_new_request boolean NOT NULL DEFAULT true,
    status_id int NOT NULL REFERENCES quest_request_statuses (id) ON DELETE RESTRICT,
    answer text,
    created_at timestamptz NOT NULL DEFAULT now(),
    answered_at timestamptz DEFAULT NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (
        (is_new_request = true AND quest_id IS NULL) OR
        (is_new_request = false AND quest_id IS NOT NULL)
    ),
    CHECK (
        (answered_at IS NULL AND answer IS NULL) OR
        (answered_at IS NOT NULL AND answered_at >= created_at)
    )
);

COMMENT ON TABLE quest_requests IS 'メンバーからのクエストリクエストを管理するテーブル';
COMMENT ON COLUMN quest_requests.id IS 'リクエストID（主キー）';
COMMENT ON COLUMN quest_requests.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN quest_requests.child_id IS 'リクエスト者のメンバーID（外部キー）';
COMMENT ON COLUMN quest_requests.quest_id IS '既存クエストID（既存クエストの場合のみ、外部キー）';
COMMENT ON COLUMN quest_requests.title IS 'リクエストタイトル（空文字不可）';
COMMENT ON COLUMN quest_requests.description IS 'リクエスト説明（空文字不可）';
COMMENT ON COLUMN quest_requests.is_new_request IS '新規クエストリクエストフラグ';
COMMENT ON COLUMN quest_requests.status_id IS 'ステータスID（外部キー）';
COMMENT ON COLUMN quest_requests.answer IS '回答内容';
COMMENT ON COLUMN quest_requests.created_at IS '作成日時';
COMMENT ON COLUMN quest_requests.answered_at IS '回答日時';
COMMENT ON COLUMN quest_requests.updated_at IS '更新日時';
