-- 貯金記録テーブル
CREATE TABLE IF NOT EXISTS savings_records (
    id serial PRIMARY KEY,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    amount int NOT NULL DEFAULT 0 CHECK (amount != 0),
    balance int NOT NULL DEFAULT 0 CHECK (balance >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE savings_records IS '貯金記録の履歴を管理するテーブル';
COMMENT ON COLUMN savings_records.id IS '貯金記録ID（主キー）';
COMMENT ON COLUMN savings_records.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN savings_records.amount IS '貯金額（正の値は入金、負の値は出金）';
COMMENT ON COLUMN savings_records.balance IS '貯金の残高（負の値は不可）';
COMMENT ON COLUMN savings_records.created_at IS '貯金の履歴レコードが作成された日時';
COMMENT ON COLUMN savings_records.updated_at IS '更新日時';

-- 貯金記録翻訳テーブル
CREATE TABLE IF NOT EXISTS savings_records_translation (
    id serial PRIMARY KEY,
    savings_record_id int NOT NULL REFERENCES savings_records (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    reason text NOT NULL,
    UNIQUE (savings_record_id, language_code)
);

COMMENT ON TABLE savings_records_translation IS '貯金記録の多言語対応テーブル';
COMMENT ON COLUMN savings_records_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN savings_records_translation.savings_record_id IS '貯金記録ID（外部キー）';
COMMENT ON COLUMN savings_records_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN savings_records_translation.reason IS '貯金の理由の翻訳';
