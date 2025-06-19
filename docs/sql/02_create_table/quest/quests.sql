-- クエスト
CREATE TABLE IF NOT EXISTS quests (
    id serial PRIMARY KEY,
    subclass_type varchar NOT NULL,
    subclass_id int NOT NULL,
    title varchar NOT NULL,
    category_id int NOT NULL REFERENCES categories (id) ON DELETE RESTRICT,
    icon_code varchar NOT NULL REFERENCES public.icons (code) ON DELETE RESTRICT,
    age_from　int NOT NULL,
    age_to int NOT NULL,
    has_published_month boolean NOT NULL DEFAULT false,
    month_from int NOT NULL,
    month_to int NOT NULL,
    client varchar,
    request_detail text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
);

-- クエスト(履歴)
CREATE TABLE IF NOT EXISTS history.quests (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    subclass_type varchar NOT NULL,
    subclass_id int NOT NULL,
    title varchar NOT NULL,
    category_id int NOT NULL REFERENCES categories (id) ON DELETE RESTRICT,
    icon_code varchar NOT NULL REFERENCES public.icons (code) ON DELETE RESTRICT,
    age_from int NOT NULL,
    age_to int NOT NULL,
    has_published_month boolean NOT NULL DEFAULT false,
    month_from int NOT NULL,
    month_to int NOT NULL,
    client varchar,
    request_detail text,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- クエスト(翻訳)
CREATE TABLE IF NOT EXISTS quest_translations (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    title varchar NOT NULL UNIQUE,
    client varchar NOT NULL,
    request_detail text
);

-- クエスト(翻訳履歴)
CREATE TABLE IF NOT EXISTS history.quest_translations (
    id serial PRIMARY KEY,
    quest_translation_id int NOT NULL REFERENCES quest_translations (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    title varchar NOT NULL UNIQUE,
    client varchar NOT NULL,
    request_detail text,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- family_quests
CREATE TABLE IF NOT EXISTS family_quests (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    is_shared boolean NOT NULL DEFAULT false,
    shared_quest_id int REFERENCES shared_quests (id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- family_quests(履歴)
CREATE TABLE IF NOT EXISTS history.family_quests (
    id serial PRIMARY KEY,
    family_quest_id int NOT NULL REFERENCES family_quests (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    is_shared boolean NOT NULL DEFAULT false,
    shared_quest_id int REFERENCES shared_quests (id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- shared_quests
CREATE TABLE IF NOT EXISTS shared_quests (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    family_quest_id int NOT NULL REFERENCES family_quests (id) ON DELETE CASCADE,
    pinned_comment_id int REFERENCES public.comments (id) ON DELETE SET NULL,
    is_public boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- shared_quests(履歴)
CREATE TABLE IF NOT EXISTS history.shared_quests (
    id serial PRIMARY KEY,
    shared_quest_id int NOT NULL REFERENCES shared_quests (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    family_quest_id int NOT NULL REFERENCES family_quests (id) ON DELETE CASCADE,
    pinned_comment_id int REFERENCES public.comments (id) ON DELETE SET NULL,
    is_public boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- saved_quests(家族が保続(いいね)したクエスト)
CREATE TABLE IF NOT EXISTS saved_quests (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    shared_quest_id int REFERENCES shared_quests (id) ON DELETE SET NULL,
    saved_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- template_quests(アプリのテンプレートクエスト)
CREATE TABLE IF NOT EXISTS template_quests (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
);

-- member_quest_status(クエストステータス)
CREATE TABLE IF NOT EXISTS member_quest_status (
    id serial PRIMARY KEY,
    name varchar NOT NULL DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);


-- member_quests(メンバーに公開されているクエスト)
CREATE TABLE IF NOT EXISTS member_quests (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    current_level int NOT NULL DEFAULT 1,
    status int NOT NULL REFERENCES member_quest_status (id) ON DELETE RESTRICT,
    published_at timestamptz NOT NULL DEFAULT now(),
    achieved_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
