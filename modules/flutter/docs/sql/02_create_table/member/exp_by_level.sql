-- exp_by_level
CREATE TABLE IF NOT EXISTS exp_by_level (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    level int NOT NULL,
    exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (family_id, level)
);

COMMENT ON TABLE exp_by_level IS '親が子供の経験値とレベルの関係を定義するテーブル';
COMMENT ON COLUMN exp_by_level.family_id IS '家族ID';
COMMENT ON COLUMN exp_by_level.level IS 'レベル';
COMMENT ON COLUMN exp_by_level.exp IS 'レベルに必要な経験値';

-- exp_by_level(履歴)
CREATE TABLE IF NOT EXISTS history.exp_by_level (
    id serial PRIMARY KEY,
    exp_by_level_id int NOT NULL REFERENCES exp_by_level (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    level int NOT NULL,
    exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);
