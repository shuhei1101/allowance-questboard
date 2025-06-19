

CREATE TABLE IF NOT EXISTS education_period (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES education (id) ON DELETE CASCADE,
    period int NOT NULL,
);
