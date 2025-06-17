-- 学年や職業テーブル
CREATE TABLE member.member_grade (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES member.members (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES member.education (id) ON DELETE CASCADE,
    grade int NOT NULL,
);
