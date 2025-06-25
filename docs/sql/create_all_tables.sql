-- =============================================================================
-- 1. スキーマ作成
-- =============================================================================

-- historyスキーマ作成
    CREATE SCHEMA IF NOT EXISTS history;

-- =============================================================================
-- 2. 基本マスタテーブル（依存関係なし）
-- =============================================================================

-- 言語マスタ
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
        COMMENT ON COLUMN languages.created_at IS '作成日時';
        COMMENT ON COLUMN languages.updated_at IS '更新日時';

-- 通貨マスタ
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
        COMMENT ON COLUMN currencies.created_at IS '作成日時';
        COMMENT ON COLUMN currencies.updated_at IS '更新日時';

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
        COMMENT ON COLUMN exchange_rates.created_at IS '作成日時';
        COMMENT ON COLUMN exchange_rates.updated_at IS '更新日時';

-- アイコン関連
    -- アイコンカテゴリテーブル
        CREATE TABLE IF NOT EXISTS icon_categories (
            id serial PRIMARY KEY,
            code varchar(50) NOT NULL UNIQUE,
            sort_order int DEFAULT 0,
            is_active boolean NOT NULL DEFAULT true,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE icon_categories IS 'アイコンのカテゴリを管理するテーブル';
        COMMENT ON COLUMN icon_categories.id IS 'アイコンカテゴリID（主キー）';
        COMMENT ON COLUMN icon_categories.code IS 'カテゴリコード（一意制約）';
        COMMENT ON COLUMN icon_categories.sort_order IS '表示順序';
        COMMENT ON COLUMN icon_categories.is_active IS '有効フラグ';
        COMMENT ON COLUMN icon_categories.created_at IS '作成日時';
        COMMENT ON COLUMN icon_categories.updated_at IS '更新日時';

    -- アイコンカテゴリ翻訳テーブル
        CREATE TABLE IF NOT EXISTS icon_categories_translation (
            id serial PRIMARY KEY,
            category_id int NOT NULL REFERENCES icon_categories(id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages(id) ON DELETE RESTRICT,
            name varchar(100) NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (category_id, language_code)
        );

        COMMENT ON TABLE icon_categories_translation IS 'アイコンカテゴリの多言語対応テーブル';
        COMMENT ON COLUMN icon_categories_translation.id IS '翻訳ID（主キー）';
        COMMENT ON COLUMN icon_categories_translation.category_id IS 'アイコンカテゴリID（外部キー）';
        COMMENT ON COLUMN icon_categories_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN icon_categories_translation.name IS 'カテゴリ名の翻訳';
        COMMENT ON COLUMN icon_categories_translation.created_at IS '作成日時';
        COMMENT ON COLUMN icon_categories_translation.updated_at IS '更新日時';

    -- アイコンテーブル
        CREATE TABLE IF NOT EXISTS icons (
            id serial PRIMARY KEY,
            code varchar(100) NOT NULL UNIQUE,  -- アイコンコード
            category_id int REFERENCES icon_categories(id) ON DELETE SET NULL,
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
        COMMENT ON COLUMN icons.created_at IS '作成日時';
        COMMENT ON COLUMN icons.updated_at IS '更新日時';

-- 国家マスタ
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
        COMMENT ON COLUMN countries.created_at IS '作成日時';
        COMMENT ON COLUMN countries.updated_at IS '更新日時';

-- 学歴マスタ
    -- 学歴マスタテーブル
        CREATE TABLE IF NOT EXISTS educations (
            id serial PRIMARY KEY,
            code varchar(20) NOT NULL UNIQUE,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE educations IS '学歴の種類を管理するマスタテーブル';
        COMMENT ON COLUMN educations.id IS '学歴ID（主キー）';
        COMMENT ON COLUMN educations.code IS '学歴コード（例：elementary, junior_high, high_school等）';
        COMMENT ON COLUMN educations.created_at IS '作成日時';
        COMMENT ON COLUMN educations.updated_at IS '更新日時';

    -- 学歴翻訳テーブル
        CREATE TABLE IF NOT EXISTS educations_translation (
            id serial PRIMARY KEY,
            education_id int NOT NULL REFERENCES educations (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            name varchar(100) NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (education_id, language_code)
        );

        COMMENT ON TABLE educations_translation IS '学歴の多言語対応テーブル';
        COMMENT ON COLUMN educations_translation.id IS '翻訳ID（主キー）';
        COMMENT ON COLUMN educations_translation.education_id IS '学歴ID（外部キー）';
        COMMENT ON COLUMN educations_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN educations_translation.name IS '学歴名の翻訳';
        COMMENT ON COLUMN educations_translation.created_at IS '作成日時';
        COMMENT ON COLUMN educations_translation.updated_at IS '更新日時';

-- ユーザタイプ
    -- ユーザタイプテーブル
        CREATE TABLE IF NOT EXISTS user_types (
            id serial PRIMARY KEY,
            type varchar(20) NOT NULL UNIQUE,  -- family, child
            description text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE user_types IS 'ユーザのタイプを分類するテーブル';
        COMMENT ON COLUMN user_types.id IS 'ユーザタイプID（主キー）';
        COMMENT ON COLUMN user_types.type IS 'ユーザタイプコード（family, child等）';
        COMMENT ON COLUMN user_types.description IS 'ユーザタイプの説明';
        COMMENT ON COLUMN user_types.created_at IS '作成日時';
        COMMENT ON COLUMN user_types.updated_at IS '更新日時';

-- レポート対象タイプ
    -- レポート対象タイプテーブル
        CREATE TABLE IF NOT EXISTS reportable_types (
            id serial PRIMARY KEY,
            type varchar(50) NOT NULL UNIQUE,  -- family, child, quest, comment
            description text NOT NULL CHECK (length(description) > 0),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE reportable_types IS 'レポート対象となるオブジェクトのタイプを管理するマスタテーブル';
        COMMENT ON COLUMN reportable_types.id IS 'レポート対象タイプID（主キー）';
        COMMENT ON COLUMN reportable_types.type IS 'レポート対象タイプコード（family, child, quest, comment等）';
        COMMENT ON COLUMN reportable_types.description IS 'レポート対象タイプの説明（空文字不可）';
        COMMENT ON COLUMN reportable_types.created_at IS '作成日時';
        COMMENT ON COLUMN reportable_types.updated_at IS '更新日時';

-- レポートステータス
    -- レポートステータステーブル
        CREATE TABLE IF NOT EXISTS report_statuses (
            id serial PRIMARY KEY,
            code varchar(20) NOT NULL UNIQUE,
            status varchar(50) NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

    -- report_statuses テーブルにビジネスロジック制約を追加
        ALTER TABLE report_statuses
        ADD CONSTRAINT chk_report_status_code_format 
        CHECK (code ~ '^[a-z_][a-z0-9_]*$'),
        ADD CONSTRAINT chk_report_status_name_length 
        CHECK (length(status) >= 2 AND length(status) <= 50);

        COMMENT ON TABLE report_statuses IS 'レポートの処理状態を管理するマスタテーブル';
        COMMENT ON COLUMN report_statuses.id IS 'ステータスID（主キー）';
        COMMENT ON COLUMN report_statuses.code IS 'ステータスコード（例：pending, reviewed, resolved, dismissed）';
        COMMENT ON COLUMN report_statuses.status IS 'ステータス名';
        COMMENT ON COLUMN report_statuses.created_at IS '作成日時';
        COMMENT ON COLUMN report_statuses.updated_at IS '更新日時';

    -- レポートテーブル
        CREATE TABLE IF NOT EXISTS reports (
            id serial PRIMARY KEY,
            reporter_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
            reporter_id int NOT NULL,  -- ユーザID (family_id or child_id)
            reportable_type int NOT NULL REFERENCES reportable_types (id) ON DELETE RESTRICT,
            reportable_id int NOT NULL,
            status_id int NOT NULL REFERENCES report_statuses (id) ON DELETE RESTRICT,
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
        CREATE INDEX IF NOT EXISTS idx_reports_statuses ON reports (status_id);
        CREATE INDEX IF NOT EXISTS idx_reports_reported_at ON reports (reported_at);
        CREATE INDEX IF NOT EXISTS idx_reports_resolved_at ON reports (resolved_at) WHERE resolved_at IS NOT NULL;

        COMMENT ON TABLE reports IS 'ユーザからのレポート（通報）を管理するテーブル';
        COMMENT ON COLUMN reports.id IS 'レポートID（主キー）';
        COMMENT ON COLUMN reports.reporter_type IS 'レポーター種別ID（外部キー）';
        COMMENT ON COLUMN reports.reporter_id IS 'レポーターID（ポリモーフィック：family_id または child_id）';
        COMMENT ON COLUMN reports.reportable_type IS 'レポート対象タイプID（外部キー）';
        COMMENT ON COLUMN reports.reportable_id IS 'レポート対象ID（ポリモーフィック）';
        COMMENT ON COLUMN reports.status_id IS 'ステータスID（外部キー）';
        COMMENT ON COLUMN reports.reported_at IS 'レポート作成日時';
        COMMENT ON COLUMN reports.resolved_at IS 'レポート解決日時（未解決の場合はNULL）';
        COMMENT ON COLUMN reports.created_at IS '作成日時';
        COMMENT ON COLUMN reports.updated_at IS '更新日時';

    -- レポート履歴テーブル
        CREATE TABLE IF NOT EXISTS history.reports (
            id serial PRIMARY KEY,
            report_id int NOT NULL REFERENCES reports (id) ON DELETE CASCADE,
            reporter_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
            reporter_id int NOT NULL,  -- ユーザID (family_id or child_id)
            reportable_type int NOT NULL REFERENCES reportable_types (id) ON DELETE RESTRICT,
            reportable_id int NOT NULL,
            status_id int NOT NULL REFERENCES report_statuses (id) ON DELETE RESTRICT,
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
        COMMENT ON COLUMN history.reports.created_at IS '元作成日時';
        COMMENT ON COLUMN history.reports.updated_at IS '元更新日時';

-- 通知対象タイプ
    -- 通知対象タイプテーブル
        CREATE TABLE IF NOT EXISTS notifiable_types (
            id serial PRIMARY KEY,
            type varchar(50) NOT NULL UNIQUE,  -- family, child, quest, comment
            description text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE notifiable_types IS '通知対象となるオブジェクトのタイプを管理するテーブル';
        COMMENT ON COLUMN notifiable_types.id IS '通知対象タイプID（主キー）';
        COMMENT ON COLUMN notifiable_types.type IS '通知対象タイプコード（family, child, quest, comment等）';
        COMMENT ON COLUMN notifiable_types.description IS '通知対象タイプの説明';
        COMMENT ON COLUMN notifiable_types.created_at IS '作成日時';
        COMMENT ON COLUMN notifiable_types.updated_at IS '更新日時';

    -- 通知対象タイプ翻訳テーブル
        CREATE TABLE IF NOT EXISTS notifiable_types_translation (
            id serial PRIMARY KEY,
            notifiable_type_id int NOT NULL REFERENCES notifiable_types (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            description text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (notifiable_type_id, language_code)
        );

        COMMENT ON TABLE notifiable_types_translation IS '通知対象タイプの多言語対応テーブル';
        COMMENT ON COLUMN notifiable_types_translation.id IS '翻訳ID（主キー）';
        COMMENT ON COLUMN notifiable_types_translation.notifiable_type_id IS '通知対象タイプID（外部キー）';
        COMMENT ON COLUMN notifiable_types_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN notifiable_types_translation.description IS '通知対象タイプ説明の翻訳';
        COMMENT ON COLUMN notifiable_types_translation.created_at IS '作成日時';
        COMMENT ON COLUMN notifiable_types_translation.updated_at IS '更新日時';

    -- スクリーン
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
        COMMENT ON COLUMN screens.created_at IS '作成日時';
        COMMENT ON COLUMN screens.updated_at IS '更新日時';

-- 引き落とし申請ステータス
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
        COMMENT ON COLUMN withdrawal_request_status.created_at IS '作成日時';
        COMMENT ON COLUMN withdrawal_request_status.updated_at IS '更新日時';

    -- 引き落とし申請ステータス翻訳テーブル
        CREATE TABLE IF NOT EXISTS withdrawal_request_statuses_translation (
            id serial PRIMARY KEY,
            withdrawal_request_status_id int NOT NULL REFERENCES withdrawal_request_status (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            name varchar(100) NOT NULL,
            UNIQUE (withdrawal_request_status_id, language_code)
        );

        COMMENT ON TABLE withdrawal_request_statuses_translation IS '引き落とし申請ステータスの多言語対応テーブル';
        COMMENT ON COLUMN withdrawal_request_statuses_translation.id IS '翻訳ID（主キー）';
        COMMENT ON COLUMN withdrawal_request_statuses_translation.withdrawal_request_status_id IS 'ステータスID（外部キー）';
        COMMENT ON COLUMN withdrawal_request_statuses_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN withdrawal_request_statuses_translation.name IS 'ステータス名の翻訳';

-- お小遣い種類
    -- allowanceable_types
        CREATE TABLE IF NOT EXISTS allowanceable_types (
            id serial PRIMARY KEY,
            type varchar(50) NOT NULL UNIQUE,  -- family, child, quest, comment
            description text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE allowanceable_types IS 'お小遣いの種類を管理するテーブル';
        COMMENT ON COLUMN allowanceable_types.id IS 'お小遣い種類ID（主キー）';
        COMMENT ON COLUMN allowanceable_types.type IS 'お小遣いの種類コード（family, child, quest, comment等）';
        COMMENT ON COLUMN allowanceable_types.description IS 'お小遣い種類の説明';
        COMMENT ON COLUMN allowanceable_types.created_at IS '作成日時';
        COMMENT ON COLUMN allowanceable_types.updated_at IS '更新日時';

-- =============================================================================
-- 3. 認証システム（auth.users）に依存するテーブル
-- =============================================================================

-- ユーザ設定（auth.usersに依存）
    -- ユーザ設定テーブル
        CREATE TABLE IF NOT EXISTS user_settings (
            user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE user_settings IS 'ユーザの基本設定を管理するテーブル';
        COMMENT ON COLUMN user_settings.user_id IS 'ユーザID（主キー、外部キー）';
        COMMENT ON COLUMN user_settings.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN user_settings.created_at IS '作成日時';
        COMMENT ON COLUMN user_settings.updated_at IS '更新日時';

-- 家族テーブル（auth.usersに依存）
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
        COMMENT ON COLUMN families.created_at IS '作成日時';
        COMMENT ON COLUMN families.updated_at IS '更新日時';

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
        COMMENT ON COLUMN history.families.created_at IS '元作成日時';
        COMMENT ON COLUMN history.families.updated_at IS '元更新日時';
        COMMENT ON COLUMN history.families.recorded_at IS '履歴記録日時';

    -- 家族翻訳テーブル
        CREATE TABLE IF NOT EXISTS families_translation (
            id serial PRIMARY KEY,
            family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            name varchar(100) NOT NULL,
            bio text,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (family_id, language_code)
        );

        COMMENT ON TABLE families_translation IS '家族情報の多言語対応テーブル';
        COMMENT ON COLUMN families_translation.id IS '翻訳ID（主キー）';
        COMMENT ON COLUMN families_translation.family_id IS '家族ID（外部キー）';
        COMMENT ON COLUMN families_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN families_translation.name IS '家族名の翻訳';
        COMMENT ON COLUMN families_translation.bio IS '自己紹介の翻訳';
        COMMENT ON COLUMN families_translation.created_at IS '作成日時';
        COMMENT ON COLUMN families_translation.updated_at IS '更新日時';

    -- 家族翻訳履歴テーブル
        CREATE TABLE IF NOT EXISTS history.families_translation (
            id serial PRIMARY KEY,
            family_translation_id int NOT NULL REFERENCES families_translation (id) ON DELETE CASCADE,
            family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            name varchar(100) NOT NULL,
            bio text,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            recorded_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE history.families_translation IS '家族翻訳情報の変更履歴を管理するテーブル';
        COMMENT ON COLUMN history.families_translation.id IS '翻訳履歴ID（主キー）';
        COMMENT ON COLUMN history.families_translation.family_translation_id IS '元の翻訳ID（外部キー）';
        COMMENT ON COLUMN history.families_translation.family_id IS '家族ID（外部キー）';
        COMMENT ON COLUMN history.families_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN history.families_translation.name IS '家族名の翻訳（履歴時点）';
        COMMENT ON COLUMN history.families_translation.bio IS '自己紹介の翻訳（履歴時点）';
        COMMENT ON COLUMN history.families_translation.created_at IS '元作成日時';
        COMMENT ON COLUMN history.families_translation.updated_at IS '元更新日時';
        COMMENT ON COLUMN history.families_translation.recorded_at IS '履歴記録日時';

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
        COMMENT ON COLUMN families_settings.created_at IS '作成日時';
        COMMENT ON COLUMN families_settings.updated_at IS '更新日時';

-- =============================================================================
-- 4. 家族テーブルに依存するテーブル
-- =============================================================================

-- メンバーテーブル（families, icons, educationに依存）
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

-- メンバー学年（children, educationに依存）
    -- メンバー学年テーブル
        CREATE TABLE IF NOT EXISTS child_grade (
            id serial PRIMARY KEY,
            child_id int NOT NULL UNIQUE REFERENCES children (id) ON DELETE CASCADE,
            education_id int NOT NULL REFERENCES educations (id) ON DELETE CASCADE,
            grade int NOT NULL CHECK (grade > 0),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE child_grade IS 'メンバーの現在の学年や職業を管理するテーブル';
        COMMENT ON COLUMN child_grade.id IS '学年ID（主キー）';
        COMMENT ON COLUMN child_grade.child_id IS 'メンバーID（外部キー、一意制約）';
        COMMENT ON COLUMN child_grade.education_id IS '学歴ID（外部キー）';
        COMMENT ON COLUMN child_grade.grade IS '学年（正の値のみ）';
        COMMENT ON COLUMN child_grade.created_at IS '作成日時';
        COMMENT ON COLUMN child_grade.updated_at IS '更新日時';

-- 教育期間（children, educationに依存）
    -- 教育期間テーブル
        CREATE TABLE IF NOT EXISTS education_period (
            id serial PRIMARY KEY,
            child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
            education_id int NOT NULL REFERENCES educations (id) ON DELETE CASCADE,
            period int NOT NULL CHECK (period > 0),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (child_id, education_id)
        );

        COMMENT ON TABLE education_period IS 'メンバーの教育期間を管理するテーブル';
        COMMENT ON COLUMN education_period.id IS '教育期間ID（主キー）';
        COMMENT ON COLUMN education_period.child_id IS 'メンバーID（外部キー）';
        COMMENT ON COLUMN education_period.education_id IS '学歴ID（外部キー）';
        COMMENT ON COLUMN education_period.period IS '教育期間（年数、正の値のみ）';
        COMMENT ON COLUMN education_period.created_at IS '作成日時';
        COMMENT ON COLUMN education_period.updated_at IS '更新日時';

-- フォロー関係（familiesに依存）
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
        COMMENT ON COLUMN follows.updated_at IS '更新日時';

-- 経験値レベル設定（familiesに依存）
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
        COMMENT ON COLUMN history.exp_by_level.created_at IS '元作成日時';
        COMMENT ON COLUMN history.exp_by_level.updated_at IS '元更新日時';
        COMMENT ON COLUMN history.exp_by_level.recorded_at IS '履歴記録日時';

-- =============================================================================
-- 5. サブタイプテーブル関連
-- =============================================================================

    -- お小遣いテーブルサブタイプ
        CREATE TABLE IF NOT EXISTS allowance_table_sub_types (
            id serial PRIMARY KEY,
            type varchar NOT NULL UNIQUE,  -- child_allowance_table, family_allowance_table, shared_allowance_table
            description text NOT NULL
        );

    -- レベルテーブルサブタイプ
        CREATE TABLE IF NOT EXISTS child_level_sub_types (
            id serial PRIMARY KEY,
            type varchar NOT NULL UNIQUE,  -- child_level_table, family_level_table
            description text NOT NULL
        );

-- =============================================================================
-- 6. お小遣いテーブル関連（children, families, allowance_table_sub_typesに依存）
-- =============================================================================

    -- お小遣いテーブル基底クラス
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
        COMMENT ON COLUMN allowance_by_age.created_at IS '作成日時';
        COMMENT ON COLUMN allowance_by_age.updated_at IS '更新日時';

-- =============================================================================
-- 7. 銀行関連テーブル（children, families, allowanceable_typesなどに依存）
-- =============================================================================

-- お小遣い記録
    -- allowance_records
        CREATE TABLE IF NOT EXISTS allowance_records (
            id serial PRIMARY KEY,
            child_id int NOT NULL REFERENCES children(id) ON DELETE CASCADE,
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
        COMMENT ON COLUMN allowance_records.child_id IS 'メンバーID（外部キー）';
        COMMENT ON COLUMN allowance_records.allowanceable_type IS 'お小遣いの種類ID（外部キー）';
        COMMENT ON COLUMN allowance_records.allowanceable_id IS 'お小遣いの対象ID（ポリモーフィック）';
        COMMENT ON COLUMN allowance_records.title IS 'お小遣いのタイトル';
        COMMENT ON COLUMN allowance_records.amount IS 'お小遣いの金額（負の値は不可）';
        COMMENT ON COLUMN allowance_records.recorded_at IS 'お小遣いが記録された日時';
        COMMENT ON COLUMN allowance_records.created_at IS '作成日時';
        COMMENT ON COLUMN allowance_records.updated_at IS '更新日時';

-- 貯金記録
    -- 貯金記録テーブル
        CREATE TABLE IF NOT EXISTS savings_records (
            id serial PRIMARY KEY,
            child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
            amount int NOT NULL DEFAULT 0 CHECK (amount != 0),
            balance int NOT NULL DEFAULT 0 CHECK (balance >= 0),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            recorded_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE savings_records IS '貯金記録の履歴を管理するテーブル';
        COMMENT ON COLUMN savings_records.id IS '貯金記録ID（主キー）';
        COMMENT ON COLUMN savings_records.child_id IS 'メンバーID（外部キー）';
        COMMENT ON COLUMN savings_records.amount IS '貯金額（正の値は入金、負の値は出金）';
        COMMENT ON COLUMN savings_records.balance IS '貯金の残高（負の値は不可）';
        COMMENT ON COLUMN savings_records.created_at IS '貯金の履歴レコードが作成された日時';
        COMMENT ON COLUMN savings_records.updated_at IS '更新日時';

-- 引き落とし申請
    -- 引き落とし申請テーブル
        CREATE TABLE IF NOT EXISTS withdrawal_requests (
            id serial PRIMARY KEY,
            requester_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
            approver_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            status_id int NOT NULL REFERENCES withdrawal_request_status (id) ON DELETE RESTRICT,  
            amount int NOT NULL CHECK (amount > 0),
            reason varchar(500) NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            requested_at timestamptz NOT NULL,
            approved_at timestamptz
        );

        COMMENT ON TABLE withdrawal_requests IS '引き落とし申請を管理するテーブル';
        COMMENT ON COLUMN withdrawal_requests.id IS '申請ID（主キー）';
        COMMENT ON COLUMN withdrawal_requests.requester_id IS '申請者のメンバーID（外部キー）';
        COMMENT ON COLUMN withdrawal_requests.approver_id IS '承認者の家族ID（外部キー）';
        COMMENT ON COLUMN withdrawal_requests.status_id IS '申請ステータスID（外部キー）';
        COMMENT ON COLUMN withdrawal_requests.amount IS '引き落とし金額（正の値のみ）';
        COMMENT ON COLUMN withdrawal_requests.reason IS '引き落とし理由';
        COMMENT ON COLUMN withdrawal_requests.created_at IS '作成日時';
        COMMENT ON COLUMN withdrawal_requests.updated_at IS '更新日時';

-- =============================================================================
-- 8. 通知関連テーブル
-- =============================================================================

-- 通知テーブル
    CREATE TABLE IF NOT EXISTS notifications (
        id serial PRIMARY KEY,
        user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
        user_id int NOT NULL,  -- ユーザID (family_id or child_id)
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
    COMMENT ON COLUMN notifications.user_id IS 'ユーザID（ポリモーフィック：family_id または child_id）';
    COMMENT ON COLUMN notifications.notifiable_type IS '通知対象タイプID（外部キー）';
    COMMENT ON COLUMN notifications.notifiable_id IS '通知対象ID（ポリモーフィック）';
    COMMENT ON COLUMN notifications.push_to IS '遷移先スクリーンID（外部キー、NULL許可）';
    COMMENT ON COLUMN notifications.is_read IS '既読フラグ';
    COMMENT ON COLUMN notifications.read_at IS '既読日時（未読の場合はNULL）';
    COMMENT ON COLUMN notifications.received_at IS '通知受信日時';
    COMMENT ON COLUMN notifications.created_at IS '作成日時';
    COMMENT ON COLUMN notifications.updated_at IS '更新日時';

-- 通知テーブルのインデックス
    CREATE INDEX idx_notifications_user ON notifications (user_type, user_id);
    CREATE INDEX idx_notifications_unread ON notifications (user_type, user_id, is_read) WHERE is_read = false;
    CREATE INDEX idx_notifications_received_at ON notifications (received_at DESC);
    CREATE INDEX idx_notifications_notifiable ON notifications (notifiable_type, notifiable_id);

-- =============================================================================
-- 9. コメント関連テーブル
-- =============================================================================

-- コメント可能タイプテーブル
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
    COMMENT ON COLUMN commentable_types.created_at IS '作成日時';
    COMMENT ON COLUMN commentable_types.updated_at IS '更新日時';

-- コメントテーブル
    CREATE TABLE IF NOT EXISTS comments (
        id serial PRIMARY KEY,
        user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
        user_id int NOT NULL,  -- ユーザID (family_id or child_id)
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
    COMMENT ON COLUMN comments.user_id IS 'ユーザID（ポリモーフィック：family_id または child_id）';
    COMMENT ON COLUMN comments.commentable_type IS 'コメント対象タイプID（外部キー）';
    COMMENT ON COLUMN comments.commentable_id IS 'コメント対象ID（ポリモーフィック）';
    COMMENT ON COLUMN comments.parent_comment_id IS '親コメントID（返信の場合）';
    COMMENT ON COLUMN comments.body IS 'コメント本文（空文字不可）';
    COMMENT ON COLUMN comments.commented_at IS 'コメント投稿日時';
    COMMENT ON COLUMN comments.created_at IS '作成日時';
    COMMENT ON COLUMN comments.updated_at IS '更新日時';

-- コメントいいね
    CREATE TABLE IF NOT EXISTS comment_likes (
        id serial PRIMARY KEY,
        comment_id int NOT NULL REFERENCES comments (id) ON DELETE CASCADE,
        user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
        user_id int NOT NULL,  -- ユーザID (family_id or child_id)
        liked_at timestamptz NOT NULL DEFAULT now(),
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (comment_id, user_type, user_id)
    );

    COMMENT ON TABLE comment_likes IS 'コメントへのいいねを管理するテーブル';
    COMMENT ON COLUMN comment_likes.id IS 'いいねID（主キー）';
    COMMENT ON COLUMN comment_likes.comment_id IS 'コメントID（外部キー）';
    COMMENT ON COLUMN comment_likes.user_type IS 'ユーザタイプID（外部キー）';
    COMMENT ON COLUMN comment_likes.user_id IS 'ユーザID（ポリモーフィック：family_id または child_id）';
    COMMENT ON COLUMN comment_likes.liked_at IS 'いいねした日時';
    COMMENT ON COLUMN comment_likes.created_at IS '作成日時';
    COMMENT ON COLUMN comment_likes.updated_at IS '更新日時';

-- コメント履歴テーブル
    CREATE TABLE IF NOT EXISTS history.comments (
        id serial PRIMARY KEY,
        comment_id int NOT NULL REFERENCES comments (id) ON DELETE CASCADE,
        user_type int NOT NULL REFERENCES user_types (id) ON DELETE RESTRICT,
        user_id int NOT NULL,  -- ユーザID (family_id or child_id)
        commentable_type int NOT NULL REFERENCES commentable_types (id) ON DELETE RESTRICT,
        commentable_id int NOT NULL,
        parent_comment_id int REFERENCES comments (id) ON DELETE CASCADE,
        body text NOT NULL,
        commented_at timestamptz NOT NULL DEFAULT now(),
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        recorded_at timestamptz NOT NULL DEFAULT now()
    );

    COMMENT ON TABLE history.comments IS 'コメントの変更履歴を管理するテーブル';
    COMMENT ON COLUMN history.comments.id IS '履歴ID（主キー）';
    COMMENT ON COLUMN history.comments.comment_id IS '元のコメントID（外部キー）';
    COMMENT ON COLUMN history.comments.user_type IS 'ユーザタイプID（外部キー）';
    COMMENT ON COLUMN history.comments.user_id IS 'ユーザID（ポリモーフィック）';
    COMMENT ON COLUMN history.comments.commentable_type IS 'コメント対象タイプID（外部キー）';
    COMMENT ON COLUMN history.comments.commentable_id IS 'コメント対象ID（ポリモーフィック）';
    COMMENT ON COLUMN history.comments.parent_comment_id IS '親コメントID';
    COMMENT ON COLUMN history.comments.body IS 'コメント本文（履歴時点）';
    COMMENT ON COLUMN history.comments.commented_at IS 'コメント投稿日時';
    COMMENT ON COLUMN history.comments.created_at IS '元作成日時';
    COMMENT ON COLUMN history.comments.updated_at IS '元更新日時';
    COMMENT ON COLUMN history.comments.recorded_at IS '履歴記録日時';

-- コメント翻訳テーブル
    CREATE TABLE IF NOT EXISTS comments_translation (
        id serial PRIMARY KEY,
        comment_id int NOT NULL REFERENCES comments (id) ON DELETE CASCADE,
        language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
        body text NOT NULL CHECK (length(body) > 0),
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE (comment_id, language_code)
    );

    COMMENT ON TABLE comments_translation IS 'コメントの多言語対応テーブル';
    COMMENT ON COLUMN comments_translation.id IS '翻訳ID（主キー）';
    COMMENT ON COLUMN comments_translation.comment_id IS 'コメントID（外部キー）';
    COMMENT ON COLUMN comments_translation.language_code IS '言語ID（外部キー）';
    COMMENT ON COLUMN comments_translation.body IS 'コメント本文の翻訳（空文字不可）';
    COMMENT ON COLUMN comments_translation.created_at IS '作成日時';
    COMMENT ON COLUMN comments_translation.updated_at IS '更新日時';

-- コメント翻訳履歴テーブル
    CREATE TABLE IF NOT EXISTS history.comments_translation (
        id serial PRIMARY KEY,
        comment_translation_id int NOT NULL REFERENCES comments_translation (id) ON DELETE CASCADE,
        comment_id int NOT NULL,
        language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
        body text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        recorded_at timestamptz NOT NULL DEFAULT now()
    );

    COMMENT ON TABLE history.comments_translation IS 'コメント翻訳の変更履歴を管理するテーブル';
    COMMENT ON COLUMN history.comments_translation.id IS '翻訳履歴ID（主キー）';
    COMMENT ON COLUMN history.comments_translation.comment_translation_id IS '元の翻訳ID（外部キー）';
    COMMENT ON COLUMN history.comments_translation.comment_id IS 'コメントID';
    COMMENT ON COLUMN history.comments_translation.language_code IS '言語ID（外部キー）';
    COMMENT ON COLUMN history.comments_translation.body IS 'コメント本文の翻訳（履歴時点）';
    COMMENT ON COLUMN history.comments_translation.created_at IS '元作成日時';
    COMMENT ON COLUMN history.comments_translation.updated_at IS '元更新日時';
    COMMENT ON COLUMN history.comments_translation.recorded_at IS '履歴記録日時';


-- =============================================================================
-- 10. クエスト関連テーブル
-- =============================================================================

    -- クエストカテゴリサブクラスタイプ
        CREATE TABLE IF NOT EXISTS quest_category_subclass_types (
            id serial PRIMARY KEY,
            type varchar NOT NULL UNIQUE,  -- template_quest_categories, custom_quest_categories
            description text NOT NULL
        );

        COMMENT ON TABLE quest_category_subclass_types IS 'クエストカテゴリのサブクラスタイプを管理するテーブル';
        COMMENT ON COLUMN quest_category_subclass_types.id IS 'サブクラスタイプID（主キー）';
        COMMENT ON COLUMN quest_category_subclass_types.type IS 'タイプコード（template_quest_categories, custom_quest_categories）';
        COMMENT ON COLUMN quest_category_subclass_types.description IS 'タイプの説明';

    -- クエストカテゴリ（基底クラス）
        CREATE TABLE IF NOT EXISTS quest_categories (
            id serial PRIMARY KEY,
            subclass_type int NOT NULL REFERENCES quest_category_subclass_types (id) ON DELETE RESTRICT,
            subclass_id int NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (subclass_type, subclass_id)
        );

        COMMENT ON TABLE quest_categories IS 'クエストカテゴリの基底テーブル（ポリモーフィック関連）';
        COMMENT ON COLUMN quest_categories.id IS 'クエストカテゴリID（主キー）';
        COMMENT ON COLUMN quest_categories.subclass_type IS 'サブクラスタイプ（template, custom, family）';
        COMMENT ON COLUMN quest_categories.subclass_id IS 'サブクラスID（ポリモーフィック）';
        COMMENT ON COLUMN quest_categories.created_at IS '作成日時';
        COMMENT ON COLUMN quest_categories.updated_at IS '更新日時';

    -- クエストカテゴリ翻訳テーブル
        CREATE TABLE IF NOT EXISTS quest_categories_translation (
            id serial PRIMARY KEY,
            quest_category_id int NOT NULL REFERENCES quest_categories (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            name varchar(100) NOT NULL CHECK (length(name) > 0),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (quest_category_id, language_code)
        );

        COMMENT ON TABLE quest_categories_translation IS 'クエストカテゴリの多言語対応テーブル';
        COMMENT ON COLUMN quest_categories_translation.id IS '翻訳ID（主キー）';
        COMMENT ON COLUMN quest_categories_translation.quest_category_id IS 'クエストカテゴリID（外部キー）';
        COMMENT ON COLUMN quest_categories_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN quest_categories_translation.name IS 'カテゴリ名の翻訳（空文字不可）';
        COMMENT ON COLUMN quest_categories_translation.created_at IS '作成日時';
        COMMENT ON COLUMN quest_categories_translation.updated_at IS '更新日時';

    -- テンプレートクエストカテゴリテーブル
        CREATE TABLE IF NOT EXISTS template_quest_categories (
            id serial PRIMARY KEY,
            category_id int NOT NULL UNIQUE REFERENCES quest_categories (id) ON DELETE CASCADE,
            code varchar(50) NOT NULL UNIQUE,
            sort_order int DEFAULT 0,
            is_active boolean NOT NULL DEFAULT true,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE template_quest_categories IS 'アプリ提供のテンプレートクエストカテゴリテーブル';
        COMMENT ON COLUMN template_quest_categories.id IS 'テンプレートカテゴリID（主キー）';
        COMMENT ON COLUMN template_quest_categories.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
        COMMENT ON COLUMN template_quest_categories.code IS 'カテゴリコード（一意制約）';
        COMMENT ON COLUMN template_quest_categories.sort_order IS '表示順序';
        COMMENT ON COLUMN template_quest_categories.is_active IS '有効フラグ';
        COMMENT ON COLUMN template_quest_categories.created_at IS '作成日時';
        COMMENT ON COLUMN template_quest_categories.updated_at IS '更新日時';

    -- カスタムクエストカテゴリテーブル
        CREATE TABLE IF NOT EXISTS custom_quest_categories (
            id serial PRIMARY KEY,
            category_id int NOT NULL UNIQUE REFERENCES quest_categories (id) ON DELETE CASCADE,
            family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE custom_quest_categories IS '家族が作成したカスタムクエストカテゴリテーブル';
        COMMENT ON COLUMN custom_quest_categories.id IS 'カスタムカテゴリID（主キー）';
        COMMENT ON COLUMN custom_quest_categories.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
        COMMENT ON COLUMN custom_quest_categories.family_id IS '作成者の家族ID（外部キー）';
        COMMENT ON COLUMN custom_quest_categories.created_at IS '作成日時';
        COMMENT ON COLUMN custom_quest_categories.updated_at IS '更新日時';

    -- 家族クエストカテゴリテーブル
        CREATE TABLE IF NOT EXISTS family_quest_categories (
            id serial PRIMARY KEY,
            category_id int NOT NULL UNIQUE REFERENCES quest_categories (id) ON DELETE CASCADE,
            family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE family_quest_categories IS '家族固有のクエストカテゴリテーブル';
        COMMENT ON COLUMN family_quest_categories.id IS '家族カテゴリID（主キー）';
        COMMENT ON COLUMN family_quest_categories.category_id IS 'クエストカテゴリID（外部キー、一意制約）';
        COMMENT ON COLUMN family_quest_categories.family_id IS '家族ID（外部キー）';
        COMMENT ON COLUMN family_quest_categories.created_at IS '作成日時';
        COMMENT ON COLUMN family_quest_categories.updated_at IS '更新日時';

    -- クエストサブクラスタイプ
        CREATE TABLE IF NOT EXISTS quest_subclass_types (
            id serial PRIMARY KEY,
            type varchar NOT NULL UNIQUE,  -- child, family
            description text NOT NULL
        );

        COMMENT ON TABLE quest_subclass_types IS 'クエストのサブクラスタイプを管理するテーブル';
        COMMENT ON COLUMN quest_subclass_types.id IS 'サブクラスタイプID（主キー）';
        COMMENT ON COLUMN quest_subclass_types.type IS 'タイプコード（child, family）';
        COMMENT ON COLUMN quest_subclass_types.description IS 'タイプの説明';

    -- クエスト（基底テーブル）
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

    -- クエスト履歴テーブル
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
        COMMENT ON COLUMN history.quests.quest_id IS '元のクエストID';
        COMMENT ON COLUMN history.quests.recorded_at IS '履歴記録日時';

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

    -- クエスト翻訳履歴テーブル
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
        COMMENT ON COLUMN history.quests_translation.quests_translation_id IS '元の翻訳レコードID';
        COMMENT ON COLUMN history.quests_translation.recorded_at IS '履歴記録日時';

    -- クエスト詳細（レベル別）テーブル
        CREATE TABLE IF NOT EXISTS quest_details_by_level (
            id serial PRIMARY KEY,
            quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
            level int NOT NULL CHECK (level > 0),
            success_criteria text NOT NULL CHECK (length(success_criteria) > 0),
            target_count int NOT NULL CHECK (target_count > 0),
            reward int NOT NULL CHECK (reward >= 0),
            currency_id int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
            child_exp int NOT NULL CHECK (child_exp >= 0),
            quest_exp int NOT NULL CHECK (quest_exp >= 0),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (quest_id, level)
        );

        COMMENT ON TABLE quest_details_by_level IS 'クエストのレベル別詳細情報を管理するテーブル';
        COMMENT ON COLUMN quest_details_by_level.id IS 'クエスト詳細ID（主キー）';
        COMMENT ON COLUMN quest_details_by_level.quest_id IS 'クエストID（外部キー）';
        COMMENT ON COLUMN quest_details_by_level.level IS 'レベル（正の値のみ）';
        COMMENT ON COLUMN quest_details_by_level.success_criteria IS '成功条件（空文字不可）';
        COMMENT ON COLUMN quest_details_by_level.target_count IS '目標回数（正の値のみ）';
        COMMENT ON COLUMN quest_details_by_level.reward IS '報酬金額（負の値不可）';
        COMMENT ON COLUMN quest_details_by_level.currency_id IS '通貨ID（外部キー）';
        COMMENT ON COLUMN quest_details_by_level.child_exp IS 'メンバー獲得経験値（負の値不可）';
        COMMENT ON COLUMN quest_details_by_level.quest_exp IS 'クエスト獲得経験値（負の値不可）';
        COMMENT ON COLUMN quest_details_by_level.created_at IS '作成日時';
        COMMENT ON COLUMN quest_details_by_level.updated_at IS '更新日時';

    -- クエスト詳細履歴テーブル
        CREATE TABLE IF NOT EXISTS history.quest_details_by_level (
            id serial PRIMARY KEY,
            quest_details_by_level_id int NOT NULL REFERENCES quest_details_by_level (id) ON DELETE RESTRICT,
            level int NOT NULL,
            success_criteria text NOT NULL,
            target_count int NOT NULL,
            reward int NOT NULL,
            currency_id int NOT NULL REFERENCES currencies (id) ON DELETE RESTRICT,
            child_exp int NOT NULL,
            quest_exp int NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            recorded_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE history.quest_details_by_level IS 'クエスト詳細情報の変更履歴を管理するテーブル';
        COMMENT ON COLUMN history.quest_details_by_level.quest_details_by_level_id IS '元のクエスト詳細ID';
        COMMENT ON COLUMN history.quest_details_by_level.recorded_at IS '履歴記録日時';

    -- クエスト詳細翻訳テーブル
        CREATE TABLE IF NOT EXISTS quest_details_by_level_translation (
            id serial PRIMARY KEY,
            quest_details_by_level_id int NOT NULL REFERENCES quest_details_by_level (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            success_criteria text NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (quest_details_by_level_id, language_code)
        );

        COMMENT ON TABLE quest_details_by_level_translation IS 'クエスト詳細の多言語対応テーブル';
        COMMENT ON COLUMN quest_details_by_level_translation.id IS '翻訳ID（主キー）';
        COMMENT ON COLUMN quest_details_by_level_translation.quest_details_by_level_id IS 'クエスト詳細ID（外部キー）';
        COMMENT ON COLUMN quest_details_by_level_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN quest_details_by_level_translation.success_criteria IS '成功条件の翻訳';
        COMMENT ON COLUMN quest_details_by_level_translation.created_at IS '作成日時';
        COMMENT ON COLUMN quest_details_by_level_translation.updated_at IS '更新日時';

    -- クエスト詳細翻訳履歴テーブル
        CREATE TABLE IF NOT EXISTS history.quest_details_by_level_translation (
            id serial PRIMARY KEY,
            quest_details_by_level_translation_id int NOT NULL,
            quest_details_by_level_id int NOT NULL,
            language_code int NOT NULL,
            success_criteria text NOT NULL,
            created_at timestamptz NOT NULL,
            updated_at timestamptz NOT NULL,
            recorded_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE history.quest_details_by_level_translation IS 'クエスト詳細翻訳の変更履歴を管理するテーブル';
        COMMENT ON COLUMN history.quest_details_by_level_translation.quest_details_by_level_translation_id IS '元の翻訳レコードID';
        COMMENT ON COLUMN history.quest_details_by_level_translation.recorded_at IS '履歴記録日時';

    -- クエスト経験値（レベル別）テーブル
        CREATE TABLE IF NOT EXISTS quest_exp_by_level (
            id serial PRIMARY KEY,
            quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
            level int NOT NULL CHECK (level > 0),
            exp int NOT NULL CHECK (exp >= 0),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (quest_id, level)
        );

        COMMENT ON TABLE quest_exp_by_level IS 'クエストのレベル別必要経験値を管理するテーブル';
        COMMENT ON COLUMN quest_exp_by_level.id IS 'クエスト経験値ID（主キー）';
        COMMENT ON COLUMN quest_exp_by_level.quest_id IS 'クエストID（外部キー）';
        COMMENT ON COLUMN quest_exp_by_level.level IS 'レベル（正の値のみ）';
        COMMENT ON COLUMN quest_exp_by_level.exp IS '必要経験値（負の値不可）';
        COMMENT ON COLUMN quest_exp_by_level.created_at IS '作成日時';
        COMMENT ON COLUMN quest_exp_by_level.updated_at IS '更新日時';

    -- クエスト経験値履歴テーブル
        CREATE TABLE IF NOT EXISTS history.quest_exp_by_level (
            id serial PRIMARY KEY,
            quest_exp_by_level_id int NOT NULL,
            quest_id int NOT NULL,
            level int NOT NULL,
            exp int NOT NULL,
            created_at timestamptz NOT NULL,
            updated_at timestamptz NOT NULL,
            recorded_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE history.quest_exp_by_level IS 'クエスト経験値情報の変更履歴を管理するテーブル';
        COMMENT ON COLUMN history.quest_exp_by_level.quest_exp_by_level_id IS '元のクエスト経験値レコードID';
        COMMENT ON COLUMN history.quest_exp_by_level.recorded_at IS '履歴記録日時';

    -- クエストリクエストステータステーブル
        CREATE TABLE IF NOT EXISTS quest_request_statuses (
            id serial PRIMARY KEY,
            code varchar(20) NOT NULL UNIQUE,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE quest_request_statuses IS 'クエストリクエストの状態を管理するマスタテーブル';
        COMMENT ON COLUMN quest_request_statuses.id IS 'ステータスID（主キー）';
        COMMENT ON COLUMN quest_request_statuses.code IS 'ステータスコード（例：pending, approved, rejected）';
        COMMENT ON COLUMN quest_request_statuses.created_at IS '作成日時';
        COMMENT ON COLUMN quest_request_statuses.updated_at IS '更新日時';

    -- クエストリクエストステータス翻訳テーブル
        CREATE TABLE IF NOT EXISTS quest_request_status_translation (
            id serial PRIMARY KEY,
            quest_request_status_id int NOT NULL REFERENCES quest_request_statuses (id) ON DELETE CASCADE,
            language_code int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
            name varchar(100) NOT NULL,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (quest_request_status_id, language_code)
        );

        COMMENT ON TABLE quest_request_status_translation IS 'クエストリクエストステータスの多言語対応テーブル';
        COMMENT ON COLUMN quest_request_status_translation.id IS '翻訳ID（主キー）';
        COMMENT ON COLUMN quest_request_status_translation.quest_request_status_id IS 'ステータスID（外部キー）';
        COMMENT ON COLUMN quest_request_status_translation.language_code IS '言語ID（外部キー）';
        COMMENT ON COLUMN quest_request_status_translation.name IS 'ステータス名の翻訳';
        COMMENT ON COLUMN quest_request_status_translation.created_at IS '作成日時';
        COMMENT ON COLUMN quest_request_status_translation.updated_at IS '更新日時';

    -- クエストリクエストテーブル
        CREATE TABLE IF NOT EXISTS quest_requests (
            id serial PRIMARY KEY,
            family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
            quest_id int REFERENCES quests (id) ON DELETE CASCADE,  -- 既存クエストの場合のみ
            title varchar(200) NOT NULL CHECK (length(title) > 0),
            description text NOT NULL CHECK (length(description) > 0),
            is_new_request boolean NOT NULL DEFAULT true,
            status_id int NOT NULL REFERENCES quest_request_statuses (id) ON DELETE RESTRICT,
            answer text,
            created_at timestamptz NOT NULL DEFAULT now(),
            answered_at timestamptz DEFAULT NULL,
            requested_at timestamptz DEFAULT NULL,
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE quest_requests IS 'メンバーからのクエストリクエストを管理するテーブル';
        COMMENT ON COLUMN quest_requests.id IS 'リクエストID（主キー）';
        COMMENT ON COLUMN quest_requests.family_id IS '家族ID（外部キー）';
        COMMENT ON COLUMN quest_requests.child_id IS 'リクエスト者のメンバーID（外部キー）';
        COMMENT ON COLUMN quest_requests.quest_id IS '既存クエストID（既存クエストの場合のみ、外部キー）';
        COMMENT ON COLUMN quest_requests.title IS 'リクエストタイトル（空文字不可）';
        COMMENT ON COLUMN quest_requests.description IS 'リクエスト説明（空文字不可）';
        COMMENT ON COLUMN quest_requests.is_new_request IS '新規クエストリクエストフラグ';
        COMMENT ON COLUMN quest_requests.status_id IS 'ステータスID（外部キー）';
        COMMENT ON COLUMN quest_requests.answer IS '回答内容';
        COMMENT ON COLUMN quest_requests.created_at IS '作成日時';
        COMMENT ON COLUMN quest_requests.answered_at IS '回答日時';
        COMMENT ON COLUMN quest_requests.updated_at IS '更新日時';

    -- 共有クエストテーブル
        CREATE TABLE IF NOT EXISTS shared_quests (
            id serial PRIMARY KEY,
            quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
            family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            pinned_comment_id int REFERENCES comments (id) ON DELETE SET NULL,
            is_public boolean NOT NULL DEFAULT true,
            shared_at timestamptz NOT NULL DEFAULT now(),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (family_id, quest_id) 
        );

        COMMENT ON TABLE shared_quests IS '他の家族と共有されているクエストを管理するテーブル';
        COMMENT ON COLUMN shared_quests.id IS '共有クエストID（主キー）';
        COMMENT ON COLUMN shared_quests.quest_id IS 'クエストID（外部キー）';
        COMMENT ON COLUMN shared_quests.family_id IS '共有元の家族ID（外部キー）';
        COMMENT ON COLUMN shared_quests.pinned_comment_id IS 'ピン留めコメントID（任意）';
        COMMENT ON COLUMN shared_quests.is_public IS '公開フラグ';
        COMMENT ON COLUMN shared_quests.shared_at IS '共有日時';
        COMMENT ON COLUMN shared_quests.created_at IS '作成日時';
        COMMENT ON COLUMN shared_quests.updated_at IS '更新日時';

    -- 共有クエスト履歴テーブル
        CREATE TABLE IF NOT EXISTS history.shared_quests (
            id serial PRIMARY KEY,
            shared_quest_id int NOT NULL,
            quest_id int NOT NULL,
            family_id int NOT NULL,
            pinned_comment_id int,
            is_public boolean NOT NULL,
            shared_at timestamptz NOT NULL,
            created_at timestamptz NOT NULL,
            updated_at timestamptz NOT NULL,
            recorded_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE history.shared_quests IS '共有クエスト情報の変更履歴を管理するテーブル';
        COMMENT ON COLUMN history.shared_quests.shared_quest_id IS '元の共有クエストレコードID';
        COMMENT ON COLUMN history.shared_quests.recorded_at IS '履歴記録日時';

    -- 家族クエストテーブル
        CREATE TABLE IF NOT EXISTS family_quests (
            id serial PRIMARY KEY,
            quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
            family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            is_shared boolean NOT NULL DEFAULT false,
            shared_quest_id int REFERENCES shared_quests (id) ON DELETE SET NULL,
            adopted_at timestamptz NOT NULL DEFAULT now(),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (family_id, quest_id),
            CHECK (
                (is_shared = false AND shared_quest_id IS NULL) OR
                (is_shared = true AND shared_quest_id IS NOT NULL)
            )
        );

        COMMENT ON TABLE family_quests IS '家族が利用しているクエストを管理するテーブル';
        COMMENT ON COLUMN family_quests.id IS '家族クエストID（主キー）';
        COMMENT ON COLUMN family_quests.quest_id IS 'クエストID（外部キー）';
        COMMENT ON COLUMN family_quests.family_id IS '家族ID（外部キー）';
        COMMENT ON COLUMN family_quests.is_shared IS '共有フラグ';
        COMMENT ON COLUMN family_quests.shared_quest_id IS '共有クエストID（共有時のみ）';
        COMMENT ON COLUMN family_quests.adopted_at IS 'クエスト採用日時';
        COMMENT ON COLUMN family_quests.created_at IS '作成日時';
        COMMENT ON COLUMN family_quests.updated_at IS '更新日時';

    -- 家族クエスト履歴テーブル
        CREATE TABLE IF NOT EXISTS history.family_quests (
            id serial PRIMARY KEY,
            family_quest_id int NOT NULL,
            quest_id int NOT NULL,
            family_id int NOT NULL,
            is_shared boolean NOT NULL,
            shared_quest_id int,
            adopted_at timestamptz NOT NULL,
            created_at timestamptz NOT NULL,
            updated_at timestamptz NOT NULL,
            recorded_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE history.family_quests IS '家族クエスト情報の変更履歴を管理するテーブル';
        COMMENT ON COLUMN history.family_quests.family_quest_id IS '元の家族クエストレコードID';
        COMMENT ON COLUMN history.family_quests.recorded_at IS '履歴記録日時';

    -- 保存クエストテーブル（家族が保存(いいね)したクエスト）
        CREATE TABLE IF NOT EXISTS saved_quests (
            id serial PRIMARY KEY,
            quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
            family_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
            saved_at timestamptz NOT NULL DEFAULT now(),
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now(),
            UNIQUE (quest_id, family_id)
        );

        COMMENT ON TABLE saved_quests IS '家族が保存（お気に入り）したクエストを管理するテーブル';
        COMMENT ON COLUMN saved_quests.id IS '保存クエストID（主キー）';
        COMMENT ON COLUMN saved_quests.quest_id IS 'クエストID（外部キー）';
        COMMENT ON COLUMN saved_quests.family_id IS '家族ID（外部キー）';
        COMMENT ON COLUMN saved_quests.saved_at IS '保存日時';
        COMMENT ON COLUMN saved_quests.created_at IS '作成日時';
        COMMENT ON COLUMN saved_quests.updated_at IS '更新日時';

    -- テンプレートクエストテーブル（アプリのテンプレートクエスト）
        CREATE TABLE IF NOT EXISTS template_quests (
            id serial PRIMARY KEY,
            quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
            created_at timestamptz NOT NULL DEFAULT now(),
            updated_at timestamptz NOT NULL DEFAULT now()
        );

        COMMENT ON TABLE template_quests IS 'アプリ提供のテンプレートクエストを管理するテーブル';
        COMMENT ON COLUMN template_quests.id IS 'テンプレートクエストID（主キー）';
        COMMENT ON COLUMN template_quests.quest_id IS 'クエストID（外部キー、一意制約）';
        COMMENT ON COLUMN template_quests.created_at IS '作成日時';
        COMMENT ON COLUMN template_quests.updated_at IS '更新日時';

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
            quest_id int NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
            child_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
            current_level int NOT NULL CHECK (current_level > 0) DEFAULT 1,
            status_id int NOT NULL REFERENCES child_quest_status (id) ON DELETE RESTRICT,
            published_at timestamptz NOT NULL DEFAULT now(),
            achieved_at timestamptz DEFAULT NULL,
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
        COMMENT ON COLUMN child_quests.status_id IS 'クエストステータスID（外部キー）';
        COMMENT ON COLUMN child_quests.published_at IS 'クエスト公開日時';
        COMMENT ON COLUMN child_quests.achieved_at IS 'クエスト達成日時（未達成の場合はNULL）';
        COMMENT ON COLUMN child_quests.created_at IS '作成日時';
        COMMENT ON COLUMN child_quests.updated_at IS '更新日時';
