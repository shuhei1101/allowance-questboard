-- お小遣いテーブル（基底クラス）
CREATE TABLE IF NOT EXISTS allowance_table (
    id serial PRIMARY KEY,
    subclass_type int NOT NULL REFERENCES allowance_table_sub_types (id) ON DELETE RESTRICT,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (subclass_type, subclass_id)
);

COMMENT ON TABLE allowance_table IS 'お小遣い設定の基底テーブル（ポリモーフィック関連）';
COMMENT ON COLUMN allowance_table.id IS 'お小遣いテーブルID（主キー）';
COMMENT ON COLUMN allowance_table.subclass_type IS 'サブクラスタイプ（child, family, shared）';
COMMENT ON COLUMN allowance_table.subclass_id IS 'サブクラスID（ポリモーフィック）';
COMMENT ON COLUMN allowance_table.created_at IS '作成日時';
COMMENT ON COLUMN allowance_table.updated_at IS '更新日時';

-- お小遣いテーブル履歴
CREATE TABLE IF NOT EXISTS history.allowance_table (
    id serial PRIMARY KEY,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    subclass_type int NOT NULL REFERENCES allowance_table_sub_types (id) ON DELETE RESTRICT,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.allowance_table IS 'お小遣い設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.allowance_table.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.allowance_table.allowance_table_id IS '元のお小遣いテーブルID（外部キー）';
COMMENT ON COLUMN history.allowance_table.subclass_type IS 'サブクラスタイプ（履歴時点）';
COMMENT ON COLUMN history.allowance_table.subclass_id IS 'サブクラスID（履歴時点）';
COMMENT ON COLUMN history.allowance_table.created_at IS '元作成日時';
COMMENT ON COLUMN history.allowance_table.updated_at IS '元更新日時';
COMMENT ON COLUMN history.allowance_table.recorded_at IS '履歴記録日時';

-- メンバーお小遣いテーブル
CREATE TABLE IF NOT EXISTS child_allowance_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL UNIQUE REFERENCES allowance_table (id) ON DELETE CASCADE,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE child_allowance_table IS 'メンバー個人のお小遣い設定テーブル';
COMMENT ON COLUMN child_allowance_table.id IS 'メンバーお小遣いID（主キー）';
COMMENT ON COLUMN child_allowance_table.superclass_id IS 'お小遣いテーブルID（外部キー、一意制約）';
COMMENT ON COLUMN child_allowance_table.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN child_allowance_table.created_at IS '作成日時';
COMMENT ON COLUMN child_allowance_table.updated_at IS '更新日時';

-- 家族お小遣いテーブル
CREATE TABLE IF NOT EXISTS family_allowance_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL UNIQUE REFERENCES allowance_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE family_allowance_table IS '家族のお小遣い設定テーブル';
COMMENT ON COLUMN family_allowance_table.id IS '家族お小遣いID（主キー）';
COMMENT ON COLUMN family_allowance_table.superclass_id IS 'お小遣いテーブルID（外部キー、一意制約）';
COMMENT ON COLUMN family_allowance_table.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN family_allowance_table.created_at IS '作成日時';
COMMENT ON COLUMN family_allowance_table.updated_at IS '更新日時';

-- 共有お小遣いテーブル
CREATE TABLE IF NOT EXISTS shared_allowance_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL UNIQUE REFERENCES allowance_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    family_table_id int NOT NULL REFERENCES family_allowance_table (id) ON DELETE CASCADE,
    is_public boolean NOT NULL DEFAULT false,
    favorite_count int NOT NULL DEFAULT 0 CHECK (favorite_count >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE shared_allowance_table IS '共有お小遣い設定テーブル';
COMMENT ON COLUMN shared_allowance_table.id IS '共有お小遣いID（主キー）';
COMMENT ON COLUMN shared_allowance_table.superclass_id IS 'お小遣いテーブルID（外部キー、一意制約）';
COMMENT ON COLUMN shared_allowance_table.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN shared_allowance_table.family_table_id IS '家族お小遣いテーブルID（外部キー）';
COMMENT ON COLUMN shared_allowance_table.is_public IS '公開フラグ';
COMMENT ON COLUMN shared_allowance_table.favorite_count IS 'お気に入り数（負の値不可）';
COMMENT ON COLUMN shared_allowance_table.created_at IS '作成日時';
COMMENT ON COLUMN shared_allowance_table.updated_at IS '更新日時';

-- child_allowance_table(履歴)
CREATE TABLE IF NOT EXISTS history.child_allowance_table (
    id serial PRIMARY KEY,
    child_allowance_table_id int NOT NULL REFERENCES child_allowance_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.allowance_table (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.child_allowance_table IS 'メンバーお小遣い設定の変更履歴を管理するテーブル';

-- family_allowance_table(履歴)
CREATE TABLE IF NOT EXISTS history.family_allowance_table (
    id serial PRIMARY KEY,
    family_allowance_table_id int NOT NULL REFERENCES family_allowance_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.allowance_table (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.family_allowance_table IS '家族お小遣い設定の変更履歴を管理するテーブル';

-- shared_allowance_table(履歴)
CREATE TABLE IF NOT EXISTS history.shared_allowance_table (
    id serial PRIMARY KEY,
    shared_allowance_table_id int NOT NULL REFERENCES shared_allowance_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    family_table_id int NOT NULL REFERENCES history.family_allowance_table (id) ON DELETE CASCADE,
    is_public boolean NOT NULL DEFAULT false,
    favorite_count int NOT NULL DEFAULT 0,
    history_superclass_id int NOT NULL REFERENCES history.allowance_table (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.shared_allowance_table IS '共有お小遣い設定の変更履歴を管理するテーブル';

-- 年齢別お小遣いテーブル
CREATE TABLE IF NOT EXISTS allowance_by_age (
    id serial PRIMARY KEY,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    age int NOT NULL CHECK (age >= 0),
    amount int NOT NULL DEFAULT 0 CHECK (amount >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (allowance_table_id, age)
);

COMMENT ON TABLE allowance_by_age IS '年齢別お小遣い設定テーブル';
COMMENT ON COLUMN allowance_by_age.id IS '年齢別お小遣いID（主キー）';
COMMENT ON COLUMN allowance_by_age.allowance_table_id IS 'お小遣いテーブルID（外部キー）';
COMMENT ON COLUMN allowance_by_age.age IS '年齢（負の値不可）';
COMMENT ON COLUMN allowance_by_age.amount IS 'お小遣い金額（負の値不可）';
COMMENT ON COLUMN allowance_by_age.created_at IS '作成日時';
COMMENT ON COLUMN allowance_by_age.updated_at IS '更新日時';

-- allowance_by_age(履歴)
CREATE TABLE IF NOT EXISTS history.allowance_by_age (
    id serial PRIMARY KEY,
    allowance_by_age_id int NOT NULL REFERENCES allowance_by_age (id) ON DELETE CASCADE,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    age int NOT NULL,
    amount int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.allowance_by_age IS '年齢別お小遣い設定の変更履歴を管理するテーブル';
