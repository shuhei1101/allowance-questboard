-- allowance_table
CREATE TABLE IF NOT allowance_table (
    id serial PRIMARY KEY,
    subclass_type varchar NOT NULL,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- allowance_table(履歴)
CREATE TABLE IF NOT history.allowance_table (
    id serial PRIMARY KEY,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    subclass_type varchar NOT NULL,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- member_allowance_table
CREATE TABLE IF NOT member_allowance_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
);

-- family_allowance_table
CREATE TABLE IF NOT family_allowance_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
);

-- shared_allowance_table
CREATE TABLE IF NOT shared_allowance_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    family_table_id int NOT NULL REFERENCES family_allowance_table (id) ON DELETE CASCADE,
    is_public boolean NOT NULL DEFAULT false,
    favorite_count int NOT NULL DEFAULT 0,
);

-- member_allowance_table(履歴)
CREATE TABLE IF NOT history.member_allowance_table (
    id serial PRIMARY KEY,
    member_allowance_table_id int NOT NULL REFERENCES member_allowance_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.allowance_table (id) ON DELETE CASCADE,
    recorded_at timestamptz NOT NULL DEFAULT now(),
);

-- family_allowance_table(履歴)
CREATE TABLE IF NOT history.family_allowance_table (
    id serial PRIMARY KEY,
    family_allowance_table_id int NOT NULL REFERENCES family_allowance_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.allowance_table (id) ON DELETE CASCADE,
    recorded_at timestamptz NOT NULL DEFAULT now(),
);

-- shared_allowance_table(履歴)
CREATE TABLE IF NOT history.shared_allowance_table (
    id serial PRIMARY KEY,
    shared_allowance_table_id int NOT NULL REFERENCES shared_allowance_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    family_table_id int NOT NULL REFERENCES history.family_allowance_table (id) ON DELETE CASCADE,
    is_public boolean NOT NULL DEFAULT false,
    favorite_count int NOT NULL DEFAULT 0,
    history_superclass_id int NOT NULL REFERENCES history.allowance_table (id) ON DELETE CASCADE,
    recorded_at timestamptz NOT NULL DEFAULT now(),
);

-- allowance_by_age
CREATE TABLE IF NOT allowance_by_age (
    id serial PRIMARY KEY,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    age int NOT NULL,
    amount int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- allowance_by_age(履歴)
CREATE TABLE IF NOT history.allowance_by_age (
    id serial PRIMARY KEY,
    allowance_by_age_id int NOT NULL REFERENCES allowance_by_age (id) ON DELETE CASCADE,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    age int NOT NULL,
    amount int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);
