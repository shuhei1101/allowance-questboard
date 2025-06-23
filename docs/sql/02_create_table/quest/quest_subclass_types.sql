-- クエストサブクラスのタイプを定義するテーブル
CREATE TABLE IF NOT EXISTS quest_subclass_types (
    id serial PRIMARY KEY,
    type varchar NOT NULL UNIQUE,  -- member, family
    description text NOT NULL
);
