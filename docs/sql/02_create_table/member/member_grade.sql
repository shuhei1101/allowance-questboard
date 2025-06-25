-- メンバー学年テーブル
CREATE TABLE IF NOT EXISTS child_grade (
    id serial PRIMARY KEY,
    child_id int NOT NULL UNIQUE REFERENCES children (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES educations (id) ON DELETE CASCADE,
    grade int NOT NULL CHECK (grade > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE child_grade IS 'メンバーの現在の学年や職業を管理するテーブル';
COMMENT ON COLUMN child_grade.id IS '学年ID（主キー）';
COMMENT ON COLUMN child_grade.child_id IS 'メンバーID（外部キー、一意制約）';
COMMENT ON COLUMN child_grade.education_id IS '学歴ID（外部キー）';
COMMENT ON COLUMN child_grade.grade IS '学年（正の値のみ）';
COMMENT ON COLUMN child_grade.created_at IS '作成日時';
COMMENT ON COLUMN child_grade.updated_at IS '更新日時';
