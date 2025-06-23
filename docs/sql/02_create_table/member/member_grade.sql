-- メンバー学年テーブル
CREATE TABLE IF NOT EXISTS member_grade (
    id serial PRIMARY KEY,
    member_id int NOT NULL UNIQUE REFERENCES members (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES education (id) ON DELETE CASCADE,
    grade int NOT NULL CHECK (grade > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE member_grade IS 'メンバーの現在の学年や職業を管理するテーブル';
COMMENT ON COLUMN member_grade.id IS '学年ID（主キー）';
COMMENT ON COLUMN member_grade.member_id IS 'メンバーID（外部キー、一意制約）';
COMMENT ON COLUMN member_grade.education_id IS '学歴ID（外部キー）';
COMMENT ON COLUMN member_grade.grade IS '学年（正の値のみ）';
COMMENT ON COLUMN member_grade.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN member_grade.updated_at IS 'レコードの更新日時';
