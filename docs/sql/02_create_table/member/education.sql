-- 学歴テーブル
CREATE TABLE member.education (
    id serial PRIMARY KEY,
);

-- 学歴テーブル(翻訳)
CREATE TABLE member.education_translations (
    id serial PRIMARY KEY,
    education_id int NOT NULL REFERENCES member.education (id) ON DELETE RESTRICT,
    languages_code String NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);
