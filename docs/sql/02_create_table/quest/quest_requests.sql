-- request_status
CREATE TABLE IF NOT EXISTS quest_request_status (
    id serial PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- request_status(翻訳)
CREATE TABLE IF NOT EXISTS quest_request_status_translations (
    id serial PRIMARY KEY,
    quest_request_status_id int NOT NULL REFERENCES quest_request_status (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS quest_requests (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES family (id) ON DELETE CASCADE,
    member_id int NOT NULL REFERENCES member (id) ON DELETE CASCADE,
    quest_id int REFERENCES quest (id) ON DELETE CASCADE,  -- 既存クエストの場合のみ
    title varchar NOT NULL,
    description text NOT NULL,
    is_new_requests boolean NOT NULL DEFAULT true,
    status_id int NOT NULL REFERENCES quest_request_status (id) ON DELETE RESTRICT,
    answer text,
    created_at timestamptz NOT NULL DEFAULT now(),
    answered_at timestamptz DEFAULT NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
);
