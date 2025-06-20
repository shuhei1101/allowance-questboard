CREATE TABLE IF NOT EXISTS member_level_sub_types (
    id serial PRIMARY KEY,
    type varchar NOT NULL UNIQUE,  -- member_level_table, family_level_table
    description text NOT NULL
);
