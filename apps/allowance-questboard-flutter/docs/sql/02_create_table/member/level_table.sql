-- レベルテーブル（基底クラス）
CREATE TABLE IF NOT EXISTS level_table (
    id serial PRIMARY KEY,
    subclass_type int NOT NULL REFERENCES child_level_sub_types (id) ON DELETE RESTRICT,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (subclass_type, subclass_id)
);

COMMENT ON TABLE level_table IS 'レベル設定の基底テーブル（ポリモーフィック関連）';
COMMENT ON COLUMN level_table.id IS 'レベルテーブルID（主キー）';
COMMENT ON COLUMN level_table.subclass_type IS 'サブクラスタイプ（child, family, shared）';
COMMENT ON COLUMN level_table.subclass_id IS 'サブクラスID（ポリモーフィック）';
COMMENT ON COLUMN level_table.created_at IS '作成日時';
COMMENT ON COLUMN level_table.updated_at IS '更新日時';

-- レベルテーブル履歴
CREATE TABLE IF NOT EXISTS history.level_table (
    id serial PRIMARY KEY,
    level_table_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    subclass_type int NOT NULL REFERENCES child_level_sub_types (id) ON DELETE RESTRICT,
    subclass_id int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.level_table IS 'レベル設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.level_table.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.level_table.level_table_id IS '元のレベルテーブルID（外部キー）';
COMMENT ON COLUMN history.level_table.subclass_type IS 'サブクラスタイプ（履歴時点）';
COMMENT ON COLUMN history.level_table.subclass_id IS 'サブクラスID（履歴時点）';
COMMENT ON COLUMN history.level_table.created_at IS '元作成日時';
COMMENT ON COLUMN history.level_table.updated_at IS '元更新日時';
COMMENT ON COLUMN history.level_table.recorded_at IS '履歴記録日時';

-- メンバーレベルテーブル
CREATE TABLE IF NOT EXISTS child_level_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL UNIQUE REFERENCES level_table (id) ON DELETE CASCADE,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE child_level_table IS 'メンバー個人のレベル設定テーブル';
COMMENT ON COLUMN child_level_table.id IS 'メンバーレベルID（主キー）';
COMMENT ON COLUMN child_level_table.superclass_id IS 'レベルテーブルID（外部キー、一意制約）';
COMMENT ON COLUMN child_level_table.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN child_level_table.created_at IS '作成日時';
COMMENT ON COLUMN child_level_table.updated_at IS '更新日時';

-- 家族レベルテーブル
CREATE TABLE IF NOT EXISTS family_level_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL UNIQUE REFERENCES level_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE family_level_table IS '家族のレベル設定テーブル';
COMMENT ON COLUMN family_level_table.id IS '家族レベルID（主キー）';
COMMENT ON COLUMN family_level_table.superclass_id IS 'レベルテーブルID（外部キー、一意制約）';
COMMENT ON COLUMN family_level_table.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN family_level_table.created_at IS '作成日時';
COMMENT ON COLUMN family_level_table.updated_at IS '更新日時';

-- 共有レベルテーブル
CREATE TABLE IF NOT EXISTS shared_level_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL UNIQUE REFERENCES level_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    family_table_id int NOT NULL REFERENCES family_level_table (id) ON DELETE CASCADE,
    is_public boolean NOT NULL DEFAULT false,
    favorite_count int NOT NULL DEFAULT 0 CHECK (favorite_count >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE shared_level_table IS '共有レベル設定テーブル';
COMMENT ON COLUMN shared_level_table.id IS '共有レベルID（主キー）';
COMMENT ON COLUMN shared_level_table.superclass_id IS 'レベルテーブルID（外部キー、一意制約）';
COMMENT ON COLUMN shared_level_table.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN shared_level_table.family_table_id IS '家族レベルテーブルID（外部キー）';
COMMENT ON COLUMN shared_level_table.is_public IS '公開フラグ';
COMMENT ON COLUMN shared_level_table.favorite_count IS 'お気に入り数（負の値不可）';
COMMENT ON COLUMN shared_level_table.created_at IS '作成日時';
COMMENT ON COLUMN shared_level_table.updated_at IS '更新日時';

-- メンバーレベル履歴テーブル
CREATE TABLE IF NOT EXISTS history.child_level_table (
    id serial PRIMARY KEY,
    child_level_table_id int NOT NULL REFERENCES child_level_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.level_table (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.child_level_table IS 'メンバーレベル設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.child_level_table.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.child_level_table.child_level_table_id IS '元のメンバーレベルID（外部キー）';
COMMENT ON COLUMN history.child_level_table.superclass_id IS 'レベルテーブルID（外部キー）';
COMMENT ON COLUMN history.child_level_table.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN history.child_level_table.history_superclass_id IS '履歴レベルテーブルID（外部キー）';
COMMENT ON COLUMN history.child_level_table.created_at IS '元作成日時';
COMMENT ON COLUMN history.child_level_table.updated_at IS '元更新日時';
COMMENT ON COLUMN history.child_level_table.recorded_at IS '履歴記録日時';

-- 家族レベル履歴テーブル
CREATE TABLE IF NOT EXISTS history.family_level_table (
    id serial PRIMARY KEY,
    family_level_table_id int NOT NULL REFERENCES family_level_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    history_superclass_id int NOT NULL REFERENCES history.level_table (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.family_level_table IS '家族レベル設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.family_level_table.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.family_level_table.family_level_table_id IS '元の家族レベルID（外部キー）';
COMMENT ON COLUMN history.family_level_table.superclass_id IS 'レベルテーブルID（外部キー）';
COMMENT ON COLUMN history.family_level_table.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.family_level_table.history_superclass_id IS '履歴レベルテーブルID（外部キー）';
COMMENT ON COLUMN history.family_level_table.created_at IS '元作成日時';
COMMENT ON COLUMN history.family_level_table.updated_at IS '元更新日時';
COMMENT ON COLUMN history.family_level_table.recorded_at IS '履歴記録日時';

-- 共有レベル履歴テーブル
CREATE TABLE IF NOT EXISTS history.shared_level_table (
    id serial PRIMARY KEY,
    shared_level_table_id int NOT NULL REFERENCES shared_level_table (id) ON DELETE CASCADE,
    superclass_id int NOT NULL REFERENCES level_table (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    family_table_id int NOT NULL REFERENCES family_level_table (id) ON DELETE CASCADE,
    is_public boolean NOT NULL DEFAULT false,
    favorite_count int NOT NULL DEFAULT 0,
    history_superclass_id int NOT NULL REFERENCES history.level_table (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.shared_level_table IS '共有レベル設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.shared_level_table.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.shared_level_table.shared_level_table_id IS '元の共有レベルID（外部キー）';
COMMENT ON COLUMN history.shared_level_table.superclass_id IS 'レベルテーブルID（外部キー）';
COMMENT ON COLUMN history.shared_level_table.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.shared_level_table.family_table_id IS '家族レベルテーブルID（外部キー）';
COMMENT ON COLUMN history.shared_level_table.is_public IS '公開フラグ（履歴時点）';
COMMENT ON COLUMN history.shared_level_table.favorite_count IS 'お気に入り数（履歴時点）';
COMMENT ON COLUMN history.shared_level_table.history_superclass_id IS '履歴レベルテーブルID（外部キー）';
COMMENT ON COLUMN history.shared_level_table.created_at IS '元作成日時';
COMMENT ON COLUMN history.shared_level_table.updated_at IS '元更新日時';
COMMENT ON COLUMN history.shared_level_table.recorded_at IS '履歴記録日時';

-- レベル別お小遣いテーブル
CREATE TABLE IF NOT EXISTS allowance_by_level (
    id serial PRIMARY KEY,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    level int NOT NULL CHECK (level > 0),
    amount int NOT NULL CHECK (amount >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (allowance_table_id, level)
);

COMMENT ON TABLE allowance_by_level IS 'レベル別お小遣い設定テーブル';
COMMENT ON COLUMN allowance_by_level.id IS 'レベル別お小遣いID（主キー）';
COMMENT ON COLUMN allowance_by_level.allowance_table_id IS 'お小遣いテーブルID（外部キー）';
COMMENT ON COLUMN allowance_by_level.level IS 'レベル（正の値のみ）';
COMMENT ON COLUMN allowance_by_level.amount IS 'お小遣い金額（負の値不可）';
COMMENT ON COLUMN allowance_by_level.created_at IS '作成日時';
COMMENT ON COLUMN allowance_by_level.updated_at IS '更新日時';

-- レベル別お小遣い履歴テーブル
CREATE TABLE IF NOT EXISTS history.allowance_by_level (
    id serial PRIMARY KEY,
    allowance_by_level_id int NOT NULL REFERENCES allowance_by_level (id) ON DELETE CASCADE,
    allowance_table_id int NOT NULL REFERENCES allowance_table (id) ON DELETE CASCADE,
    level int NOT NULL,
    amount int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.allowance_by_level IS 'レベル別お小遣い設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.allowance_by_level.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.allowance_by_level.allowance_by_level_id IS '元のレベル別お小遣いID（外部キー）';
COMMENT ON COLUMN history.allowance_by_level.allowance_table_id IS 'お小遣いテーブルID（外部キー）';
COMMENT ON COLUMN history.allowance_by_level.level IS 'レベル（履歴時点）';
COMMENT ON COLUMN history.allowance_by_level.amount IS 'お小遣い金額（履歴時点）';
COMMENT ON COLUMN history.allowance_by_level.created_at IS '元作成日時';
COMMENT ON COLUMN history.allowance_by_level.updated_at IS '元更新日時';
COMMENT ON COLUMN history.allowance_by_level.recorded_at IS '履歴記録日時';
