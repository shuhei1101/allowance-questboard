-- メンバーテーブル
CREATE TABLE IF NOT EXISTS members (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    name varchar(100) NOT NULL CHECK (length(name) > 0),
    icon_id int REFERENCES icons (id) ON DELETE SET NULL,
    birthday date NOT NULL CHECK (birthday <= CURRENT_DATE),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE members IS 'メンバー（子供）の基本情報を管理するテーブル';
COMMENT ON COLUMN members.id IS 'メンバーID（主キー）';
COMMENT ON COLUMN members.user_id IS 'ユーザID（外部キー、一意制約）';
COMMENT ON COLUMN members.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN members.name IS 'メンバー名（空文字不可）';
COMMENT ON COLUMN members.icon_id IS 'アイコンID（外部キー、NULL許可）';
COMMENT ON COLUMN members.birthday IS '誕生日（未来日不可）';
COMMENT ON COLUMN members.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN members.updated_at IS 'レコードの更新日時';

-- メンバー履歴テーブル
CREATE TABLE IF NOT EXISTS history.members (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    name varchar(100) NOT NULL,
    icon_id int REFERENCES icons (id) ON DELETE SET NULL,
    birthday date NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.members IS 'メンバー情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.members.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.members.member_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN history.members.user_id IS 'ユーザID（外部キー）';
COMMENT ON COLUMN history.members.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.members.name IS 'メンバー名（履歴時点）';
COMMENT ON COLUMN history.members.icon_id IS 'アイコンID（履歴時点）';
COMMENT ON COLUMN history.members.birthday IS '誕生日（履歴時点）';
COMMENT ON COLUMN history.members.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.members.updated_at IS '元レコードの更新日時';
COMMENT ON COLUMN history.members.recorded_at IS '履歴記録日時';

-- メンバー設定テーブル
CREATE TABLE IF NOT EXISTS members_settings (
    id serial PRIMARY KEY,
    member_id int NOT NULL UNIQUE REFERENCES members (id) ON DELETE CASCADE,
    min_savings int DEFAULT 0 CHECK (min_savings >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE members_settings IS 'メンバーの設定情報を管理するテーブル';
COMMENT ON COLUMN members_settings.id IS '設定ID（主キー）';
COMMENT ON COLUMN members_settings.member_id IS 'メンバーID（外部キー、一意制約）';
COMMENT ON COLUMN members_settings.min_savings IS '最低貯金額（負の値不可）';
COMMENT ON COLUMN members_settings.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN members_settings.updated_at IS 'レコードの更新日時';

-- メンバー設定履歴テーブル
CREATE TABLE IF NOT EXISTS history.members_settings (
    id serial PRIMARY KEY,
    member_settings_id int NOT NULL REFERENCES members_settings (id) ON DELETE CASCADE,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    min_savings int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.members_settings IS 'メンバー設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.members_settings.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.members_settings.member_settings_id IS '元の設定ID（外部キー）';
COMMENT ON COLUMN history.members_settings.member_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN history.members_settings.min_savings IS '最低貯金額（履歴時点）';
COMMENT ON COLUMN history.members_settings.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.members_settings.updated_at IS '元レコードの更新日時';
COMMENT ON COLUMN history.members_settings.recorded_at IS '履歴記録日時';

-- メンバーステータステーブル
CREATE TABLE IF NOT EXISTS member_stats (
    id serial PRIMARY KEY,
    member_id int NOT NULL UNIQUE REFERENCES members (id) ON DELETE CASCADE,
    exp int DEFAULT 0 CHECK (exp >= 0),
    balance int DEFAULT 0 CHECK (balance >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE member_stats IS 'メンバーのゲーム的ステータスを管理するテーブル';
COMMENT ON COLUMN member_stats.id IS 'ステータスID（主キー）';
COMMENT ON COLUMN member_stats.member_id IS 'メンバーID（外部キー、一意制約）';
COMMENT ON COLUMN member_stats.exp IS '経験値（負の値不可）';
COMMENT ON COLUMN member_stats.balance IS '残高（負の値不可）';
COMMENT ON COLUMN member_stats.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN member_stats.updated_at IS 'レコードの更新日時';

-- メンバーステータス履歴テーブル
CREATE TABLE IF NOT EXISTS history.member_stats (
    id serial PRIMARY KEY,
    member_stats_id int NOT NULL REFERENCES member_stats (id) ON DELETE CASCADE,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    exp int DEFAULT 0,
    balance int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.member_stats IS 'メンバーステータスの変更履歴を管理するテーブル';
COMMENT ON COLUMN history.member_stats.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.member_stats.member_stats_id IS '元のステータスID（外部キー）';
COMMENT ON COLUMN history.member_stats.member_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN history.member_stats.exp IS '経験値（履歴時点）';
COMMENT ON COLUMN history.member_stats.balance IS '残高（履歴時点）';
COMMENT ON COLUMN history.member_stats.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.member_stats.updated_at IS '元レコードの更新日時';
COMMENT ON COLUMN history.member_stats.recorded_at IS '履歴記録日時';
