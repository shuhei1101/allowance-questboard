-- level table
CREATE TABLE IF NOT level_table (
    id serial PRIMARY KEY,
    subclass_type varchar NOT NULL,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- level_table(履歴)
CREATE TABLE IF NOT history.level_table (
    id serial PRIMARY KEY,
    level_table_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    subclass_type varchar NOT NULL,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- member_level_table
CREATE TABLE IF NOT member_level_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
);

-- family_level_table
CREATE TABLE IF NOT family_level_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
);

-- shared_level_table
CREATE TABLE IF NOT shared_level_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    family_table_id int NOT NULL REFERENCES family_level_table (id) ON DELETE CASCADE,
    is_public boolean NOT NULL DEFAULT false,
    favorite_count int NOT NULL DEFAULT 0,
);

-- member_level_table(履歴)
CREATE TABLE IF NOT history.member_level_table (
    id serial PRIMARY KEY,
    member_level_table_id int NOT NULL REFERENCES member_level_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.level_table (id) ON DELETE CASCADE,
    recorded_at timestamptz NOT NULL DEFAULT now(),
);

-- family_level_table(履歴)
CREATE TABLE IF NOT history.family_level_table (
    id serial PRIMARY KEY,
    family_level_table_id int NOT NULL REFERENCES family_level_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.level_table (id) ON DELETE CASCADE
    recorded_at timestamptz NOT NULL DEFAULT now(),
);

-- shared_level_table(履歴)
CREATE TABLE IF NOT history.shared_level_table (
    id serial PRIMARY KEY,
    shared_level_table_id int NOT NULL REFERENCES shared_level_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    family_table_id int NOT NULL REFERENCES family_level_table (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.level_table (id) ON DELETE CASCADE
    recorded_at timestamptz NOT NULL DEFAULT now(),
);

-- allowance_by_level
CREATE TABLE IF NOT allowance_by_level (
    id serial PRIMARY KEY,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    level int NOT NULL,
    amount int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- allowance_by_level(履歴)
CREATE TABLE IF NOT history.allowance_by_level (
    id serial PRIMARY KEY,
    allowance_by_level_id int NOT NULL REFERENCES allowance_by_level (id) ON DELETE CASCADE,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    level int NOT NULL,
    amount int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);
