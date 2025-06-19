-- 通貨
CREATE TABLE IF NOT EXISTS currencies (
    code varchar PRIMARY KEY,
    name varchar NOT NULL,
    symbol varchar NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    sort_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exchange_rates (
    id serial PRIMARY KEY,
    base_currency varchar NOT NULL REFERENCES currencies (code) ON DELETE RESTRICT,
    target_currency varchar NOT NULL REFERENCES currencies (code) ON DELETE RESTRICT,
    rate numeric NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (base_currency, target_currency)
);
