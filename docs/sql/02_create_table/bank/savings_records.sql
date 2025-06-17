-- 貯金額の履歴
CREATE TABLE member.savings_records (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    amount int NOT NULL DEFAULT 0,
    balance int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
);

COMMENT ON TABLE savings_records IS '貯金額の履歴';
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
