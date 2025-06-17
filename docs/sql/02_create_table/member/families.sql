-- families
CREATE TABLE families (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    -- 
    icon_code varchar NOT NULL REFERENCES public.icons (code) ON DELETE SET NULL,
    -- 
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- families(履歴)
CREATE TABLE history.families (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id),
    user_id uuid NOT NULL REFERENCES auth.users (id),
    -- 
    icon_code varchar NOT NULL REFERENCES public.icons (code) ON DELETE SET NULL,
    bio text,
    -- 
    created_at timestamptz NOT NULL,
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- families(翻訳)
CREATE TABLE families_translations (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE,
    bio text
);

-- families(翻訳/履歴)
CREATE TABLE history.families_translations (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE,
    bio text,
    -- 
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- families(設定)
CREATE TABLE families_settings (
    family_id int PRIMARY KEY REFERENCES families (id) ON DELETE CASCADE,
    -- 通貨
    currency_code varchar NOT NULL REFERENCES public.currencies (code) ON DELETE RESTRICT,
    -- 
    updated_at timestamptz DEFAULT now()
);
