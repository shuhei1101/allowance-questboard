-- メンバーテーブル
CREATE TABLE IF NOT EXISTS children (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    name varchar(100) NOT NULL CHECK (length(name) > 0),
    icon_id int REFERENCES icons (id) ON DELETE SET NULL,
    birthday date NOT NULL CHECK (birthday <= CURRENT_DATE),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE children IS 'メンバー（子供）の基本情報を管理するテーブル';
COMMENT ON COLUMN children.id IS 'メンバーID（主キー）';
COMMENT ON COLUMN children.user_id IS 'ユーザID（外部キー、一意制約）';
COMMENT ON COLUMN children.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN children.name IS 'メンバー名（空文字不可）';
COMMENT ON COLUMN children.icon_id IS 'アイコンID（外部キー、NULL許可）';
COMMENT ON COLUMN children.birthday IS '誕生日（未来日不可）';
COMMENT ON COLUMN children.created_at IS '作成日時';
COMMENT ON COLUMN children.updated_at IS '更新日時';

-- メンバー履歴テーブル
CREATE TABLE IF NOT EXISTS history.children (
    id serial PRIMARY KEY,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    name varchar(100) NOT NULL,
    icon_id int REFERENCES icons (id) ON DELETE SET NULL,
    birthday date NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.children IS 'メンバー情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.children.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.children.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN history.children.user_id IS 'ユーザID（外部キー）';
COMMENT ON COLUMN history.children.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.children.name IS 'メンバー名（履歴時点）';
COMMENT ON COLUMN history.children.icon_id IS 'アイコンID（履歴時点）';
COMMENT ON COLUMN history.children.birthday IS '誕生日（履歴時点）';
COMMENT ON COLUMN history.children.created_at IS '元作成日時';
COMMENT ON COLUMN history.children.updated_at IS '元更新日時';
COMMENT ON COLUMN history.children.recorded_at IS '履歴記録日時';

-- メンバー設定テーブル
CREATE TABLE IF NOT EXISTS children_settings (
    id serial PRIMARY KEY,
    child_id int NOT NULL UNIQUE REFERENCES children (id) ON DELETE CASCADE,
    min_savings int DEFAULT 0 CHECK (min_savings >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE children_settings IS 'メンバーの設定情報を管理するテーブル';
COMMENT ON COLUMN children_settings.id IS '設定ID（主キー）';
COMMENT ON COLUMN children_settings.child_id IS 'メンバーID（外部キー、一意制約）';
COMMENT ON COLUMN children_settings.min_savings IS '最低貯金額（負の値不可）';
COMMENT ON COLUMN children_settings.created_at IS '作成日時';
COMMENT ON COLUMN children_settings.updated_at IS '更新日時';

-- メンバー設定履歴テーブル
CREATE TABLE IF NOT EXISTS history.children_settings (
    id serial PRIMARY KEY,
    child_settings_id int NOT NULL REFERENCES children_settings (id) ON DELETE CASCADE,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    min_savings int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.children_settings IS 'メンバー設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.children_settings.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.children_settings.child_settings_id IS '元の設定ID（外部キー）';
COMMENT ON COLUMN history.children_settings.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN history.children_settings.min_savings IS '最低貯金額（履歴時点）';
COMMENT ON COLUMN history.children_settings.created_at IS '元作成日時';
COMMENT ON COLUMN history.children_settings.updated_at IS '元更新日時';
COMMENT ON COLUMN history.children_settings.recorded_at IS '履歴記録日時';

-- メンバーステータステーブル
CREATE TABLE IF NOT EXISTS child_stats (
    id serial PRIMARY KEY,
    child_id int NOT NULL UNIQUE REFERENCES children (id) ON DELETE CASCADE,
    exp int DEFAULT 0 CHECK (exp >= 0),
    balance int DEFAULT 0 CHECK (balance >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE child_stats IS 'メンバーのゲーム的ステータスを管理するテーブル';
COMMENT ON COLUMN child_stats.id IS 'ステータスID（主キー）';
COMMENT ON COLUMN child_stats.child_id IS 'メンバーID（外部キー、一意制約）';
COMMENT ON COLUMN child_stats.exp IS '経験値（負の値不可）';
COMMENT ON COLUMN child_stats.balance IS '残高（負の値不可）';
COMMENT ON COLUMN child_stats.created_at IS '作成日時';
COMMENT ON COLUMN child_stats.updated_at IS '更新日時';

-- メンバーステータス履歴テーブル
CREATE TABLE IF NOT EXISTS history.child_stats (
    id serial PRIMARY KEY,
    child_stats_id int NOT NULL REFERENCES child_stats (id) ON DELETE CASCADE,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    exp int DEFAULT 0,
    balance int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.child_stats IS 'メンバーステータスの変更履歴を管理するテーブル';
COMMENT ON COLUMN history.child_stats.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.child_stats.child_stats_id IS '元のステータスID（外部キー）';
COMMENT ON COLUMN history.child_stats.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN history.child_stats.exp IS '経験値（履歴時点）';
COMMENT ON COLUMN history.child_stats.balance IS '残高（履歴時点）';
COMMENT ON COLUMN history.child_stats.created_at IS '元作成日時';
COMMENT ON COLUMN history.child_stats.updated_at IS '元更新日時';
COMMENT ON COLUMN history.child_stats.recorded_at IS '履歴記録日時';
