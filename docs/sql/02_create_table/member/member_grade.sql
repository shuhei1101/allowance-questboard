-- 学年や職業テーブル
CREATE TABLE IF NOT EXISTS member_grade (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES education (id) ON DELETE CASCADE,
    grade int NOT NULL,
);
