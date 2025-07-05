CREATE TABLE IF NOT EXISTS allowance_table_sub_types (
    id serial PRIMARY KEY,
    type varchar NOT NULL UNIQUE,  -- child_allowance_table, family_allowance_table, shared_allowance_table
    description text NOT NULL
);
