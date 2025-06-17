-- アイコンカテゴリテーブル
CREATE TABLE public.icon_category (
    id serial PRIMARY KEY,
    -- 英語のみ
    name varchar NOT NULL UNIQUE,
    sort_order int DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- アイコンテーブル
CREATE TABLE public.icons (
    code varchar PRIMARY KEY,
    category_id int REFERENCES public.icon_category(id) ON DELETE SET NULL,
    sort_order int DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
