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
    family_id int NOT NULL REFERENCES member.families (id),
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
    family_id int NOT NULL REFERENCES member.families (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE,
)

-- families(設定)
CREATE TABLE member.families_settings (
    family_id int PRIMARY KEY REFERENCES member.families (id) ON DELETE CASCADE,
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
    education_id int NOT NULL REFERENCES member.education (id) ON DELETE RESTRICT,
    languages_code String NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);

-- 学年や職業テーブル
CREATE TABLE member.member_grade (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES member.education (id) ON DELETE CASCADE,
    grade int NOT NULL,
);

-- members
CREATE TABLE member.members (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES member.families (id) ON DELETE CASCADE,
    -- 
    name varchar NOT NULL,
    icon_id varchar NOT NULL REFERENCES public.icons (icon_code) ON DELETE SET NULL,
    birthday date NOT NULL,
    grade_id int REFERENCES member.grade (id) ON DELETE NULL,
    -- 
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- members(履歴)
CREATE TABLE history.members (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id),
    user_id uuid NOT NULL REFERENCES auth.users (id),
    family_id int NOT NULL REFERENCES member.families (id) ON DELETE CASCADE,
    -- 
    name varchar NOT NULL,
    icon_id varchar NOT NULL REFERENCES public.icons (icon_code) ON DELETE SET NULL,
    birthday date NOT NULL,
    grade_id int REFERENCES member.grade (id) ON DELETE NULL,
    -- 
    created_at timestamptz DEFAULT now(),
    recorded_at timestamptz DEFAULT now()
);

-- members(翻訳)
CREATE TABLE member.members_translations (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);

-- members(設定)
CREATE TABLE member.members_settings (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    -- 
    min_savings int DEFAULT 0,
    -- 
    updated_at timestamptz DEFAULT now()
);

-- members(設定履歴)
CREATE TABLE history.members_settings (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
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
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    -- 
    exp int DEFAULT 0,
    balance int DEFAULT 0,
    -- 
    updated_at timestamptz DEFAULT now()
);

-- member(ステータス履歴)
CREATE TABLE history.member_stats (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    -- 
    exp int DEFAULT 0,
    balance int DEFAULT 0,
    -- 
    created_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

-- 貯金額の履歴
CREATE TABLE member.savings_records (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    amount int NOT NULL DEFAULT 0,
    balance int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
);

COMMENT ON TABLEsavings_records IS '貯金額の履歴';
COMMENT ON COLUMN savings_records.amount IS '貯金額';
COMMENT ON COLUMN savings_records.balance IS '貯金の残高';
COMMENT ON COLUMN savings_records.reason IS '貯金の理由';
COMMENT ON COLUMN savings_records.created_at IS '貯金の履歴レコードが作成された日時';

-- 貯金の履歴(翻訳)
CREATE TABLE member.savings_records_translations (
    id serial PRIMARY KEY,
    savings_record_id int NOT NULL REFERENCES savings_records (id) ON DELETE CASCADE,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    reason text NOT NULL,
);

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

-- 引き落とし申請フォーム
-- CREATE TABLE member.withdrawal_requests (
--     id serial PRIMARY KEY,
--     member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
--     family_id int NOT NULL REFERENCES member.families (id) ON DELETE CASCADE,
