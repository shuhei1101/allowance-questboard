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
