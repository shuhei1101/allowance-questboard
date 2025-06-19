-- 国籍テーブル
CREATE TABLE IF NOT EXISTS countries (
    id serial PRIMARY KEY,
    name varchar NOT NULL UNIQUE,
    icon_code integer REFERENCES icons (id) ON DELETE SET NULL,
    is_active boolean NOT NULL DEFAULT true,
    sort_order int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
