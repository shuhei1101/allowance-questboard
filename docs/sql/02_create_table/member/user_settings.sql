-- ユーザ(設定)
CREATE TABLE IF NOT EXISTS user_settings (
    user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    language_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    updated_at timestamptz DEFAULT now()
);
