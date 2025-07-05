-- クエストテーブル
CREATE TABLE IF NOT EXISTS quests (
    id serial PRIMARY KEY,
    subclass_type int NOT NULL REFERENCES quest_subclass_types (id) ON DELETE RESTRICT,
    subclass_id int NOT NULL,
    category_id int NOT NULL REFERENCES quest_categories (id) ON DELETE RESTRICT,
    icon_id int NOT NULL REFERENCES icons (id) ON DELETE RESTRICT,
    age_from int NOT NULL CHECK (age_from >= 0),
    age_to int NOT NULL CHECK (age_to >= age_from),
    has_published_month boolean NOT NULL DEFAULT false,
    month_from int CHECK (month_from >= 1 AND month_from <= 12),
    month_to int CHECK (month_to >= 1 AND month_to <= 12),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (subclass_type, subclass_id)
);

COMMENT ON TABLE quests IS 'クエストの基本情報を管理するテーブル';
COMMENT ON COLUMN quests.id IS 'クエストID（主キー）';
COMMENT ON COLUMN quests.subclass_type IS 'サブクラスタイプ（template, family, custom）';
COMMENT ON COLUMN quests.subclass_id IS 'サブクラスID（ポリモーフィック）';
COMMENT ON COLUMN quests.category_id IS 'クエストカテゴリID（外部キー）';
COMMENT ON COLUMN quests.icon_id IS 'アイコンID（外部キー）';
COMMENT ON COLUMN quests.age_from IS '対象年齢下限（負の値不可）';
COMMENT ON COLUMN quests.age_to IS '対象年齢上限（age_from以上）';
COMMENT ON COLUMN quests.has_published_month IS '季節限定フラグ';
COMMENT ON COLUMN quests.month_from IS '公開開始月（1-12、季節限定の場合のみ）';
COMMENT ON COLUMN quests.month_to IS '公開終了月（1-12、季節限定の場合のみ）';
COMMENT ON COLUMN quests.created_at IS '作成日時';
COMMENT ON COLUMN quests.updated_at IS '更新日時';

-- クエスト(履歴)
CREATE TABLE IF NOT EXISTS history.quests (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    subclass_type int NOT NULL REFERENCES quest_subclass_types (id) ON DELETE RESTRICT,
    subclass_id int NOT NULL,
    category_id int NOT NULL REFERENCES quest_categories (id) ON DELETE RESTRICT,
    icon_id int NOT NULL REFERENCES icons (id) ON DELETE RESTRICT,
    age_from int NOT NULL,
    age_to int NOT NULL,
    has_published_month boolean NOT NULL DEFAULT false,
    month_from int NOT NULL,
    month_to int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.quests IS 'クエスト情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.quests.quest_id IS '元のクエストID（外部キー）';

-- クエスト翻訳テーブル
CREATE TABLE IF NOT EXISTS quests_translation (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    title varchar(200) NOT NULL CHECK (length(title) > 0),
    client varchar(100) NOT NULL CHECK (length(client) > 0),
    request_detail text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_id, language_code)
);

COMMENT ON TABLE quests_translation IS 'クエスト情報の多言語対応テーブル';
COMMENT ON COLUMN quests_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN quests_translation.quest_id IS 'クエストID（外部キー）';
COMMENT ON COLUMN quests_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN quests_translation.title IS 'クエストタイトルの翻訳（空文字不可）';
COMMENT ON COLUMN quests_translation.client IS 'クライアント名の翻訳（空文字不可）';
COMMENT ON COLUMN quests_translation.request_detail IS '依頼詳細の翻訳';
COMMENT ON COLUMN quests_translation.created_at IS '作成日時';
COMMENT ON COLUMN quests_translation.updated_at IS '更新日時';

