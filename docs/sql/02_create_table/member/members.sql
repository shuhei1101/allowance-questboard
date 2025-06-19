
-- members
CREATE TABLE IF NOT EXISTS members (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    -- 
    name varchar NOT NULL,
    icon_id varchar NOT NULL REFERENCES public.icons (icon_code) ON DELETE SET NULL,
    birthday date NOT NULL,
    grade_id int REFERENCES grade (id) ON DELETE NULL,
    -- 
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- members(履歴)
CREATE TABLE IF NOT EXISTS history.members (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id),
    user_id uuid NOT NULL REFERENCES auth.users (id),
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    -- 
    name varchar NOT NULL,
    icon_id varchar NOT NULL REFERENCES public.icons (icon_code) ON DELETE SET NULL,
    birthday date NOT NULL,
    grade_id int REFERENCES grade (id) ON DELETE NULL,
    -- 
    created_at timestamptz DEFAULT now(),
    recorded_at timestamptz DEFAULT now()
);

-- members(翻訳)
CREATE TABLE IF NOT EXISTS members_translations (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);

-- members(設定)
CREATE TABLE IF NOT EXISTS members_settings (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    -- 
    min_savings int DEFAULT 0,
    -- 
    updated_at timestamptz DEFAULT now()
);

-- members(設定履歴)
CREATE TABLE IF NOT EXISTS history.members_settings (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    -- 
    min_savings int DEFAULT 0,
    -- 
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- member(ステータス)
CREATE TABLE IF NOT EXISTS member_stats (
    id serial PRIMARY KEY,
    --
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    -- 
    exp int DEFAULT 0,
    balance int DEFAULT 0,
    -- 
    updated_at timestamptz DEFAULT now()
);

-- member(ステータス履歴)
CREATE TABLE IF NOT EXISTS history.member_stats (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    -- 
    exp int DEFAULT 0,
    balance int DEFAULT 0,
    -- 
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);
