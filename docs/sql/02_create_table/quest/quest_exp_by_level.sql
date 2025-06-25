-- クエスト経験値（レベル別）テーブル
CREATE TABLE IF NOT EXISTS quest_exp_by_level (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    level int NOT NULL CHECK (level > 0),
    exp int NOT NULL CHECK (exp >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_id, level)
);

COMMENT ON TABLE quest_exp_by_level IS 'クエストのレベル別必要経験値を管理するテーブル';
COMMENT ON COLUMN quest_exp_by_level.id IS 'クエスト経験値ID（主キー）';
COMMENT ON COLUMN quest_exp_by_level.quest_id IS 'クエストID（外部キー）';
COMMENT ON COLUMN quest_exp_by_level.level IS 'レベル（正の値のみ）';
COMMENT ON COLUMN quest_exp_by_level.exp IS '必要経験値（負の値不可）';
COMMENT ON COLUMN quest_exp_by_level.created_at IS '作成日時';
COMMENT ON COLUMN quest_exp_by_level.updated_at IS '更新日時';

-- quest_exp_by_level(履歴)
CREATE TABLE IF NOT EXISTS history.quest_exp_by_level (
    id serial PRIMARY KEY,
    quest_exp_by_level_id int NOT NULL REFERENCES quest_exp_by_level (id) ON DELETE RESTRICT,
    level int NOT NULL,
    exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.quest_exp_by_level IS 'クエスト経験値情報の変更履歴を管理するテーブル';