-- クエスト(翻訳履歴)
CREATE TABLE IF NOT EXISTS history.quests_translation (
    id serial PRIMARY KEY,
    quests_translation_id int NOT NULL REFERENCES quests_translation (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    title varchar NOT NULL,
    client varchar NOT NULL,
    request_detail text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.quests_translation IS 'クエスト翻訳情報の変更履歴を管理するテーブル';

-- shared_quests
CREATE TABLE IF NOT EXISTS shared_quests (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    pinned_comment_id int REFERENCES comments (id) ON DELETE SET NULL,
    is_public boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (family_id, quest_id)
);

COMMENT ON TABLE shared_quests IS '他の家族と共有されているクエストを管理するテーブル';
COMMENT ON COLUMN shared_quests.pinned_comment_id IS 'ピン留めコメントID（任意）';
COMMENT ON COLUMN shared_quests.is_public IS '公開フラグ';

-- shared_quests(履歴)
CREATE TABLE IF NOT EXISTS history.shared_quests (
    id serial PRIMARY KEY,
    shared_quest_id int NOT NULL REFERENCES shared_quests (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    pinned_comment_id int REFERENCES comments (id) ON DELETE SET NULL,
    is_public boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.shared_quests IS '共有クエスト情報の変更履歴を管理するテーブル';


-- family_quests
CREATE TABLE IF NOT EXISTS family_quests (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    is_shared boolean NOT NULL DEFAULT false,
    shared_quest_id int REFERENCES shared_quests (id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (family_id, quest_id)
);

COMMENT ON TABLE family_quests IS '家族が利用しているクエストを管理するテーブル';
COMMENT ON COLUMN family_quests.is_shared IS '共有フラグ';
COMMENT ON COLUMN family_quests.shared_quest_id IS '共有クエストID（共有時のみ）';

-- family_quests(履歴)
CREATE TABLE IF NOT EXISTS history.family_quests (
    id serial PRIMARY KEY,
    family_quest_id int NOT NULL REFERENCES family_quests (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    is_shared boolean NOT NULL DEFAULT false,
    shared_quest_id int REFERENCES shared_quests (id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.family_quests IS '家族クエスト情報の変更履歴を管理するテーブル';


-- saved_quests(家族が保存(いいね)したクエスト)
CREATE TABLE IF NOT EXISTS saved_quests (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    shared_quest_id int REFERENCES shared_quests (id) ON DELETE SET NULL,
    saved_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_id, family_id)
);

COMMENT ON TABLE saved_quests IS '家族が保存（お気に入り）したクエストを管理するテーブル';
COMMENT ON COLUMN saved_quests.saved_at IS '保存日時';

-- template_quests(アプリのテンプレートクエスト)
CREATE TABLE IF NOT EXISTS template_quests (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE template_quests IS 'アプリ提供のテンプレートクエストを管理するテーブル';

-- メンバークエストステータステーブル
CREATE TABLE IF NOT EXISTS child_quest_status (
    id serial PRIMARY KEY,
    code varchar(20) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE child_quest_status IS 'メンバーのクエスト進行状態を管理するマスタテーブル';
COMMENT ON COLUMN child_quest_status.id IS 'ステータスID（主キー）';
COMMENT ON COLUMN child_quest_status.code IS 'ステータスコード（例：assigned, in_progress, completed等）';
COMMENT ON COLUMN child_quest_status.created_at IS '作成日時';
COMMENT ON COLUMN child_quest_status.updated_at IS '更新日時';

-- メンバークエストステータス翻訳テーブル
CREATE TABLE IF NOT EXISTS child_quest_statuses_translation (
    id serial PRIMARY KEY,
    child_quest_status_id int NOT NULL REFERENCES child_quest_status (id) ON DELETE CASCADE,
    language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (child_quest_status_id, language_code)
);

COMMENT ON TABLE child_quest_statuses_translation IS 'メンバークエストステータスの多言語対応テーブル';
COMMENT ON COLUMN child_quest_statuses_translation.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN child_quest_statuses_translation.child_quest_status_id IS 'ステータスID（外部キー）';
COMMENT ON COLUMN child_quest_statuses_translation.language_code IS '言語ID（外部キー）';
COMMENT ON COLUMN child_quest_statuses_translation.name IS 'ステータス名の翻訳';
COMMENT ON COLUMN child_quest_statuses_translation.created_at IS '作成日時';
COMMENT ON COLUMN child_quest_statuses_translation.updated_at IS '更新日時';


-- メンバークエストテーブル
CREATE TABLE IF NOT EXISTS child_quests (
    id serial PRIMARY KEY,
    quest_id int NOT NULL REFERENCES quests (id) ON DELETE RESTRICT,
    child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
    current_level int NOT NULL DEFAULT 1 CHECK (current_level > 0),
    status int NOT NULL REFERENCES child_quest_status (id) ON DELETE RESTRICT,
    published_at timestamptz NOT NULL DEFAULT now(),
    achieved_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (quest_id, child_id),
    CHECK (
        (achieved_at IS NULL) OR 
        (achieved_at IS NOT NULL AND achieved_at >= published_at)
    )
);

COMMENT ON TABLE child_quests IS 'メンバーに公開されているクエストとその進行状況を管理するテーブル';
COMMENT ON COLUMN child_quests.id IS 'メンバークエストID（主キー）';
COMMENT ON COLUMN child_quests.quest_id IS 'クエストID（外部キー）';
COMMENT ON COLUMN child_quests.child_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN child_quests.current_level IS '現在のレベル（正の値のみ）';
COMMENT ON COLUMN child_quests.status IS 'クエストステータスID（外部キー）';
COMMENT ON COLUMN child_quests.published_at IS 'クエスト公開日時';
COMMENT ON COLUMN child_quests.achieved_at IS 'クエスト達成日時（未達成の場合はNULL）';
COMMENT ON COLUMN child_quests.created_at IS '作成日時';
COMMENT ON COLUMN child_quests.updated_at IS '更新日時';
