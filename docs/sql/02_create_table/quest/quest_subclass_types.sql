-- クエストサブクラスのタイプを定義するテーブル
CREATE TABLE IF NOT EXISTS quest_subclass_types (
    id serial PRIMARY KEY,
    type varchar NOT NULL UNIQUE,  -- child, family
    description text NOT NULL
);
