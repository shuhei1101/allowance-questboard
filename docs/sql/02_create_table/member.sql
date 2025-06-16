-- ユーザ(設定)
CREATE TABLE member.user_settings (
    user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    language_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    updated_at timestamptz DEFAULT now()
);

-- familiesテーブル
CREATE TABLE member.families (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    -- 
    icon_id varchar NOT NULL REFERENCES public.icons (icon_code) ON DELETE SET NULL,
    name varchar NOT NULL DEFAULT 'home',
    bio text,
    -- 
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE history.families (
    id serial PRIMARY KEY,
    family_id integer NOT NULL REFERENCES member.families (id),
    user_id uuid NOT NULL REFERENCES auth.users (id),
    -- 
    icon_id varchar NOT NULL REFERENCES public.icons (icon_code) ON DELETE SET NULL,
    name varchar NOT NULL DEFAULT 'home',
    bio text,
    -- 
    created_at timestamptz NOT NULL,
    recorded_at timestamptz NOT NULL DEFAULT now()
);


-- families(翻訳)
CREATE TABLE member.families_translations (
    id serial PRIMARY KEY,
    family_id integer NOT NULL REFERENCES member.families (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE,
)

-- families(設定)
CREATE TABLE member.families_settings (
    family_id integer PRIMARY KEY REFERENCES member.families (id) ON DELETE CASCADE,
    currency_code varchar NOT NULL REFERENCES public.currencies (code) ON DELETE RESTRICT,
    -- 
    updated_at timestamptz DEFAULT now()
);

-- families(履歴)

-- 学歴テーブル
CREATE TABLE member.education (
    id serial PRIMARY KEY,
);

-- 学歴テーブル(翻訳)
CREATE TABLE member.education_translations (
    id serial PRIMARY KEY,
    education_id integer NOT NULL REFERENCES member.education (id) ON DELETE RESTRICT,
    languages_code String NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);

-- 学年や職業テーブル
CREATE TABLE member.member_grade (
    id serial PRIMARY KEY,
    member_id integer NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    education_id integer NOT NULL REFERENCES member.education (id) ON DELETE CASCADE,
    grade integer NOT NULL,
);

-- members
CREATE TABLE member.members (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    family_id integer NOT NULL REFERENCES member.families (id) ON DELETE CASCADE,
    -- 
    name varchar NOT NULL,
    icon_id varchar NOT NULL REFERENCES public.icons (icon_code) ON DELETE SET NULL,
    birthday date NOT NULL,
    grade_id integer REFERENCES member.grade (id) ON DELETE NULL,
    -- 
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- members(履歴)
CREATE TABLE history.members (
    id serial PRIMARY KEY,
    member_id integer NOT NULL REFERENCES member.members (id),
    user_id uuid NOT NULL REFERENCES auth.users (id),
    family_id integer NOT NULL REFERENCES member.families (id) ON DELETE CASCADE,
    -- 
    name varchar NOT NULL,
    icon_id varchar NOT NULL REFERENCES public.icons (icon_code) ON DELETE SET NULL,
    birthday date NOT NULL,
    grade_id integer REFERENCES member.grade (id) ON DELETE NULL,
    -- 
    created_at timestamptz DEFAULT now(),
    recorded_at timestamptz DEFAULT now()
);

-- members(翻訳)
CREATE TABLE member.members_translations (
    id serial PRIMARY KEY,
    member_id integer NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);

-- members(設定)
CREATE TABLE member.members_settings (
    id serial PRIMARY KEY,
    member_id integer NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    -- 
    min_savings int DEFAULT 0,
    -- 
    updated_at timestamptz DEFAULT now()
);

-- members(設定履歴)
CREATE TABLE history.members_settings (
    id serial PRIMARY KEY,
    member_id integer NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    -- 
    min_savings int DEFAULT 0,
    -- 
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- member(ステータス)
CREATE TABLE member_stats (
    id serial PRIMARY KEY,
    --
    member_id integer NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    -- 
    exp int DEFAULT 0,
    balance int DEFAULT 0,
    -- 
    updated_at timestamptz DEFAULT now()
);

-- member(ステータス履歴)
CREATE TABLE history.member_stats (
    id serial PRIMARY KEY,
    member_id integer NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    -- 
    exp int DEFAULT 0,
    balance int DEFAULT 0,
    -- 
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);
