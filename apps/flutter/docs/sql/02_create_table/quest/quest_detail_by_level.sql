-- クエスト詳細（レベル別）テーブル
CREATE TABLE IF NOT EXISTS quest_details_by_level (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    level int NOT NULL CHECK (level > 0),
    success_criteria text NOT NULL CHECK (length(success_criteria) > 0),
    target_count int NOT NULL CHECK (target_count > 0),
    reward int NOT NULL CHECK (reward >= 0),
    currency_id int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
    child_exp int NOT NULL CHECK (child_exp >= 0),
    quest_exp int NOT NULL CHECK (quest_exp >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_id, level)
);

COMMENT ON TABLE quest_details_by_level IS 'クエストのレベル別詳細情報を管理するテーブル';
COMMENT ON COLUMN quest_details_by_level.id IS 'クエスト詳細ID（主キー）';
COMMENT ON COLUMN quest_details_by_level.quest_id IS 'クエストID（外部キー）';
COMMENT ON COLUMN quest_details_by_level.level IS 'レベル（正の値のみ）';
COMMENT ON COLUMN quest_details_by_level.success_criteria IS '成功条件（空文字不可）';
COMMENT ON COLUMN quest_details_by_level.target_count IS '目標回数（正の値のみ）';
COMMENT ON COLUMN quest_details_by_level.reward IS '報酬金額（負の値不可）';
COMMENT ON COLUMN quest_details_by_level.currency_id IS '通貨ID（外部キー）';
COMMENT ON COLUMN quest_details_by_level.child_exp IS 'メンバー獲得経験値（負の値不可）';
COMMENT ON COLUMN quest_details_by_level.quest_exp IS 'クエスト獲得経験値（負の値不可）';
COMMENT ON COLUMN quest_details_by_level.created_at IS '作成日時';
COMMENT ON COLUMN quest_details_by_level.updated_at IS '更新日時';

-- quest_details_by_level(履歴)
CREATE TABLE IF NOT EXISTS history.quest_details_by_level (
    id serial PRIMARY KEY,
    quest_details_by_level_id int NOT NULL REFERENCES quest_details_by_level (id) ON DELETE RESTRICT,
    level int NOT NULL,
    success_criteria text NOT NULL,
    target_count int NOT NULL,
    reward int NOT NULL,
    currency_id int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
    child_exp int NOT NULL,
    quest_exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.quest_details_by_level IS 'クエスト詳細情報の変更履歴を管理するテーブル';

-- quest_details_by_level(翻訳)
CREATE TABLE IF NOT EXISTS quest_details_by_level_translation (
    id serial PRIMARY KEY,
    quest_details_by_level_id int NOT NULL REFERENCES quest_details_by_level (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    success_criteria text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_details_by_level_id, language_code)
);

COMMENT ON TABLE quest_details_by_level_translation IS 'クエスト詳細の多言語対応テーブル';
COMMENT ON COLUMN quest_details_by_level_translation.success_criteria IS '成功条件の翻訳';

-- quest_details_by_level(翻訳履歴)
CREATE TABLE IF NOT EXISTS history.quest_details_by_level_translation (
    id serial PRIMARY KEY,
    quest_details_by_level_translation_id int NOT NULL REFERENCES quest_details_by_level_translation (id) ON DELETE RESTRICT,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    success_criteria text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.quest_details_by_level_translation IS 'クエスト詳細翻訳の変更履歴を管理するテーブル';
