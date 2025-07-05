CREATE TABLE IF NOT EXISTS quest_category_subclass_types (
    id serial PRIMARY KEY,
    type varchar NOT NULL UNIQUE,  -- template_quest_categories, custom_quest_categories
    description text NOT NULL
);
