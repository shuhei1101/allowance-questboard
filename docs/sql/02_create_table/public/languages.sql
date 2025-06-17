-- 翻訳コードテーブル
CREATE TABLE public.languages (
    -- en, ja
    code varchar PRIMARY KEY,
    -- English, Japan
    name varchar NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    -- ソート数値(小さい順に並べる)
    sort_order int NOT NULL DEFAULT 0
)
