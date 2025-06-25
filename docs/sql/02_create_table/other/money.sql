-- 通貨マスタテーブル
CREATE TABLE IF NOT EXISTS currencies (
    id serial PRIMARY KEY,
    code varchar NOT NULL UNIQUE,  -- 通貨コード (ISO 4217)
    name varchar NOT NULL,
    symbol varchar NOT NULL,  -- $, €, ¥, etc.
    is_active boolean NOT NULL DEFAULT true,
    sort_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE currencies IS '通貨情報を管理するマスタテーブル';
COMMENT ON COLUMN currencies.id IS '通貨ID（主キー）';
COMMENT ON COLUMN currencies.code IS '通貨コード（ISO 4217準拠、例：USD, EUR, JPY）';
COMMENT ON COLUMN currencies.name IS '通貨名（例：US Dollar, Euro, Japanese Yen）';
COMMENT ON COLUMN currencies.symbol IS '通貨記号（例：$, €, ¥）';
COMMENT ON COLUMN currencies.is_active IS '有効フラグ';
COMMENT ON COLUMN currencies.sort_order IS '表示順序';
COMMENT ON COLUMN currencies.created_at IS '作成日時';
COMMENT ON COLUMN currencies.updated_at IS '更新日時';

-- 為替レートテーブル
CREATE TABLE IF NOT EXISTS exchange_rates (
    id serial PRIMARY KEY,
    base_currency int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
    target_currency int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
    rate numeric(15,6) NOT NULL CHECK (rate > 0),
    effective_date date NOT NULL DEFAULT CURRENT_DATE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (base_currency, target_currency, effective_date),
    CHECK (base_currency != target_currency)
);

COMMENT ON TABLE exchange_rates IS '通貨間の為替レートを管理するテーブル';
COMMENT ON COLUMN exchange_rates.id IS '為替レートID（主キー）';
COMMENT ON COLUMN exchange_rates.base_currency IS '基準通貨ID（外部キー）';
COMMENT ON COLUMN exchange_rates.target_currency IS '対象通貨ID（外部キー）';
COMMENT ON COLUMN exchange_rates.rate IS '為替レート（正の値のみ、小数点以下6桁）';
COMMENT ON COLUMN exchange_rates.effective_date IS '適用日';
COMMENT ON COLUMN exchange_rates.created_at IS '作成日時';
COMMENT ON COLUMN exchange_rates.updated_at IS '更新日時';
