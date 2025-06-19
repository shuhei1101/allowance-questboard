
-- 引き落とし申請フォーム
CREATE TABLE IF NOT EXISTS withdrawal_requests (
    id serial PRIMARY KEY,
    requester_id int NOT NULL REFERENCES members (id) ON DELETE CASCADE,
    approver_id int NOT NULL REFERENCES families (id) ON DELETE CASCADE,
    status_id int NOT NULL REFERENCES withdrawal_request_status (id) ON DELETE RESTRICT,  
    amount int NOT NULL,
    reason varchar NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
);  
