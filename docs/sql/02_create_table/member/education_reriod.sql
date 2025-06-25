-- 教育期間テーブル
CREATE TABLE IF NOT EXISTS education_period (
    id serial PRIMARY KEY,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES educations (id) ON DELETE CASCADE,
    period int NOT NULL CHECK (period > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (child_id, education_id)
);

COMMENT ON TABLE education_period IS 'メンバーの教育期間を管理するテーブル';
COMMENT ON COLUMN education_period.id IS '教育期間ID（主キー）';
COMMENT ON COLUMN education_period.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN education_period.education_id IS '学歴ID（外部キー）';
COMMENT ON COLUMN education_period.period IS '教育期間（年数、正の値のみ）';
COMMENT ON COLUMN education_period.created_at IS '作成日時';
COMMENT ON COLUMN education_period.updated_at IS '更新日時';
