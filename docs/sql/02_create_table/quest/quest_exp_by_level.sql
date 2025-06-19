-- quest_exp_by_level
CREATE TABLE IF NOT EXISTS quest_exp_by_level (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quest (id) ON DELETE CASCADE,
    level int NOT NULL,
    exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- quest_exp_by_level(履歴)
CREATE TABLE IF NOT EXISTS history.quest_exp_by_level (
    id serial PRIMARY KEY,
    quest_exp_by_level_id int NOT NULL REFERENCES quest_exp_by_level (id) ON DELETE RESTRICT,
    level int NOT NULL,
    exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);
