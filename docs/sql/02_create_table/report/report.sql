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
COMMENT ON COLUMN history.reports.recorded_at IS '履歴記録日時';

-- reports(翻訳)
CREATE TABLE IF NOT EXISTS reports_translations (
    id serial PRIMARY KEY,
    report_id int NOT NULL REFERENCES reports (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    reason text NOT NULL CHECK (length(reason) > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (report_id, language_id)
);

COMMENT ON TABLE reports_translations IS 'レポート理由の多言語翻訳を管理するテーブル';
COMMENT ON COLUMN reports_translations.id IS '翻訳ID（主キー）';
COMMENT ON COLUMN reports_translations.report_id IS 'レポートID（外部キー）';
COMMENT ON COLUMN reports_translations.language_id IS '言語ID（外部キー）';
COMMENT ON COLUMN reports_translations.reason IS 'レポート理由（翻訳後、空文字不可）';
COMMENT ON COLUMN reports_translations.created_at IS 'レコードの作成日時';
COMMENT ON COLUMN reports_translations.updated_at IS 'レコードの更新日時';

-- reports(翻訳履歴)
CREATE TABLE IF NOT EXISTS history.reports_translations (
    id serial PRIMARY KEY,
    report_translation_id int NOT NULL REFERENCES reports_translations (id) ON DELETE CASCADE,
    language_id int NOT NULL REFERENCES languages (id) ON DELETE RESTRICT,
    reason text NOT NULL CHECK (length(reason) > 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    recorded_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE history.reports_translations IS 'レポート翻訳情報の変更履歴を管理するテーブル';
COMMENT ON COLUMN history.reports_translations.id IS '翻訳履歴ID（主キー）';
COMMENT ON COLUMN history.reports_translations.report_translation_id IS '元の翻訳ID（外部キー）';
COMMENT ON COLUMN history.reports_translations.language_id IS '言語ID（履歴時点）';
COMMENT ON COLUMN history.reports_translations.reason IS 'レポート理由（履歴時点、空文字不可）';
COMMENT ON COLUMN history.reports_translations.created_at IS '元レコードの作成日時';
COMMENT ON COLUMN history.reports_translations.updated_at IS '元レコードの更新日時';
COMMENT ON COLUMN history.reports_translations.recorded_at IS '履歴記録日時';
