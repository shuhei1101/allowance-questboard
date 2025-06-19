CREATE TABLE follows (
    id serial PRIMARY KEY,
    follower_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    followed_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
);
