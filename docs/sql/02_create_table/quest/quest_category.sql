-- quest_category
CREATE TABLE IF NOT EXISTS quest_category (
    id serial PRIMARY KEY,
    subclass_type varchar NOT NULL,
    subclass_id int NOT NULL,
    name varchar NOT NULL,
)

-- quest_category(翻訳)
CREATE TABLE IF NOT EXISTS quest_category_translations (
    id serial PRIMARY KEY,
    quest_category_id int NOT NULL REFERENCES quest_category (id) ON DELETE RESTRICT,
    languages_code varchar NOT NULL REFERENCES public.languages (code) ON DELETE RESTRICT,
    name varchar NOT NULL UNIQUE
);

-- template_quest_category
CREATE TABLE IF NOT EXISTS template_quest_category (
    id serial PRIMARY KEY,
    category_id int NOT NULL REFERENCES quest_category (id) ON DELETE RESTRICT,
);

-- custom_quest_category
CREATE TABLE IF NOT EXISTS custom_quest_category (
    id serial PRIMARY KEY,
    category_id int NOT NULL REFERENCES quest_category (id) ON DELETE RESTRICT,
);

-- family_quest_category
CREATE TABLE IF NOT EXISTS family_quest_category (
    id serial PRIMARY KEY,
    category_id int NOT NULL REFERENCES quest_category (id) ON DELETE RESTRICT,
);
