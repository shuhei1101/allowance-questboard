
-- 引き落とし申請テーブル
CREATE TABLE IF NOT EXISTS withdrawal_requests (
    id serial PRIMARY KEY,
    requester_id int NOT NULL REFERENCES children (id) ON DELETE CASCADE,
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
COMMENT ON COLUMN withdrawal_requests.created_at IS '作成日時';
COMMENT ON COLUMN withdrawal_requests.updated_at IS '更新日時';
