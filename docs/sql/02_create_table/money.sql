-- 通貨
CREATE TABLE public.currences (
    id serial PRIMARY KEY,
    code varchar NOT NULL UNIQUE,
    name varchar NOT NULL,
    symbol varchar NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    sort_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.exchange_rates (
    id serial PRIMARY KEY,
    base_currency varchar NOT NULL REFERENCES public.currences (code) ON DELETE RESTRICT,
    target_currency varchar NOT NULL REFERENCES public.currences (code) ON DELETE RESTRICT,
    rate numeric NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (base_currency, target_currency)
);
