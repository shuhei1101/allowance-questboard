-- quest_details_by_level
CREATE TABLE IF NOT EXISTS quest_details_by_level (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    level int NOT NULL,
    success_criteria text NOT NULL,
    target_count int NOT NULL,
    reward int NOT NULL,
    currency_code text NOT NULL REFERENCES public.currencies (code) ON DELETE RESTRICT,
    member_exp int NOT NULL,
    quest_exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- quest_details_by_level(履歴)
CREATE TABLE IF NOT EXISTS history.quest_details_by_level (
    id serial PRIMARY KEY,
    quest_details_by_level_id int NOT NULL REFERENCES quest_details_by_level (id) ON DELETE RESTRICT,
    level int NOT NULL,
    success_criteria text NOT NULL,
    target_count int NOT NULL,
    reward int NOT NULL,
    currency_code text NOT NULL REFERENCES public.currencies (code) ON DELETE RESTRICT,
    member_exp int NOT NULL,
    quest_exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- quest_details_by_level(翻訳)
CREATE TABLE IF NOT EXISTS quest_details_by_level_translations (
    id serial PRIMARY KEY,
    quest_details_by_level_id int NOT NULL REFERENCES quest_details_by_level (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    success_criteria text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- quest_details_by_level(翻訳履歴)
CREATE TABLE IF NOT EXISTS history.quest_details_by_level_translations (
    id serial PRIMARY KEY,
    quest_details_by_level_translation_id int NOT NULL REFERENCES quest_details_by_level_translations (id) ON DELETE RESTRICT,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    success_criteria text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);
