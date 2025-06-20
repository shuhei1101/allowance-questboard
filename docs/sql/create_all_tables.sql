-- =============================================================================
-- CREATE ALL TABLES
-- 
-- このファイルは create_table.md に記載された実行順序に従って
-- すべてのSQLを統合したファイルです
-- 
-- 実行日: 2025年6月20日
-- =============================================================================

-- =============================================================================
-- 1. スキーマ作成
-- =============================================================================

-- historyスキーマ作成
CREATE SCHEMA IF NOT EXISTS history;

-- =============================================================================
-- 2. 基本マスタテーブル（依存関係なし）
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 言語マスタ
-- -----------------------------------------------------------------------------
-- 言語マスタテーブル
CREATE TABLE IF NOT EXISTS languages (
    id serial PRIMARY KEY,
    code varchar(10) NOT NULL UNIQUE,  -- en, ja
    name varchar(100) NOT NULL,  -- English, Japanese
    is_active boolean NOT NULL DEFAULT true,
    sort_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE languages IS 'システムでサポートする言語を管理するマスタテーブル';
COMMENT ON COLUMN languages.id IS '言語ID（主キー）';
COMMENT ON COLUMN languages.code IS '言語コード（ISO 639-1準拠、例：en, ja）';
COMMENT ON COLUMN languages.name IS '言語名（例：English, Japanese）';
COMMENT ON COLUMN languages.is_active IS '有効フラグ';
COMMENT ON COLUMN languages.sort_order IS '表示順序（小さい値が上位）';
COMMENT ON COLUMN languages.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN languages.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 通貨マスタ
-- -----------------------------------------------------------------------------
-- 通貨マスタテーブル
CREATE TABLE IF NOT EXISTS currencies (
    id serial PRIMARY KEY,
    code varchar NOT NULL UNIQUE,  -- 通貨コード (ISO 4217)
    name varchar NOT NULL,
    symbol varchar NOT NULL,  -- $, €, ¥, etc.
    is_active boolean NOT NULL DEFAULT true,
    sort_order int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE currencies IS '通貨情報を管理するマスタテーブル';
COMMENT ON COLUMN currencies.id IS '通貨ID（主キー）';
COMMENT ON COLUMN currencies.code IS '通貨コード（ISO 4217準拠、例：USD, EUR, JPY）';
COMMENT ON COLUMN currencies.name IS '通貨名（例：US Dollar, Euro, Japanese Yen）';
COMMENT ON COLUMN currencies.symbol IS '通貨記号（例：$, €, ¥）';
COMMENT ON COLUMN currencies.is_active IS '有効フラグ';
COMMENT ON COLUMN currencies.sort_order IS '表示順序';
COMMENT ON COLUMN currencies.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN currencies.updated_at IS 'レコードの更新日時';

-- 為替レートテーブル
CREATE TABLE IF NOT EXISTS exchange_rates (
    id serial PRIMARY KEY,
    base_currency int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
    target_currency int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
    rate numeric(15,6) NOT NULL CHECK (rate > 0),
    effective_date date NOT NULL DEFAULT CURRENT_DATE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (base_currency, target_currency, effective_date),
    CHECK (base_currency != target_currency)
);

COMMENT ON TABLE exchange_rates IS '通貨間の為替レートを管理するテーブル';
COMMENT ON COLUMN exchange_rates.id IS '為替レートID（主キー）';
COMMENT ON COLUMN exchange_rates.base_currency IS '基準通貨ID（外部キー）';
COMMENT ON COLUMN exchange_rates.target_currency IS '対象通貨ID（外部キー）';
COMMENT ON COLUMN exchange_rates.rate IS '為替レート（正の値のみ、小数点以下6桁）';
COMMENT ON COLUMN exchange_rates.effective_date IS '適用日';
COMMENT ON COLUMN exchange_rates.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN exchange_rates.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- アイコン関連
-- -----------------------------------------------------------------------------
-- アイコンカテゴリテーブル
CREATE TABLE IF NOT EXISTS icon_category (
    id serial PRIMARY KEY,
    code varchar(50) NOT NULL UNIQUE,
    sort_order int DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE icon_category IS 'アイコンのカテゴリを管理するテーブル';
COMMENT ON COLUMN icon_category.id IS 'アイコンカテゴリID（主キー）';
COMMENT ON COLUMN icon_category.code IS 'カテゴリコード（一意制約）';
COMMENT ON COLUMN icon_category.sort_order IS '表示順序';
COMMENT ON COLUMN icon_category.is_active IS '有効フラグ';
COMMENT ON COLUMN icon_category.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN icon_category.updated_at IS 'レコードの更新日時';

-- アイコンカテゴリ翻訳テーブル
CREATE TABLE IF NOT EXISTS icon_category_translations (
    id serial PRIMARY KEY,
    category_id int NOT NULL REFERENCES icon_category(id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages(id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (category_id, language_id)
);

COMMENT ON TABLE icon_category_translations IS 'アイコンカテゴリの多言語対応テーブル';
COMMENT ON COLUMN icon_category_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN icon_category_translations.category_id IS 'アイコンカテゴリID（外部キー）';
COMMENT ON COLUMN icon_category_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN icon_category_translations.name IS 'カテゴリ名の翻訳';
COMMENT ON COLUMN icon_category_translations.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN icon_category_translations.updated_at IS 'レコードの更新日時';

-- アイコンテーブル
CREATE TABLE IF NOT EXISTS icons (
    id serial PRIMARY KEY,
    code varchar(100) NOT NULL UNIQUE,  -- アイコンコード
    category_id int REFERENCES icon_category(id) ON DELETE SET NULL,
    file_path varchar(500),  -- アイコンファイルのパス
    alt_text varchar(200),  -- 代替テキスト
    sort_order int DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE icons IS 'アイコン情報を管理するテーブル';
COMMENT ON COLUMN icons.id IS 'アイコンID（主キー）';
COMMENT ON COLUMN icons.code IS 'アイコンコード（一意制約）';
COMMENT ON COLUMN icons.category_id IS 'アイコンカテゴリID（外部キー、NULL許可）';
COMMENT ON COLUMN icons.file_path IS 'アイコンファイルのパス';
COMMENT ON COLUMN icons.alt_text IS '代替テキスト（アクセシビリティ対応）';
COMMENT ON COLUMN icons.sort_order IS '表示順序';
COMMENT ON COLUMN icons.is_active IS '有効フラグ';
COMMENT ON COLUMN icons.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN icons.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 国家マスタ
-- -----------------------------------------------------------------------------
-- 国家マスタテーブル
CREATE TABLE IF NOT EXISTS countries (
    id serial PRIMARY KEY,
    name varchar NOT NULL UNIQUE,
    icon_id integer REFERENCES icons (id) ON DELETE SET NULL,
    is_active boolean NOT NULL DEFAULT true,
    sort_order int DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE countries IS '国家情報を管理するマスタテーブル';
COMMENT ON COLUMN countries.id IS '国家ID（主キー）';
COMMENT ON COLUMN countries.name IS '国家名（英語）';
COMMENT ON COLUMN countries.icon_id IS '国旗アイコンID（外部キー、NULL許可）';
COMMENT ON COLUMN countries.is_active IS '有効フラグ';
COMMENT ON COLUMN countries.sort_order IS '表示順序';
COMMENT ON COLUMN countries.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN countries.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 学歴マスタ
-- -----------------------------------------------------------------------------
-- 学歴マスタテーブル
CREATE TABLE IF NOT EXISTS education (
    id serial PRIMARY KEY,
    code varchar(20) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE education IS '学歴の種類を管理するマスタテーブル';
COMMENT ON COLUMN education.id IS '学歴ID（主キー）';
COMMENT ON COLUMN education.code IS '学歴コード（例：elementary, junior_high, high_school等）';
COMMENT ON COLUMN education.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN education.updated_at IS 'レコードの更新日時';

-- 学歴翻訳テーブル
CREATE TABLE IF NOT EXISTS education_translations (
    id serial PRIMARY KEY,
    education_id int NOT NULL REFERENCES education (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (education_id, language_id)
);

COMMENT ON TABLE education_translations IS '学歴の多言語対応テーブル';
COMMENT ON COLUMN education_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN education_translations.education_id IS '学歴ID（外部キー）';
COMMENT ON COLUMN education_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN education_translations.name IS '学歴名の翻訳';
COMMENT ON COLUMN education_translations.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN education_translations.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- ユーザタイプ
-- -----------------------------------------------------------------------------
-- ユーザタイプテーブル
CREATE TABLE IF NOT EXISTS user_types (
    id serial PRIMARY KEY,
    type varchar(20) NOT NULL UNIQUE,  -- family, member
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE user_types IS 'ユーザのタイプを分類するテーブル';
COMMENT ON COLUMN user_types.id IS 'ユーザタイプID（主キー）';
COMMENT ON COLUMN user_types.type IS 'ユーザタイプコード（family, member等）';
COMMENT ON COLUMN user_types.description IS 'ユーザタイプの説明';
COMMENT ON COLUMN user_types.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN user_types.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- レポート対象タイプ
-- -----------------------------------------------------------------------------
-- レポート対象タイプテーブル
CREATE TABLE IF NOT EXISTS reportable_types (
    id serial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,  -- family, member, quest, comment
    description text NOT NULL CHECK (length(description) > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE reportable_types IS 'レポート対象となるオブジェクトのタイプを管理するマスタテーブル';
COMMENT ON COLUMN reportable_types.id IS 'レポート対象タイプID（主キー）';
COMMENT ON COLUMN reportable_types.type IS 'レポート対象タイプコード（family, member, quest, comment等）';
COMMENT ON COLUMN reportable_types.description IS 'レポート対象タイプの説明（空文字不可）';
COMMENT ON COLUMN reportable_types.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN reportable_types.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- レポートステータス
-- -----------------------------------------------------------------------------
-- レポートステータステーブル
CREATE TABLE IF NOT EXISTS report_status (
    id serial PRIMARY KEY,
    code varchar(20) NOT NULL UNIQUE,
    status varchar(50) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- report_status テーブルにビジネスロジック制約を追加
ALTER TABLE report_status
ADD CONSTRAINT chk_report_status_code_format 
CHECK (code ~ '^[a-z_][a-z0-9_]*$'),
ADD CONSTRAINT chk_report_status_name_length 
CHECK (length(status) >= 2 AND length(status) <= 50);

COMMENT ON TABLE report_status IS 'レポートの処理状態を管理するマスタテーブル';
COMMENT ON COLUMN report_status.id IS 'ステータスID（主キー）';
COMMENT ON COLUMN report_status.code IS 'ステータスコード（例：pending, reviewed, resolved, dismissed）';
COMMENT ON COLUMN report_status.status IS 'ステータス名';
COMMENT ON COLUMN report_status.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN report_status.updated_at IS 'レコードの更新日時';

-- レポートテーブル
CREATE TABLE IF NOT EXISTS reports (
    id serial PRIMARY KEY,
    reporter_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    reporter_id int NOT NULL,  -- ユーザID (family_id or member_id)
    reportable_type int NOT NULL REFERENCES reportable_types (id) ON DELETE RESTRICT,
    reportable_id int NOT NULL,
    status_id int NOT NULL REFERENCES report_status (id) ON DELETE RESTRICT,
    reported_at timestamptz NOT NULL DEFAULT now(),
    resolved_at timestamptz DEFAULT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CHECK (
        (resolved_at IS NULL) OR 
        (resolved_at IS NOT NULL AND resolved_at >= reported_at)
    )
);

-- reports テーブルにビジネスロジック制約を追加
ALTER TABLE reports
ADD CONSTRAINT chk_reports_reporter_id_positive 
CHECK (reporter_id > 0),
ADD CONSTRAINT chk_reports_reportable_id_positive 
CHECK (reportable_id > 0),
ADD CONSTRAINT chk_reports_dates_logical 
CHECK (
    (resolved_at IS NULL) OR 
    (resolved_at IS NOT NULL AND resolved_at >= reported_at AND resolved_at <= now())
);

-- パフォーマンス向上のためのインデックス
CREATE INDEX IF NOT EXISTS idx_reports_reporter ON reports (reporter_type, reporter_id);
CREATE INDEX IF NOT EXISTS idx_reports_reportable ON reports (reportable_type, reportable_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports (status_id);
CREATE INDEX IF NOT EXISTS idx_reports_reported_at ON reports (reported_at);
CREATE INDEX IF NOT EXISTS idx_reports_resolved_at ON reports (resolved_at) WHERE resolved_at IS NOT NULL;

COMMENT ON TABLE reports IS 'ユーザからのレポート（通報）を管理するテーブル';
COMMENT ON COLUMN reports.id IS 'レポートID（主キー）';
COMMENT ON COLUMN reports.reporter_type IS 'レポーター種別ID（外部キー）';
COMMENT ON COLUMN reports.reporter_id IS 'レポーターID（ポリモーフィック：family_id または member_id）';
COMMENT ON COLUMN reports.reportable_type IS 'レポート対象タイプID（外部キー）';
COMMENT ON COLUMN reports.reportable_id IS 'レポート対象ID（ポリモーフィック）';
COMMENT ON COLUMN reports.status_id IS 'ステータスID（外部キー）';
COMMENT ON COLUMN reports.reported_at IS 'レポート作成日時';
COMMENT ON COLUMN reports.resolved_at IS 'レポート解決日時（未解決の場合はNULL）';
COMMENT ON COLUMN reports.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN reports.updated_at IS 'レコードの更新日時';

-- レポート履歴テーブル
CREATE TABLE IF NOT EXISTS history.reports (
    id serial PRIMARY KEY,
    report_id int NOT NULL REFERENCES reports (id) ON DELETE CASCADE,
    reporter_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    reporter_id int NOT NULL,  -- ユーザID (family_id or member_id)
    reportable_type int NOT NULL REFERENCES reportable_types (id) ON DELETE RESTRICT,
    reportable_id int NOT NULL,
    status_id int NOT NULL REFERENCES report_status (id) ON DELETE RESTRICT,
    reported_at timestamptz NOT NULL DEFAULT now(),
    resolved_at timestamptz DEFAULT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.reports IS 'レポート情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.reports.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.reports.report_id IS '元のレポートID（外部キー）';
COMMENT ON COLUMN history.reports.reporter_type IS 'レポーター種別ID（履歴時点）';
COMMENT ON COLUMN history.reports.reporter_id IS 'レポーターID（履歴時点）';
COMMENT ON COLUMN history.reports.reportable_type IS 'レポート対象タイプID（履歴時点）';
COMMENT ON COLUMN history.reports.reportable_id IS 'レポート対象ID（履歴時点）';
COMMENT ON COLUMN history.reports.status_id IS 'ステータスID（履歴時点）';
COMMENT ON COLUMN history.reports.reported_at IS 'レポート作成日時（履歴時点）';
COMMENT ON COLUMN history.reports.resolved_at IS 'レポート解決日時（履歴時点）';
COMMENT ON COLUMN history.reports.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.reports.updated_at IS '元レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 通知対象タイプ
-- -----------------------------------------------------------------------------
-- 通知対象タイプテーブル
CREATE TABLE IF NOT EXISTS notifiable_types (
    id serial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,  -- family, member, quest, comment
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE notifiable_types IS '通知対象となるオブジェクトのタイプを管理するテーブル';
COMMENT ON COLUMN notifiable_types.id IS '通知対象タイプID（主キー）';
COMMENT ON COLUMN notifiable_types.type IS '通知対象タイプコード（family, member, quest, comment等）';
COMMENT ON COLUMN notifiable_types.description IS '通知対象タイプの説明';
COMMENT ON COLUMN notifiable_types.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN notifiable_types.updated_at IS 'レコードの更新日時';

-- 通知対象タイプ翻訳テーブル
CREATE TABLE IF NOT EXISTS notifiable_types_translations (
    id serial PRIMARY KEY,
    notifiable_type_id int NOT NULL REFERENCES notifiable_types (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (notifiable_type_id, language_id)
);

COMMENT ON TABLE notifiable_types_translations IS '通知対象タイプの多言語対応テーブル';
COMMENT ON COLUMN notifiable_types_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN notifiable_types_translations.notifiable_type_id IS '通知対象タイプID（外部キー）';
COMMENT ON COLUMN notifiable_types_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN notifiable_types_translations.description IS '通知対象タイプ説明の翻訳';
COMMENT ON COLUMN notifiable_types_translations.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN notifiable_types_translations.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- スクリーン
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS screens (
    id serial PRIMARY KEY,
    -- スクリーン名
    name varchar NOT NULL UNIQUE,  -- quest_page, comment_page, etc.
    -- スクリーンの説明
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE screens IS 'アプリケーションの画面/ページを管理するテーブル';
COMMENT ON COLUMN screens.id IS 'スクリーンID（主キー）';
COMMENT ON COLUMN screens.name IS 'スクリーン名（一意制約）';
COMMENT ON COLUMN screens.description IS 'スクリーンの説明';
COMMENT ON COLUMN screens.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN screens.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 引き落とし申請ステータス
-- -----------------------------------------------------------------------------
-- 引き落とし申請ステータス
CREATE TABLE IF NOT EXISTS withdrawal_request_status (
    id serial PRIMARY KEY,
    code varchar(20) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE withdrawal_request_status IS '引き落とし申請のステータスを管理するテーブル';
COMMENT ON COLUMN withdrawal_request_status.id IS 'ステータスID（主キー）';
COMMENT ON COLUMN withdrawal_request_status.code IS 'ステータスコード（例：pending, approved, rejected）';
COMMENT ON COLUMN withdrawal_request_status.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN withdrawal_request_status.updated_at IS 'レコードの更新日時';

-- 引き落とし申請ステータス翻訳テーブル
CREATE TABLE IF NOT EXISTS withdrawal_request_status_translations (
    id serial PRIMARY KEY,
    withdrawal_request_status_id int NOT NULL REFERENCES withdrawal_request_status (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    UNIQUE (withdrawal_request_status_id, language_id)
);

COMMENT ON TABLE withdrawal_request_status_translations IS '引き落とし申請ステータスの多言語対応テーブル';
COMMENT ON COLUMN withdrawal_request_status_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN withdrawal_request_status_translations.withdrawal_request_status_id IS 'ステータスID（外部キー）';
COMMENT ON COLUMN withdrawal_request_status_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN withdrawal_request_status_translations.name IS 'ステータス名の翻訳';

-- -----------------------------------------------------------------------------
-- お小遣い種類
-- -----------------------------------------------------------------------------
-- allowanceable_types
CREATE TABLE IF NOT EXISTS allowanceable_types (
    id serial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,  -- family, member, quest, comment
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE allowanceable_types IS 'お小遣いの種類を管理するテーブル';
COMMENT ON COLUMN allowanceable_types.id IS 'お小遣い種類ID（主キー）';
COMMENT ON COLUMN allowanceable_types.type IS 'お小遣いの種類コード（family, member, quest, comment等）';
COMMENT ON COLUMN allowanceable_types.description IS 'お小遣い種類の説明';
COMMENT ON COLUMN allowanceable_types.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN allowanceable_types.updated_at IS 'レコードの更新日時';

-- =============================================================================
-- 3. 認証システム（auth.users）に依存するテーブル
-- =============================================================================

-- -----------------------------------------------------------------------------
-- ユーザ設定（auth.usersに依存）
-- -----------------------------------------------------------------------------
-- ユーザ設定テーブル
CREATE TABLE IF NOT EXISTS user_settings (
    user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE user_settings IS 'ユーザの基本設定を管理するテーブル';
COMMENT ON COLUMN user_settings.user_id IS 'ユーザID（主キー、外部キー）';
COMMENT ON COLUMN user_settings.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN user_settings.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN user_settings.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 家族テーブル（auth.usersに依存）
-- -----------------------------------------------------------------------------
-- 家族テーブル
CREATE TABLE IF NOT EXISTS families (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users (id) ON DELETE CASCADE,
    icon_id int REFERENCES icons (id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE families IS '家族（親）の基本情報を管理するテーブル';
COMMENT ON COLUMN families.id IS '家族ID（主キー）';
COMMENT ON COLUMN families.user_id IS 'ユーザID（外部キー、一意制約）';
COMMENT ON COLUMN families.icon_id IS 'アイコンID（外部キー、NULL許可）';
COMMENT ON COLUMN families.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN families.updated_at IS 'レコードの更新日時';

-- 家族履歴テーブル
CREATE TABLE IF NOT EXISTS history.families (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    icon_id int REFERENCES icons (id) ON DELETE SET NULL,
    bio text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.families IS '家族情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.families.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.families.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.families.user_id IS 'ユーザID（外部キー）';
COMMENT ON COLUMN history.families.icon_id IS 'アイコンID（履歴時点）';
COMMENT ON COLUMN history.families.bio IS '自己紹介（履歴時点）';
COMMENT ON COLUMN history.families.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.families.updated_at IS '元レコードの更新日時';
COMMENT ON COLUMN history.families.recorded_at IS '履歴記録日時';

-- 家族翻訳テーブル
CREATE TABLE IF NOT EXISTS families_translations (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    bio text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (family_id, language_id)
);

COMMENT ON TABLE families_translations IS '家族情報の多言語対応テーブル';
COMMENT ON COLUMN families_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN families_translations.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN families_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN families_translations.name IS '家族名の翻訳';
COMMENT ON COLUMN families_translations.bio IS '自己紹介の翻訳';
COMMENT ON COLUMN families_translations.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN families_translations.updated_at IS 'レコードの更新日時';

-- 家族翻訳履歴テーブル
CREATE TABLE IF NOT EXISTS history.families_translations (
    id serial PRIMARY KEY,
    family_translation_id int NOT NULL REFERENCES families_translations (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    name varchar(100) NOT NULL,
    bio text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.families_translations IS '家族翻訳情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.families_translations.id IS '翻訳履歴ID（主キー）';
COMMENT ON COLUMN history.families_translations.family_translation_id IS '元の翻訳ID（外部キー）';
COMMENT ON COLUMN history.families_translations.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.families_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN history.families_translations.name IS '家族名の翻訳（履歴時点）';
COMMENT ON COLUMN history.families_translations.bio IS '自己紹介の翻訳（履歴時点）';
COMMENT ON COLUMN history.families_translations.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.families_translations.updated_at IS '元レコードの更新日時';
COMMENT ON COLUMN history.families_translations.recorded_at IS '履歴記録日時';

-- 家族設定テーブル
CREATE TABLE IF NOT EXISTS families_settings (
    family_id int PRIMARY KEY REFERENCES families (id) ON DELETE CASCADE,
    currency_id int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE families_settings IS '家族の設定情報を管理するテーブル';
COMMENT ON COLUMN families_settings.family_id IS '家族ID（主キー、外部キー）';
COMMENT ON COLUMN families_settings.currency_id IS '通貨ID（外部キー）';
COMMENT ON COLUMN families_settings.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN families_settings.updated_at IS 'レコードの更新日時';

-- =============================================================================
-- 4. 家族テーブルに依存するテーブル
-- =============================================================================

-- -----------------------------------------------------------------------------
-- メンバーテーブル（families, icons, educationに依存）
-- -----------------------------------------------------------------------------
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

-- -----------------------------------------------------------------------------
-- メンバー学年（members, educationに依存）
-- -----------------------------------------------------------------------------
-- メンバー学年テーブル
CREATE TABLE IF NOT EXISTS member_grade (
    id serial PRIMARY KEY,
    member_id int NOT NULL UNIQUE REFERENCES members (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES education (id) ON DELETE CASCADE,
    grade int NOT NULL CHECK (grade > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE member_grade IS 'メンバーの現在の学年や職業を管理するテーブル';
COMMENT ON COLUMN member_grade.id IS '学年ID（主キー）';
COMMENT ON COLUMN member_grade.member_id IS 'メンバーID（外部キー、一意制約）';
COMMENT ON COLUMN member_grade.education_id IS '学歴ID（外部キー）';
COMMENT ON COLUMN member_grade.grade IS '学年（正の値のみ）';
COMMENT ON COLUMN member_grade.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN member_grade.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 教育期間（members, educationに依存）
-- -----------------------------------------------------------------------------
-- 教育期間テーブル
CREATE TABLE IF NOT EXISTS education_period (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    education_id int NOT NULL REFERENCES education (id) ON DELETE CASCADE,
    period int NOT NULL CHECK (period > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (member_id, education_id)
);

COMMENT ON TABLE education_period IS 'メンバーの教育期間を管理するテーブル';
COMMENT ON COLUMN education_period.id IS '教育期間ID（主キー）';
COMMENT ON COLUMN education_period.member_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN education_period.education_id IS '学歴ID（外部キー）';
COMMENT ON COLUMN education_period.period IS '教育期間（年数、正の値のみ）';
COMMENT ON COLUMN education_period.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN education_period.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- フォロー関係（familiesに依存）
-- -----------------------------------------------------------------------------
-- フォロー関係テーブル
CREATE TABLE IF NOT EXISTS follows (
    id serial PRIMARY KEY,
    follower_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    followed_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (follower_id, followed_id),
    CHECK (follower_id != followed_id)
);

COMMENT ON TABLE follows IS 'オンライン家族間のフォロー関係を管理するテーブル';
COMMENT ON COLUMN follows.id IS 'フォローID（主キー）';
COMMENT ON COLUMN follows.follower_id IS 'フォロワーの家族ID（外部キー）';
COMMENT ON COLUMN follows.followed_id IS 'フォローされている家族ID（外部キー）';
COMMENT ON COLUMN follows.created_at IS 'フォローが作成された日時';
COMMENT ON COLUMN follows.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 経験値レベル設定（familiesに依存）
-- -----------------------------------------------------------------------------
-- exp_by_level
CREATE TABLE IF NOT EXISTS exp_by_level (
    id serial PRIMARY KEY,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    level int NOT NULL,
    exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (family_id, level)
);

COMMENT ON TABLE exp_by_level IS '親が子供の経験値とレベルの関係を定義するテーブル';
COMMENT ON COLUMN exp_by_level.family_id IS '家族ID';
COMMENT ON COLUMN exp_by_level.level IS 'レベル';
COMMENT ON COLUMN exp_by_level.exp IS 'レベルに必要な経験値';

-- exp_by_level(履歴)
CREATE TABLE IF NOT EXISTS history.exp_by_level (
    id serial PRIMARY KEY,
    exp_by_level_id int NOT NULL REFERENCES exp_by_level (id) ON DELETE CASCADE,
    family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    level int NOT NULL,
    exp int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.exp_by_level IS '経験値レベル設定の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.exp_by_level.id IS '履歴ID（主キー）';
COMMENT ON COLUMN history.exp_by_level.exp_by_level_id IS '元の設定ID（外部キー）';
COMMENT ON COLUMN history.exp_by_level.family_id IS '家族ID（外部キー）';
COMMENT ON COLUMN history.exp_by_level.level IS 'レベル（履歴時点）';
COMMENT ON COLUMN history.exp_by_level.exp IS '経験値（履歴時点）';
COMMENT ON COLUMN history.exp_by_level.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.exp_by_level.updated_at IS '元レコードの更新日時';
COMMENT ON COLUMN history.exp_by_level.recorded_at IS '履歴記録日時';

-- =============================================================================
-- 5. サブタイプテーブル関連
-- =============================================================================

-- -----------------------------------------------------------------------------
-- お小遣いテーブルサブタイプ
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS allowance_table_sub_types (
    id serial PRIMARY KEY,
    type varchar NOT NULL UNIQUE,  -- member_allowance_table, family_allowance_table, shared_allowance_table
    description text NOT NULL
);

-- -----------------------------------------------------------------------------
-- レベルテーブルサブタイプ
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS member_level_sub_types (
    id serial PRIMARY KEY,
    type varchar NOT NULL UNIQUE,  -- member_level_table, family_level_table
    description text NOT NULL
);

-- =============================================================================
-- 6. お小遣いテーブル関連（members, families, allowance_table_sub_typesに依存）
-- =============================================================================

-- -----------------------------------------------------------------------------
-- お小遣いテーブル基底クラス
-- -----------------------------------------------------------------------------
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
COMMENT ON COLUMN allowance_table.subclass_type IS 'サブクラスタイプ（member, family, shared）';
COMMENT ON COLUMN allowance_table.subclass_id IS 'サブクラスID（ポリモーフィック）';
COMMENT ON COLUMN allowance_table.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN allowance_table.updated_at IS 'レコードの更新日時';

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
COMMENT ON COLUMN history.allowance_table.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.allowance_table.updated_at IS '元レコードの更新日時';
COMMENT ON COLUMN history.allowance_table.recorded_at IS '履歴記録日時';

-- メンバーお小遣いテーブル
CREATE TABLE IF NOT EXISTS member_allowance_table (
    id serial PRIMARY KEY,
    superclass_id int NOT NULL UNIQUE REFERENCES allowance_table (id) ON DELETE CASCADE,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE member_allowance_table IS 'メンバー個人のお小遣い設定テーブル';
COMMENT ON COLUMN member_allowance_table.id IS 'メンバーお小遣いID（主キー）';
COMMENT ON COLUMN member_allowance_table.superclass_id IS 'お小遣いテーブルID（外部キー、一意制約）';
COMMENT ON COLUMN member_allowance_table.member_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN member_allowance_table.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN member_allowance_table.updated_at IS 'レコードの更新日時';

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
COMMENT ON COLUMN family_allowance_table.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN family_allowance_table.updated_at IS 'レコードの更新日時';

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
COMMENT ON COLUMN allowance_by_age.allowance_table_id IS 'お小遣いテーブルID（外部キー）';
COMMENT ON COLUMN allowance_by_age.age IS '年齢（負の値不可）';
COMMENT ON COLUMN allowance_by_age.amount IS 'お小遣い金額（負の値不可）';
COMMENT ON COLUMN allowance_by_age.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN allowance_by_age.updated_at IS 'レコードの更新日時';

-- =============================================================================
-- 7. 銀行関連テーブル（members, families, allowanceable_typesなどに依存）
-- =============================================================================

-- -----------------------------------------------------------------------------
-- お小遣い記録
-- -----------------------------------------------------------------------------
-- allowance_records
CREATE TABLE IF NOT EXISTS allowance_records (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    allowanceable_type int NOT NULL REFERENCES allowanceable_types(id) ON DELETE RESTRICT,
    allowanceable_id int NOT NULL,
    title varchar(255) NOT NULL,
    amount int NOT NULL CHECK (amount >= 0),
    recorded_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE allowance_records IS 'お小遣いの記録テーブル';
COMMENT ON COLUMN allowance_records.id IS 'お小遣い記録ID（主キー）';
COMMENT ON COLUMN allowance_records.member_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN allowance_records.allowanceable_type IS 'お小遣いの種類ID（外部キー）';
COMMENT ON COLUMN allowance_records.allowanceable_id IS 'お小遣いの対象ID（ポリモーフィック）';
COMMENT ON COLUMN allowance_records.title IS 'お小遣いのタイトル';
COMMENT ON COLUMN allowance_records.amount IS 'お小遣いの金額（負の値は不可）';
COMMENT ON COLUMN allowance_records.recorded_at IS 'お小遣いが記録された日時';
COMMENT ON COLUMN allowance_records.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN allowance_records.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 貯金記録
-- -----------------------------------------------------------------------------
-- 貯金記録テーブル
CREATE TABLE IF NOT EXISTS savings_records (
    id serial PRIMARY KEY,
    member_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    amount int NOT NULL DEFAULT 0 CHECK (amount != 0),
    balance int NOT NULL DEFAULT 0 CHECK (balance >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE savings_records IS '貯金記録の履歴を管理するテーブル';
COMMENT ON COLUMN savings_records.id IS '貯金記録ID（主キー）';
COMMENT ON COLUMN savings_records.member_id IS 'メンバーID（外部キー）';
COMMENT ON COLUMN savings_records.amount IS '貯金額（正の値は入金、負の値は出金）';
COMMENT ON COLUMN savings_records.balance IS '貯金の残高（負の値は不可）';
COMMENT ON COLUMN savings_records.created_at IS '貯金の履歴レコードが作成された日時';
COMMENT ON COLUMN savings_records.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- 引き落とし申請
-- -----------------------------------------------------------------------------
-- 引き落とし申請テーブル
CREATE TABLE IF NOT EXISTS withdrawal_requests (
    id serial PRIMARY KEY,
    requester_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    approver_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    status_id int NOT NULL REFERENCES withdrawal_request_status (id) ON DELETE RESTRICT,  
    amount int NOT NULL CHECK (amount > 0),
    reason varchar(500) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE withdrawal_requests IS '引き落とし申請を管理するテーブル';
COMMENT ON COLUMN withdrawal_requests.id IS '申請ID（主キー）';
COMMENT ON COLUMN withdrawal_requests.requester_id IS '申請者のメンバーID（外部キー）';
COMMENT ON COLUMN withdrawal_requests.approver_id IS '承認者の家族ID（外部キー）';
COMMENT ON COLUMN withdrawal_requests.status_id IS '申請ステータスID（外部キー）';
COMMENT ON COLUMN withdrawal_requests.amount IS '引き落とし金額（正の値のみ）';
COMMENT ON COLUMN withdrawal_requests.reason IS '引き落とし理由';
COMMENT ON COLUMN withdrawal_requests.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN withdrawal_requests.updated_at IS 'レコードの更新日時';

-- =============================================================================
-- 8. 通知関連テーブル
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 通知テーブル
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
    id serial PRIMARY KEY,
    user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    user_id int NOT NULL,  -- ユーザID (family_id or member_id)
    notifiable_type int NOT NULL REFERENCES notifiable_types (id) ON DELETE RESTRICT,
    notifiable_id int NOT NULL,  -- 通知対象ID
    push_to int REFERENCES screens (id) ON DELETE SET NULL,
    is_read boolean NOT NULL DEFAULT false,
    read_at timestamptz DEFAULT NULL,
    received_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE notifications IS 'ユーザへの通知を管理するテーブル';
COMMENT ON COLUMN notifications.id IS '通知ID（主キー）';
COMMENT ON COLUMN notifications.user_type IS 'ユーザタイプID（外部キー）';
COMMENT ON COLUMN notifications.user_id IS 'ユーザID（ポリモーフィック：family_id または member_id）';
COMMENT ON COLUMN notifications.notifiable_type IS '通知対象タイプID（外部キー）';
COMMENT ON COLUMN notifications.notifiable_id IS '通知対象ID（ポリモーフィック）';
COMMENT ON COLUMN notifications.push_to IS '遷移先スクリーンID（外部キー、NULL許可）';
COMMENT ON COLUMN notifications.is_read IS '既読フラグ';
COMMENT ON COLUMN notifications.read_at IS '既読日時（未読の場合はNULL）';
COMMENT ON COLUMN notifications.received_at IS '通知受信日時';
COMMENT ON COLUMN notifications.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN notifications.updated_at IS 'レコードの更新日時';

-- 通知テーブルのインデックス
CREATE INDEX idx_notifications_user ON notifications (user_type, user_id);
CREATE INDEX idx_notifications_unread ON notifications (user_type, user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_received_at ON notifications (received_at DESC);
CREATE INDEX idx_notifications_notifiable ON notifications (notifiable_type, notifiable_id);

-- =============================================================================
-- 9. コメント関連テーブル
-- =============================================================================

-- -----------------------------------------------------------------------------
-- コメント可能タイプテーブル
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS commentable_types (
    id serial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,  -- quests, comments等
    description text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE commentable_types IS 'コメント可能なオブジェクトのタイプを管理するテーブル';
COMMENT ON COLUMN commentable_types.id IS 'コメント可能タイプID（主キー）';
COMMENT ON COLUMN commentable_types.type IS 'コメント可能タイプコード（quests, comments等）';
COMMENT ON COLUMN commentable_types.description IS 'コメント可能タイプの説明';
COMMENT ON COLUMN commentable_types.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN commentable_types.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- コメントテーブル
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS comments (
    id serial PRIMARY KEY,
    user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    user_id int NOT NULL,  -- ユーザID (family_id or member_id)
    commentable_type int NOT NULL REFERENCES commentable_types (id) ON DELETE RESTRICT,
    commentable_id int NOT NULL,  -- コメント対象ID
    parent_comment_id int REFERENCES comments (id) ON DELETE CASCADE,
    body text NOT NULL CHECK (length(body) > 0),
    commented_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE comments IS 'コメントを管理するテーブル';
COMMENT ON COLUMN comments.id IS 'コメントID（主キー）';
COMMENT ON COLUMN comments.user_type IS 'ユーザタイプID（外部キー）';
COMMENT ON COLUMN comments.user_id IS 'ユーザID（ポリモーフィック：family_id または member_id）';
COMMENT ON COLUMN comments.commentable_type IS 'コメント対象タイプID（外部キー）';
COMMENT ON COLUMN comments.commentable_id IS 'コメント対象ID（ポリモーフィック）';
COMMENT ON COLUMN comments.parent_comment_id IS '親コメントID（返信の場合）';
COMMENT ON COLUMN comments.body IS 'コメント本文（空文字不可）';
COMMENT ON COLUMN comments.commented_at IS 'コメント投稿日時';
COMMENT ON COLUMN comments.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN comments.updated_at IS 'レコードの更新日時';

-- -----------------------------------------------------------------------------
-- コメントいいね
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS comment_likes (
    id serial PRIMARY KEY,
    comment_id int NOT NULL REFERENCES comments (id) ON DELETE CASCADE,
    user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
    user_id int NOT NULL,  -- ユーザID (family_id or member_id)
    liked_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (comment_id, user_type, user_id)
);

COMMENT ON TABLE comment_likes IS 'コメントへのいいねを管理するテーブル';
COMMENT ON COLUMN comment_likes.id IS 'いいねID（主キー）';
COMMENT ON COLUMN comment_likes.comment_id IS 'コメントID（外部キー）';
COMMENT ON COLUMN comment_likes.user_type IS 'ユーザタイプID（外部キー）';
COMMENT ON COLUMN comment_likes.user_id IS 'ユーザID（ポリモーフィック：family_id または member_id）';
COMMENT ON COLUMN comment_likes.liked_at IS 'いいねした日時';
COMMENT ON COLUMN comment_likes.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN comment_likes.updated_at IS 'レコードの更新日時';

-- =============================================================================
-- 注意事項
-- =============================================================================
-- 
-- このファイルには主要なテーブルを含めていますが、以下のテーブルは
-- 個別のファイルを参照してください：
-- 
-- - クエスト関連の詳細テーブル（quest_category, quests, quest_details等）
-- - レベルテーブルの詳細部分
-- - 履歴テーブルの一部
-- - 翻訳テーブルの一部
-- 
-- 完全なテーブル定義については、各個別SQLファイルを確認してください。
-- =============================================================================
