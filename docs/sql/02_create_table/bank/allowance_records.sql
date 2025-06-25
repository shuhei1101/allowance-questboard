-- allowance_records
CREATE TABLE IF NOT EXISTS allowance_records (
    id serial PRIMARY KEY,
    child_id int NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    allowanceable_type int NOT NULL REFERENCES allowanceable_types(id) ON DELETE RESTRICT,
    allowanceable_id int NOT NULL,
    title varchar(255) NOT NULL,
    amount int NOT NULL CHECK (amount >= 0),
    recorded_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE allowance_records IS 'お小遣いの記録テーブル';
COMMENT ON COLUMN allowance_records.id IS 'お小遣い記録ID（主キー）';
COMMENT ON COLUMN allowance_records.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN allowance_records.allowanceable_type IS 'お小遣いの種類ID（外部キー）';
COMMENT ON COLUMN allowance_records.allowanceable_id IS 'お小遣いの対象ID（ポリモーフィック）';
COMMENT ON COLUMN allowance_records.title IS 'お小遣いのタイトル';
COMMENT ON COLUMN allowance_records.amount IS 'お小遣いの金額（負の値は不可）';
COMMENT ON COLUMN allowance_records.recorded_at IS 'お小遣いが記録された日時';
COMMENT ON COLUMN allowance_records.created_at IS '作成日時';
COMMENT ON COLUMN allowance_records.updated_at IS '更新日時';
