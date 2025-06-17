-- 引き落とし申請ステータス
CREATE TABLE member.withdrawal_request_status (
    id serial PRIMARY KEY,
    code varchar NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- 引き落とし申請ステータス(翻訳)
CREATE TABLE member.withdrawal_request_status_translations (
    id serial PRIMARY KEY,
    withdrawal_request_status_id int NOT NULL REFERENCES member.withdrawal_request_status (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);
